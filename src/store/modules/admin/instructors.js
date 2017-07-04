// instructors
export const LOAD_INSTRUCTORS = "LOAD_INSTRUCTORS"
export const SET_INSTRUCTORS = "SET_INSTRUCTORS"
export const CREATE_INSTRUCTOR = "CREATE_INSTRUCTOR"
export const UPDATE_INSTRUCTOR = "UPDATE_INSTRUCTOR"
export const DELETE_INSTRUCTOR = "DELETE_INSTRUCTOR"

import { API_FAILURE } from '../failure'
import api from '../api'

export default {
  namespaced: true,
  state: {
    instructors: [],
    loading: false,
    courseId: null,
  },
  actions: {
    loadInstructors({
            commit,
        }, course_id) {
      commit(LOAD_INSTRUCTORS, course_id)
      const opts = {
        url: '/api/courses/' +
                    course_id +
                    '/instructors?filter=' +
                    encodeURIComponent(JSON.stringify({
                      "include": {
                        "labs": {
                          "students": ['booked', 'presented'],
                        },
                        "course": true,
                        "user": true,
                      },
                    })),
      }
      api.get(opts.url)
                .then(function (response) {
                  console.log(response);
                  commit('SET_INSTRUCTORS', response);
                })
                .catch(function (error) {
                  commit('API_FAILURE', error, { root: true })
                });
    },
    setInstructors({
            commit,
        }, instructors) {
      console.log('Got');
      console.log(courses);
      commit(SET_INSTRUCTORS, instructors);
    },
    createInstructor({
            commit, dispatch,
        }, instructor) {
      return new Promise((resolve, reject) => {
                 // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses/" + instructor.courseId + "/instructors", instructor).then((response) => {
                    // http success, call the mutator and change something in state
          commit(CREATE_INSTRUCTOR, response.body)
                    // Let the calling function know that http is done. You may send some data back
                    // push('/apps/manager/courses')
          dispatch('loadInstructors', instructor.courseId)

          resolve(response);
        }, (error) => {
                    // http failed, let the calling function know that action did not work out
          commit('API_FAILURE', error, { root: true })
                    // push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    updateInstructor({
            commit, dispatch,
        }, instructor) {
            // console.log(instructor);
      return new Promise((resolve, reject) => {
        const courseId = instructor.courseId;
                // Do something here... lets say, a http call using vue-resource
        api.put("/api/courses/" + instructor.courseId + "/instructors/" + instructor.id, instructor).then((response) => {
                    // http success, call the mutator and change something in state
          commit(UPDATE_INSTRUCTOR, response.body)
          dispatch('loadInstructors', instructor.courseId)
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
    deleteInstructor({
          commit, dispatch,
        }, instructor) {
      return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + instructor.courseId + "/instructors/" + instructor.id).then((response) => {
                    // http success, call the mutator and change something in state
          commit(DELETE_INSTRUCTOR, instructor)
          dispatch('loadInstructors', courseId)

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
  },
  mutations: {
    [LOAD_INSTRUCTORS](state, courseId) {
            // nop
      state.loading = true
      state.courseId = courseId
    },
    [SET_INSTRUCTORS](state, newInstructors) {
      state.loading = false
      state.instructors = newInstructors
    },
    [CREATE_INSTRUCTOR](state, response) {
      state.instructors.push(response)
    },
    [UPDATE_INSTRUCTOR](state, response) {
      let newc = [];
      state.instructors.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.instructors = newc;
    },
    [DELETE_INSTRUCTOR](state, response) {
      let newc = [];
      state.instructors.forEach((el) => {
        if (el.id === response.id) {
                    // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.instructors = newc;
    },

  },
  getters: {
    instructors: state => state.instructors,
  },
}
