// roles
export const LOAD_ROLES = "LOAD_ROLES"
export const SET_ROLES = "SET_ROLES"
export const CREATE_ROLE = "CREATE_ROLE"
export const UPDATE_ROLE = "UPDATE_ROLE"
export const DELETE_ROLE = "DELETE_ROLE"
import {API_FAILURE} from './failure'
import api from './api'


export default {
    actions: {
        loadRoles({
            commit
        }) {
            commit(LOAD_ROLES);
            const opts = {
                url: '/api/roles'
            }
            api.get(opts.url)
                .then(function (response) {
                    console.log('set roles');
                    console.log(response);
                    commit('SET_ROLES', response);
                })
                .catch(function (error) {
                    commit('API_FAILURE', error)
                    //  if (cb) cb(error);
                });
        },
        setRoles({
            commit
        }, roles) {
            console.log('Got');
            console.log(roles);
            commit(SET_ROLES, roles);
        },
        createRole({
            commit
        }, role) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/roles", role).then(response => {
                    // http success, call the mutator and change something in state
                    commit(CREATE_ROLE, role)
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
        updateRole({
            commit
        }, role) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.patch("/api/roles/" + role.id, course).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_ROLE, role)
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
        deleteRole({
            commit
        }, role) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.delete("/api/roles/" + role.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_ROLE, role)
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
    mutations: {
        [LOAD_ROLES](state) {
            //nop
        },
        [SET_ROLES](state, roles) {
            state.roles = roles;
        },
        [CREATE_ROLE](state, response) {
            var newc = state.roles.slice();
            newc.push(response);
            state.roles = newc;
        },
        [UPDATE_ROLE](state, response) {
            let newc = [];
            state.roles.forEach((el) => {
                if (el.id === response.id) {
                    newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.roles = newc;

        },
        [DELETE_ROLE](state, response) {
            let newc = [];
            state.roles.forEach((el) => {
                if (el.id === response.id) {
                    // newc.push(response);
                } else {
                    newc.push(el)
                }
            });
            state.roles = newc;
        },
    },
    state: {
        roles: [],
    },
    getters: {
        roles: state => {
            return state.roles
        },
    }

}