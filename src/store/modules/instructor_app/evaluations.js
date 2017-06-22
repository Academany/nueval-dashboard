import {
    API_FAILURE,
} from '../failure'
import api from '../api'

export const LOAD_EVALUATIONS = "LOAD_EVALUATIONS"
export const SELECT_EVALUATION = "SELECT_EVALUATION"
export const SET_EVALUATIONS = "SET_EVALUATIONS"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const SET_PROGRESS = "SET_PROGRESS"
export const SELECT_STUDENT = "SELECT_STUDENT"
export const PREPARE_EVALUATION = "PREPARE_EVALUATION"
export const NEEDS_SETUP = "NEEDS_SETUP"
export const UPDATE_PROGRESS = "UPDATE_PROGRESS"
export const BOOK_STUDENT = "BOOK_STUDENT"
export const HAS_FAILURE = "HAS_FAILURE"

export default {
  namespaced: true,
  actions: {
    loadEvaluations({
            commit,
        }, courseId) {
      return new Promise((resolve, reject) => {
        commit(LOAD_EVALUATIONS)
        const params = {
          include: [
            'evaluators',
            'students',
            {
              'pairings': ['student', 'instructor'],
            },
            'course',

          ],
          where: {
            courseId,
          },
        }
        api.get('/api/evaluations?filter=' + encodeURIComponent(JSON.stringify(params)))
                    .then((success) => {
                      commit(SET_EVALUATIONS, success)
                      resolve(success)
                    })
                    .catch((error) => {
                      commit(API_FAILURE, error, {
                        root: true,
                      })
                      commit(HAS_FAILURE)
                      reject(error)
                    })
      })
    },
    selectEvaluation({
            commit,
        }, evaluation) {
      commit(SELECT_EVALUATION, evaluation)
    },
    selectStudent({
            commit,
            dispatch,
        }, student) {
      const studentId = student && student.id || null
      if (studentId) {
        commit(SELECT_STUDENT, student)
        dispatch('loadProgress', studentId)
      }
    },
    prepareLocalEvaluation({
            commit,
            state,
            dispatch,
        }, {
            student_id,
            instructor_id,
        }) {
      return new Promise((resolve, reject) => {
        commit(PREPARE_EVALUATION, student_id)
        const localEval = state.evaluations.find(e => e.kind === 'local')
        if (localEval) {
          api.post('/api/evaluations/' + localEval.id + '/prepare/' + student_id, {
            evaluationId: localEval.id,
            studentId: student_id,
            instructorId: instructor_id,
          }).then((response) => {
            resolve(response)
            dispatch('loadProgress', student_id)
          }).catch((error) => {
            reject(error)
          })
        } else {
          reject("No local evaluation found")
        }
      })
    },
    loadProgress({
            commit,
            dispatch,
        }, studentId) {
      commit(LOAD_PROGRESS, studentId)
      return new Promise((resolve, reject) => {
        api.get('/api/students/' + studentId + '/progress') // ?filter=' + encodeURIComponent(JSON.stringify(params)))
                    .then((data) => {
                      if (data && data.length > 0) {
                        commit(SET_PROGRESS, data)
                        resolve(data)
                      } else {
                        commit(NEEDS_SETUP)
                        resolve()
                      }
                    })
                    .catch((error) => {
                      commit(API_FAILURE, error, {
                        root: true,
                      })
                      commit(HAS_FAILURE)

                      reject(error)
                    })
                // load evaluation sheets and evaluation records
                // limit the editing to local sheet for local evaluation
                // selected sheet for global evaluation
      })
    },
    bookStudent({
      commit, state, dispatch,
    }, { session, student }) {
      return new Promise((resolve, reject) => {
        api.put("/api/evaluations/" + session.id + "/students/rel/" + student.id)
        .then((response) => {
          commit(BOOK_STUDENT, { session, student })
          dispatch('loadProgress', student.id)
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          commit(HAS_FAILURE)

          reject(error)
        })
      })
    },
    syncProgress({
      commit, dispatch, state,
    }, { module, record }) {
      // state.overallProgress
      // go and find the module and record to be updated

      dispatch('loadProgress', state.currentStudent.id)
    },
  },
  mutations: {
    [LOAD_EVALUATIONS](state, local) {
      state.loading = false;
      state.local = !!local;
    },
    [SET_EVALUATIONS](state, evaluations) {
      state.loading = false;
      state.evaluations = evaluations
    },
    [SELECT_EVALUATION](state, evaluation) {
      state.currentEvaluation = evaluation
    },
    [SELECT_STUDENT](state, student) {
      state.currentStudent = student
      state.canGoGlobal = false
    },
    [LOAD_PROGRESS](state, studentId) {
      state.loading = true
    },
    [SET_PROGRESS](state, progress) {
      state.needsSetup = progress.find(p => p.records && p.records.length > 0) == null
      state.loading = false
      state.overallProgress = progress
    },
    [UPDATE_PROGRESS](state, progress) {
      state.needsSetup = progress.find(p => p.records && p.records.length > 0) == null
      state.loading = false
      state.overallProgress = progress
    },
    [PREPARE_EVALUATION](state, studentId) {
      state.loading = false
    },
    [NEEDS_SETUP](state, studentId) {
      state.needsSetup = true
      state.loading = false
    },
    [BOOK_STUDENT](state, { session, student }) {},
    [HAS_FAILURE](state) {
      state.loading = false
      state.failure = true
    },
  },
  getters: {
    evaluations: state => state.evaluations,
    currentEvaluation: state => state.currentEvaluation,
    currentStudent: state => state.currentStudent,
    currentStudentSheets: state => [],
    needsSetup: state => state.needsSetup,
    overallProgress: state => state.overallProgress,
    loading: state => state.loading,
    canGoGlobal: (state) => {
      let canGoGlobal = false
      const sessions = state && state.overallProgress || []
      sessions.forEach((ev) => {
        const recs = ev && ev.records || []
        const completed = recs.filter(er => er.completed)
        if (completed.length > 0 && completed.length == recs.length && ev.evaluation.kind === 'local') {
          canGoGlobal = true
        }
      })
      return canGoGlobal
    },
    isInGlobal: (state) => {
      let isIn = false
      const sessions = state && state.overallProgress || []
      sessions.some((ev) => {
        if (ev.evaluation.kind === 'global') {
          isIn = true;
          return true
        }
      })
      return isIn
    },
  },
  state: {
    overallProgress: [],
    evaluations: [],
    currentStudent: null,
    currentEvaluation: null,
    currentStudentSheets: [],
    loading: false,
    local: true,
    needsSetup: false,
    canGraduate: false,
    failure: true,
  },
}
