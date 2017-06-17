const LOAD_EVALUATIONS = "LOAD_EVALUATIONS"
const SET_EVALUATIONS = "SET_EVALUATIONS"
const CREATE_EVALUATION = "CREATE_EVALUATION"
const UPDATE_EVALUATION = "UPDATE_EVALUATION"
const DELETE_EVALUATION = "DELETE_EVALUATION"
const ADD_EVALUATOR = "ADD_EVALUATOR"
const REMOVE_EVALUATOR = "REMOVE_EVALUATOR"
const ADD_STUDENT = "ADD_STUDENT"
const REMOVE_STUDENT = "REMOVE_STUDENT"
const ASSIGN_EVALUATOR = "ASSIGN_EVALUATOR"
const RESET_EVALUATOR = "RESET_EVALUATOR"
import {
  API_FAILURE,
} from './failure'
import api from './api'
import Vue from 'vue'

export default {
  state: {
    evaluations: [],
  },
  actions: {
    loadEvaluations({
      commit,
    }, courseId) {
      commit(LOAD_EVALUATIONS);
      const opts = {
        url: '/api/courses/' + courseId + '/evaluations?filter=' + encodeURIComponent(
          JSON.stringify({
            include: [
              'evaluators',
              'students',
              { 'pairings': ['student', 'instructor'] },
              'course',
            ],
          })
        ),
      }
      api.get(opts.url)
        .then(function (response) {
          commit('SET_EVALUATIONS', response);
        })
        .catch(function (error) {
          commit('API_FAILURE', error)
        });
    },
    setEvaluations({
      commit,
    }, item) {
      commit(SET_EVALUATIONS, item)
    },
    createEvaluation({
      commit,
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses/" + item.courseId + "/evaluations", item).then((response) => {
          // http success, call the mutator and change something in state
          console.log(response);
          commit(CREATE_EVALUATION, response.body)
          // Let the calling function know that http is done. You may send some data back
          // push('/apps/manager/courses')
          resolve(response.body);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          // push('/apps/manager/courses')
          reject(error);
        })
      })
    },
    updateEvaluation({
      commit,
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.put("/api/courses/" + item.courseId + "/evaluations/" + item.id, item).then((response) => {
          // http success, call the mutator and change something in state
          commit(UPDATE_EVALUATION, response.body)
          // Let the calling function know that http is done. You may send some data back
          //  push('/apps/manager/courses')
          resolve(response.body);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          //  push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    deleteEvaluation({
      commit,
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + item.courseId + "/evaluations/" + item.id).then((response) => {
          // http success, call the mutator and change something in state
          commit(DELETE_EVALUATION, item)
          // Let the calling function know that http is done. You may send some data back
          //  push('/apps/manager/courses')
          resolve(response);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          //  push('/apps/manager/courses')
          reject(error);
        })
      })
    },
    addEvaluator({
      commit, state, dispatch,
    }, { session, evaluator }) {
      return new Promise((resolve, reject) => {
        api.put("/api/evaluations/" + session.id + "/evaluators/rel/" + evaluator.id)
        .then((response) => {
          commit(ADD_EVALUATOR, { session, evaluator })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
    removeEvaluator({
      commit, state, dispatch,
    }, { session, item }) {
      return new Promise((resolve, reject) => {
        api.delete("/api/evaluations/" + session.id + "/evaluators/rel/" + evaluator.id)
        .then((response) => {
          commit(REMOVE_EVALUATOR, { session, evaluator })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
    addStudent({
      commit, state, dispatch,
    }, { session, student }) {
      return new Promise((resolve, reject) => {
        api.put("/api/evaluations/" + session.id + "/students/rel/" + student.id)
        .then((response) => {
          commit(ADD_STUDENT, { session, student })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
    removeStudent({
      commit, state, dispatch,
    }, { session, student }) {
      return new Promise((resolve, reject) => {
        api.delete("/api/evaluations/" + session.id + "/students/rel/" + student.id)
        .then((response) => {
          commit(REMOVE_STUDENT, { session, student })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
    assignEvaluator({
      commit, state, dispatch,
    }, { session, student, evaluator }) {
      return new Promise((resolve, reject) => {
        api.put("/api/evaluations/assignEvaluator", {
          instructorId: evaluator && evaluator.id || null,
          evaluationId: session.id,
          studentId: student.id,
        })
        .then((response) => {
          commit(ASSIGN_EVALUATOR,
          { session, student, evaluator })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
    resetEvaluator({
      commit, state, dispatch,
    }, { session, student, evaluator }) {
      return new Promise((resolve, reject) => {
        // debugger
        api.put("/api/evaluations/resetEvaluator", {
          evaluationId: session.id,
          studentId: student.id,
        })
        .then((response) => {
          commit(RESET_EVALUATOR,
          { session, student, evaluator })
          resolve(response)
        })
        .catch((error) => {
          commit(API_FAILURE, error);
          reject(error)
        })
      })
    },
  },
  mutations: {
    [LOAD_EVALUATIONS](state) {
      // nop
    },
    [SET_EVALUATIONS](state, newList) {
      state.evaluations = newList;
    },
    [CREATE_EVALUATION](state, response) {
      let newc = state.evaluations.slice();
      newc.push(response);
      state.evaluations = newc;
    },
    [UPDATE_EVALUATION](state, response) {
      let newc = [];
      state.evaluations.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.evaluations = newc;
    },
    [DELETE_EVALUATION](state, response) {
      let newc = [];
      state.evaluations.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.evaluations = newc;
    },
    [ADD_EVALUATOR](state, { session, evaluator }) {
      state.evaluations.some((el) => {
        if (el.id === session.id) {
          el.evaluators = el.evaluators || []
          el.evaluators.push(evaluator)
          return true
        }
      })
    },
    [REMOVE_EVALUATOR](state, { session, evaluator }) {
      state.evaluations.some((el) => {
        if (el.id === session.id) {
          el.evaluators = el.evaluators || []
          const index = el.evaluators.findIndex((el, idx) => (el.username === evaluator.username))
          if (index != -1) el.evaluators = el.evaluators.splice(index, 1)
          return true
        }
      })
    },
    [ADD_STUDENT](state, { session, student }) {
      state.evaluations.some((el) => {
        if (el.id === session.id) {
          el.students = el.students || []
          el.students.push(student)
          return true
        }
      })
    },
    [REMOVE_STUDENT](state, { session, student }) {
      state.evaluations.some((el) => {
        if (el.id === session.id) {
          el.students = el.students || []
          const index = el.students.findIndex((e, idx) => (e.username === student.username))
          if (index != -1) el.students = el.students.splice(index, 1)
          return true
        }
      })
    },
    [ASSIGN_EVALUATOR](state, { session, student, evaluator }) {
      state.evaluations.some((evaluation, evid) => {
        if (evaluation.id === session.id) {
          evaluation.students = evaluation.students.map((el) => {
            if (el.id === student.id) {
              el.evaluator = evaluator
            }
            return el
          })
          // debugger
          evaluation.pairings = evaluation.pairings.map((el) => {
            if (el.studentId === student.id) {
              el.instructorId = evaluator.id
            }
            return el
          })
          // const newEval = {...evaluation}
          Vue.set(state.evaluations, evid, evaluation)
        }
      })
    },
    [RESET_EVALUATOR](state, { session, student, evaluator }) {
      state.evaluations.some((evaluation, evid) => {
        if (evaluation.id === session.id) {
          evaluation.students = evaluation.students.map((el) => {
            if (el.id === student.id) {
              delete el.evaluator
            }
            return el
          })
          evaluation.pairings = evaluation.pairings.map((el) => {
            if (el.studentId === student.id) {
              el.instructorId = null
            }
            return el
          })
          // const newEval = {...evaluation}
          Vue.set(state.evaluations, evid, evaluation)
        }
      })
    },
  },

  getters: {
    evaluations(state) {
      return state.evaluations
    },
    evaluationStudents(evaluation) {
      return (evaluation) => {
        // debugger
        const students = evaluation.students || []
        const pairings = evaluation.pairings || []
        const evaluators = evaluation.evaluators || []
        return students.map((student) => {
          const student_pairing = pairings.find((p => p.studentId && p.studentId === student.id && p.instructorId))
          if (student_pairing && student_pairing.instructorId) {
            const evaluator = evaluators.find(p => p.id === student_pairing.instructorId)
            if (evaluator) {
              student.evaluator = evaluator
              student.evaluatorId = evaluator.id
            }
          }
          return student
        })
      }
    },
    evaluators(evaluation) {
      return (evaluation) => {
        const pairings = evaluation.pairings || []
        const evaluators = evaluation.evaluators || []
        return evaluators.map(
          (evaluator) => {
            // add candidates to each evaluator
            evaluator.candidates = pairings.filter(p => p.instructorId === evaluator.id)
                                         .map(p => evaluation.students.find(s => (s.id === p.studentId)))
            return evaluator
          })
      }
    },
  },
}
