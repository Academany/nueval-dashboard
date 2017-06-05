// courses
export const LOAD_COURSES = "LOAD_COURSES"
export const SET_COURSES = "SET_COURSES"
export const CREATE_COURSE = "CREATE_COURSE"
export const UPDATE_COURSE = "UPDATE_COURSE"
export const DELETE_COURSE = "DELETE_COURSE"

import {API_FAILURE} from './failure'
import api from './api'

export default {
    actions: {
        loadCourses({
            commit,
            state
        }, refresh) {
            commit(LOAD_COURSES);
            if (state.courses && state.courses.length > 0 && !refresh) {
                return;
            }
            const opts = {
                url: '/api/courses' /* ?filter=' + encodeURIComponent(
                    JSON.stringify({
                        include: []
                    }))*/
            }
            api.get(opts.url)
                .then(function (response) {
                    // console.log('set courses');
                    // console.log(response);
                    commit('SET_COURSES', response);
                })
                .catch(function (error) {
                    commit('API_FAILURE', error)
                    //  if (cb) cb(error);
                });
        },
        setCourses({
            commit
        }, courses) {
            // console.log('Got');
            // console.log(courses);
            commit(SET_COURSES, courses);
        },
        createCourse({
            commit
        }, course) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/courses", course).then(response => {
                    // http success, call the mutator and change something in state
                    commit(CREATE_COURSE, response.body)
                    // Let the calling function know that http is done. You may send some data back
                    // push('/apps/manager/courses')
                    resolve(response);
                }, error => {
                    // http failed, let the calling function know that action did not work out
                    commit(API_FAILURE, error);
                    // push('/apps/manager/courses')
                    reject(error);
                })
            });
        },
        updateCourse({
            commit
        }, course) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.put("/api/courses/" + course.id, course).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_COURSE, response.body)
                    // Let the calling function know that http is done. You may send some data back
                    //  push('/apps/manager/courses')
                    resolve(response);
                }, error => {
                    // http failed, let the calling function know that action did not work out
                    commit(API_FAILURE, error);
                    //  push('/apps/manager/courses')
                    reject(error);
                })
            });
        },
        deleteCourse({
            commit
        }, course) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.delete("/api/courses/" + course.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_COURSE, course)
                    // Let the calling function know that http is done. You may send some data back
                    //  push('/apps/manager/courses')
                    resolve(response);
                }, error => {
                    // http failed, let the calling function know that action did not work out
                    commit(API_FAILURE, error);
                    //  push('/apps/manager/courses')
                    reject(error);
                })
            });
        },
    },
    getters: {
        courses: state => {
            return state.courses
        },
    },
    mutations: {
        [LOAD_COURSES](state) {
            //nop
        },
        [SET_COURSES](state, courses) {
            state.courses = courses;
        },
        [CREATE_COURSE](state, response) {
            var newc = state.courses.slice();
            newc.push(response);
            state.courses = newc;
        },
        [UPDATE_COURSE](state, response) {
            let newc = [];
            state.courses.forEach((el) => {
                if (el.id === response.id) {
                    newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.courses = newc;

        },
        [DELETE_COURSE](state, response) {
            let newc = [];
            state.courses.forEach((el) => {
                if (el.id === response.id) {
                    // newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.courses = newc;
        },

    },
    state: {
        courses: [],
    }
}