export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const SET_STUDENT = "SET_STUDENT"
export const RELOAD_STUDENT = "RELOAD_STUDENT"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const SET_PROGRESS = "SET_PROGRESS"
export const UPDATE_CHECKLIST = "UPDATE_CHECKLIST"
export const LEAVE_FEEDBACK = "LEAVE_FEEDBACK"
export const CREATE_FEEDBACK = "CREATE_FEEDBACK"
export const SELECT_MODULE = "SELECT_MODULE"
export const LOAD_RECORD = "LOAD_RECORD"
export const PERSIST_RECORD = "PERSIST_RECORD"
export const RECORD_PERSISTED = "RECORD_PERSISTED"
import {
  API_FAILURE,
} from '../failure'
import api from '../api'

export default {
  namespaced: true,
  //   modules: {
  //     sessions,
  //     evaluations,
  //     records,
  //   },
  actions: {
    bootApp({
      commit,
      dispatch,
    }, student) {
      // booting the app means loading all the stuff needed to show it correctly
      // we already loaded installed apps
      // instead of the course selector we'll have the instructor selector
      // load all instructors associated to the user (once)


      // then:
      //  pick the instructor with the most recent active program
      //  then:
      //      load the instructor courses
      //      load the instructor labs
      //      load the instructor students
      // console.log(student)
      commit(SET_STUDENT, student)
      return dispatch('reloadStudent')
    },
    reloadStudent({
      commit,
      state,
      dispatch,
    }) {
      commit(RELOAD_STUDENT)
      return new Promise((resolve, reject) => {
        api.get('/api/students/' + state.student.id + '?filter=' + encodeURIComponent(
          JSON.stringify({
            include: [{
              'course': ['presentations', 'modules'],
            },
            {
              'lab': ['instructors'],
            },
              'booked',
              'noshow',
              'presented',
            ],
          })
        )).then((response) => {
          commit(SET_STUDENT, response)
          dispatch('loadProgress')
          resolve(response)
        }).catch((error) => {
          commit(API_FAILURE, error, {
            root: true,
          })
          reject(error)
        })
      })
    },
    loadProgress({
      commit,
      dispatch,
      state,
    }) {
      return new Promise((resolve, reject) => {
        if (state.student && state.student.id) {
          commit(LOAD_PROGRESS, state.student.id)
          api.get('/api/students/' + state.student.id + '/progress') // ?filter=' + encodeURIComponent(JSON.stringify(params)))
            .then((data) => {
              if (data && data.length) {
                commit(SET_PROGRESS, data)
                resolve(data)
              }
            })
            .catch((error) => {
              commit(API_FAILURE, error, {
                root: true,
              })

              reject(error)
            })
        } else {
          reject("Student not selected")
        }
      })
    },
    changeApp({
      commit,
    }, newApp) {
      commit(CHANGE_APP, newApp)
    },
    leaveFeedback({
      commit,
      state,
      dispatch,
    }, message) {
      // console.log('Leave feedback!')
      // console.log(message)
      return new Promise((resolve, reject) => {
        //debugger
        api.post('/api/messages', {
          from: message.from,
          subject: message.subject,
          body: message.body,
          to: message.to,
          timestamp: message.timestamp,
          userId: message.userId,
          about: 'local_eval',
          ref: state.record.id,
        })
          .then((success) => {
            commit(CREATE_FEEDBACK, success.body)
            const feedbackItem = success.body
            if (feedbackItem.id) {
              api.put('/api/records/' + state.record.id + '/messages/rel/' + feedbackItem.id, {
                evaluationRecordId: state.record.id,
                messageId: feedbackItem.id,
              }).then((success) => {
                commit(LEAVE_FEEDBACK, feedbackItem)
                dispatch('loadRecord')
                resolve(success)
              }).catch((error) => {
                commit(API_FAILURE, error, {
                  root: true,
                })
                reject(error)
              })
            }
          })
          .catch((error) => {
            commit(API_FAILURE, error, {
              root: true,
            })
            reject(error)
          })
      })
    },
    loadRecord({
      commit,
      state,
      dispatch,
    }) {
      commit(LOAD_RECORD)
      return new Promise((resolve, reject) => {
        if (state && state.record && state.record.id) {
          api.get('/api/records/' + state.record.id + '/?filter=' + encodeURIComponent(JSON.stringify({
            include: ['messages', 'logs'],
          })))
            .then((success) => {
              console.log("LOAD RECORD Got ")
              console.log(success)
              commit(SELECT_MODULE, {
                module: state.module,
                record: success,
              })
              resolve(success)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject("No record found")
        }
      })
    },
    persistRecord({
      commit,
      state,
      dispatch,
    }) {
      const record = state.record
      return new Promise((resolve, reject) => {
        if (!record) {
          return reject("No record to be persisted")
        }
        api.patch('/api/records/' + state.record.id, {
          checklist: record.checklist || [],
        }).then(success => resolve(success))
          .catch(error => reject(error))
      })
    },
    updateChecklist({
      commit,
      state,
      dispatch,
    }, checklist) {
      // console.log('Leave checkList!')
      // console.log(checklist)
      return new Promise((resolve, reject) => {
        if (!state.record) {
          return reject("No record to be persisted")
        }
        commit(UPDATE_CHECKLIST, checklist)
        api.patch('/api/records/' + state.record.id + '/updateChecklist', {
          checklist,
        }).then((success) => {
          commit(RECORD_PERSISTED, success)
          dispatch('loadRecord')
          resolve(success)
        })
          .catch((error) => {
            commit(API_FAILURE, error, {
              root: true,
            })
            reject(error)
          })
      })
    },
    selectModule({
      commit,
    }, {
      module,
      record,
    }) {
      commit(SELECT_MODULE, {
        module,
        record,
      })
    },
  },
  state: {
    currentApp: 0,
    student: undefined,
    courses: [],
    progress: [],
    module: undefined,
    record: undefined,
    apps: [{
      'label': 'Home',
      'description': 'Home',
      'target': '/apps/student/d/home',
      'icon': 'home',
        // 'component' : Programs
    },
    {
      'label': 'Final Projects',
      'description': 'Final Projects',
      'target': '/apps/student/d/final',
      'icon': 'rocket',
    },
    {
      'label': 'Local Evaluation',
      'description': 'Local Evaluation',
      'target': '/apps/student/d/localeval',
      'icon': 'tachometer',
        // 'component' : Programs
    },
    {
      'label': 'Global Evaluation',
      'description': 'Global Evaluation',
      'target': '/apps/student/d/globaleval',
      'icon': 'tachometer',
        // 'component' : Programs
    },

    ],
  },
  mutations: {
    [CHANGE_APP](state, newApp) {
      state.currentApp = newApp;
    },
    [SET_STUDENT](state, data) {
      state.student = data
    },
    [RELOAD_STUDENT](state, data) {},
    [LOAD_PROGRESS](state) {},
    [SET_PROGRESS](state, progress) {
      state.progress = progress
    },
    [SELECT_MODULE](state, {
      module,
      record,
    }) {
      state.module = module
      state.record = record
    },
    [LEAVE_FEEDBACK](state, feedback) {
      console.log("Left feedback" + JSON.stringify(feedback))

      const rec = {
        ...state.record,
      } || {}
      const msgs = rec.messages || []
      msgs.push(feedback)
      rec.messages = msgs
      state.record = rec
    },
    [UPDATE_CHECKLIST](state, checklist) {
      const rec = {
        ...state.record,
      } || {}
      const cl = checklist || []
      rec.checklist = checklist
      state.record = rec
    },
    [LOAD_RECORD](state) {},
    [PERSIST_RECORD](state, response) {
      if (response.body) {
        state.record = response.body
      } else {
        state.record = undefined
      }
      console.assert(state.record, 'ERROR record is undefined')
    },
    [RECORD_PERSISTED](state) {},
    [CREATE_FEEDBACK](state, feedback) {
      console.log("Created feedback" + JSON.stringify(feedback))
    },
  },
  getters: {
    currentCourse: state => state.student && state.student.course || null,
    courseModules: (state ) => {
      const mods = (state.student && state.student.course) ? state.student.course.modules : []
      return mods.sort((a,b)=>{
        a = new Date(a.date)
        b = new Date(b.date)
        return a>b ? 1 : a<b ? -1 : 0;
      })
    } ,
    selectedModule: state => state.module,
    selectedRecord: state => state.record,
    recordMessages: state => state.record ? state.record.messages : [],
    currentApp: state => state.currentApp,
    courses: state => state.courses,
    student: state => state.student,
    progress: state => state.progress,
    apps: state => state.apps,
    evaluations: state => state.progress.filter(ev => ev.evaluation.kind === 'global'),
    currentEval: (state) => {
      if (state.progress && state.progress.length > 0) {
        if (state.record && state.record.studentEvaluationId) {
          const evalId = state.record.studentEvaluationId
          return state.progress.find(p => p.id === evalId)
        }
      }
      return null
    },
    localEval: (state) => {
      if (state.progress && state.progress.length > 0) {
        return state.progress.find(ev => ev.evaluation && ev.evaluation.kind === 'local')
      }
      return null
    },
    localEvalRecords: (state) => {
      if (state.progress && state.progress.length > 0) {
        const localEval = state.progress.find(ev => ev.evaluation && ev.evaluation.kind === 'local')
        if (localEval) return localEval.records
      }
      return []
    },
  },
}
