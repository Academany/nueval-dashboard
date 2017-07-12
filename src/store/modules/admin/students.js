// students
export const LOAD_STUDENTS = "LOAD_STUDENTS"
export const SET_STUDENTS = "SET_STUDENTS"
export const CREATE_STUDENT = "CREATE_STUDENT"
export const UPDATE_STUDENT = "UPDATE_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const HAS_FAILURE = "HAS_FAILURE"
export const SELECT_STUDENT = "SELECT_STUDENT"
export const SET_PROGRESS = "SET_PROGRESS"

import { API_FAILURE } from '../failure'
import api from '../api'

export default {
  namespaced: true,
  state: {
    students: [],
    loading: false,
    student: undefined,
    progress: undefined,
  },
  actions: {
    loadStudents({
            commit,
        }, course_id) {
      commit(LOAD_STUDENTS, course_id)
      const opts = {
        url: '/api/courses/' +
                    course_id +
                    '/students?filter=' +
                    encodeURIComponent(JSON.stringify({
                      "include": [
                        "lab",
                        "course",
                        "user",
                        "evaluations",
                        { "sheets": ['records', 'evaluation'] },
                      ],
                    })),
      }
      api.get(opts.url)
                .then(function (response) {
                  // console.log(response);
                  commit('SET_STUDENTS', response);
                })
                .catch(function (error) {
                  commit('API_FAILURE', error, { root: true })
                });
    },
    setStudents({
            commit,
        }, students) {
      // console.log('Got');
      // console.log(courses);
      commit(SET_STUDENTS, students);
    },
    createStudent({
            commit, dispatch,
        }, student) {
      return new Promise((resolve, reject) => {
                 // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses/" + student.courseId + "/students", student).then((response) => {
                    // http success, call the mutator and change something in state
          commit(CREATE_STUDENT, response.body)
                    // Let the calling function know that http is done. You may send some data back
                    // push('/apps/manager/courses')
          dispatch('loadStudents', student.courseId)

          resolve(response);
        }, (error) => {
                    // http failed, let the calling function know that action did not work out
          commit('API_FAILURE', error, { root: true })
                    // push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    updateStudent({
            commit, dispatch,
        }, student) {
            // console.log(student);
      return new Promise((resolve, reject) => {
        const courseId = student.courseId;
                // Do something here... lets say, a http call using vue-resource
        api.put("/api/courses/" + courseId + "/students/" + student.id, student).then((response) => {
                    // http success, call the mutator and change something in state
          commit(UPDATE_STUDENT, response.body)
          dispatch('loadStudents', courseId)
                    // Let the calling function know that http is done. You may send some data back
                    //  push('/apps/manager/courses')
          resolve(response);
        }, (error) => {
                    // http failed, let the calling function know that action did not work out
          commit('API_FAILURE', error, { root: true })
                    //  push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    deleteStudent({
          commit, dispatch,
        }, student) {
      return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + student.courseId + "/students/" + student.id).then((response) => {
                    // http success, call the mutator and change something in state
          commit(DELETE_STUDENT, student)
          dispatch('loadStudents', student.courseId)
                    // Let the calling function know that http is done. You may send some data back
                    //  push('/apps/manager/courses')
          resolve(response);
        }).catch((error) => {
                    // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error, { root: true });
                    //  push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    loadProgress({
      commit,
      dispatch,
    }, student) {
      commit(SELECT_STUDENT, student)
      commit(LOAD_PROGRESS, student.id)
      return new Promise((resolve, reject) => {
        api.get('/api/students/' + student.id + '/progress') // ?filter=' + encodeURIComponent(JSON.stringify(params)))
          .then((data) => {
            if (data) {
              commit(SET_PROGRESS, data)
              resolve(data)
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
  },
  mutations: {
    [LOAD_STUDENTS](state) {
            // nop
      state.loading = true
    },
    [SET_STUDENTS](state, newStudents) {
      state.loading = false
      state.students = newStudents
    },
    [CREATE_STUDENT](state, response) {
      state.students.push(response)
    },
    [UPDATE_STUDENT](state, response) {
      let newc = [];
      state.students.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.students = newc;
    },
    [DELETE_STUDENT](state, response) {
      let newc = [];
      state.students.forEach((el) => {
        if (el.id === response.id) {
                    // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.students = newc;
    },
    [LOAD_PROGRESS](state, student) {
      state.loading = true
    },
    [SET_PROGRESS](state, progress) {
      state.progress = progress
      state.loading = false
    },
    [SELECT_STUDENT](state, student) {
      state.student = student
      state.progress = undefined
    },
    [HAS_FAILURE](state) {
      state.loading = false
    },
  },
  getters: {
    students: state => state.students,
    student: state => state.student,
    progress: state => state.progress,
    loading: state => state.loading,
  },
}
