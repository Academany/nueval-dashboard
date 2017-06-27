export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const SET_STUDENT = "SET_STUDENT"
export const RELOAD_STUDENT = "RELOAD_STUDENT"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const SET_PROGRESS = "SET_PROGRESS"
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
      console.log(student)
      commit(SET_STUDENT, student)
      return dispatch('reloadStudent')
    },
    reloadStudent({
        commit, state, dispatch,
    }) {
      commit(RELOAD_STUDENT)
      return new Promise((resolve, reject) => {
        api.get('/api/students/' + state.student.id + '?filter=' + encodeURIComponent(
            JSON.stringify({
              include: [{
                course: {
                  presentations: true,
                  modules: true,
                },
              },
                'lab',
              ],
            })
        )).then((response) => {
          commit(SET_STUDENT, response)
          dispatch('loadProgress')
          resolve(response)
        }).catch((error) => {
          commit(API_FAILURE, error, { root: true })
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
  },
  state: {
    currentApp: 0,
    student: null,
    courses: [],
    progress: [],
    apps: [
      {
        'label': 'Home',
        'description': 'Home',
        'target': '/apps/student/d/home',
        'icon': 'home',
                    // 'component' : Programs
      },
      {
        'label': 'Weekly Progress',
        'description': 'Progress',
        'target': '/apps/student/d/progress',
        'icon': 'check',
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
  },
  getters: {
    currentCourse: state => state.student && state.student.course || null,
    currentApp: state => state.currentApp,
    courses: state => state.courses,
    student: state => state.student,
    progress: state => state.progress,
    apps: state => state.apps,
    localEval: (state) => {
      if (state.progress && state.progress.length > 0) {
        return state.progress.find(ev => ev.evaluation && ev.evaluation.kind === 'local')
      }
      return null
    },
  },
}
