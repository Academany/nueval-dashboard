// labs
export const LOAD_LABS = "LOAD_LABS"
export const SET_LABS = "SET_LABS"
export const CREATE_LAB = "CREATE_LAB"
export const UPDATE_LAB = "UPDATE_LAB"
export const DELETE_LAB = "DELETE_LAB"

import {API_FAILURE} from './failure'
import api from './api'


export default {
    getters: {
        labs: state => {
            return state.labs
        },
    },
    mutations: {
        [LOAD_LABS](state) {
            //nop
        },
        [SET_LABS](state, labs) {
            state.labs = labs;
        },
        [CREATE_LAB](state, response) {
            var newc = state.labs.slice();
            newc.push(response);
            state.labs = newc;
        },
        [UPDATE_LAB](state, response) {
            let newc = [];
            state.labs.forEach((el) => {
                if (el.id === response.id) {
                    newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.labs = newc;

        },
        [DELETE_LAB](state, response) {
            let newc = [];
            state.labs.forEach((el) => {
                if (el.id === response.id) {
                    // newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.labs = newc;
        },
    },
    actions: {

        loadLabs({
            commit
        }, courseId) {
            commit(LOAD_LABS);
            const opts = {
                url: '/api/courses/' + courseId + '/labs?filter=' + encodeURIComponent(
                    JSON.stringify({
                        include: ['course','students','instructors','supernode']
                    })
                )
            }
            api.get(opts.url)
                .then(function (response) {
                    // console.log('set labs');
                    // console.log(response);
                    commit('SET_LABS', response);
                })
                .catch(function (error) {
                    commit('API_FAILURE', error)
                    //  if (cb) cb(error);
                });
        },
        setLabs({
            commit
        }, labs) {
            commit(SET_LABS, labs);
        },
        createLab({
            commit
        }, lab) {
            // random password, there's no login anyway
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/courses/" + lab.course.id + "/labs", lab).then(response => {
                    // http success, call the mutator and change something in state
                    commit(CREATE_LAB, response.body)
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
        updateLab({
            commit,dispatch
        }, lab) {
            return new Promise((resolve, reject) => {

                const courseId = lab.courseId || lab.course && lab.course.id
                if (!courseId) return reject("Can't find courseId")
                // Do something here... lets say, a http call using vue-resource
                api.put("/api/courses/" + courseId + "/labs/" + lab.id, lab).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_LAB, response.body)
                    dispatch('loadLabs', courseId)
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
        deleteLab({
            commit
        }, lab) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                const courseId = lab.courseId || lab.course.id
                if (!courseId) return reject("Can't find courseId")
                
                api.delete("/api/courses/" + courseId + "/labs/" + lab.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_LAB, lab)
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
        }

    },
    state: {
        labs: []  
    }
}