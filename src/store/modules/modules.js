// labs
export const LOAD_MODULES = "LOAD_MODULES"
export const SET_MODULES = "SET_MODULES"
export const CREATE_MODULE = "CREATE_MODULE"
export const UPDATE_MODULE= "UPDATE_MODULE"
export const DELETE_MODULE = "DELETE_MODULE"

import {API_FAILURE} from './failure'
import api from './api'


export default {
    getters: {
        modules: state => {
            return state.mods
        },
    },
    mutations: {
        [LOAD_MODULES](state) {
            //nop
        },
        [SET_MODULES](state, mods) {
            state.mods = mods;
        },
        [CREATE_MODULE](state, response) {
            var newc = state.mods.slice();
            newc.push(response);
            state.mods = newc;
        },
        [UPDATE_MODULE](state, response) {
            let newc = [];
            state.mods.forEach((el) => {
                if (el.id === response.id) {
                    newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.mods = newc;

        },
        [DELETE_MODULE](state, response) {
            let newc = [];
            state.mods.forEach((el) => {
                if (el.id === response.id) {
                    // newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.mods = newc;
        },
    },
    actions: {

        loadModules({
            commit
        }, courseId) {
            commit(LOAD_MODULES);
            const opts = {
                url: '/api/courses/' + courseId + '/modules?filter=' + encodeURIComponent(
                    JSON.stringify({
                        include: ['course']
                    })
                )
            }
            api.get(opts.url)
                .then(function (response) {
                    console.log('set modules');
                    console.log(response);
                    commit('SET_MODULES', response);
                })
                .catch(function (error) {
                    commit('API_FAILURE', error)
                    //  if (cb) cb(error);
                });
        },
        setModules({
            commit
        }, mods) {
            commit(SET_MODULES, mods);
        },
        createModule({
            commit
        }, mod) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/courses/" + mod.course.id + "/mods", mod).then(response => {
                    // http success, call the mutator and change something in state
                    commit(CREATE_MODULE, lab)
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
        updateModule({
            commit
        }, mod) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.put("/api/courses/" + mod.course.id + "/labs/" + mod.id, mod).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_MODULE, mod)
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
        deleteModule({
            commit
        }, mod) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.delete("/api/courses/" + mod.course.id + "/modules/" + mod.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_MODULE,mod)
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
        mods: []  
    }
}