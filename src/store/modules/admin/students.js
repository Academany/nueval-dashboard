// students
export const LOAD_STUDENTS = "LOAD_STUDENTS"
export const SET_STUDENTS = "SET_STUDENTS"
export const CREATE_STUDENT = "CREATE_STUDENT"
export const UPDATE_STUDENT = "UPDATE_STUDENT"
export const DELETE_STUDENT = "DELETE_STUDENT"
import { API_FAILURE } from '../failure'
import api from '../api'

export default {
  namespaced: true,
  state: {
    students: [],
    loading: false,
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
                      "include": ["lab", "course", "user"],
                    })),
      }
      api.get(opts.url)
                .then(function (response) {
                  console.log(response);
                  commit('SET_STUDENTS', response);
                })
                .catch(function (error) {
                  commit('API_FAILURE', error, { root: true })
                });
    },
    setStudents({
            commit,
        }, students) {
      console.log('Got');
      console.log(courses);
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
  },
  getters: {
    students: state => state.students,
  },
}
