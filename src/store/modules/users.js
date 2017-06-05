// users
export const LOAD_USERS = "LOAD_USERS"
export const SET_USERS = "SET_USERS"
export const CREATE_USER = "CREATE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"
import {API_FAILURE} from './failure'
import api from './api'

export default {
    mutations: {
        [LOAD_USERS](state){
      //nop
    },
    [SET_USERS](state,users){
      state.users = users;
    },
    [CREATE_USER](state,response){
      var newc = state.users.slice();
      newc.push(response);
      state.users = newc;
    },
    [UPDATE_USER](state,response){
      let newc = [];
      state.users.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.users = newc;

    },
    [DELETE_USER](state,response){
      let newc = [];
      state.users.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.users = newc;
    },
    },
    actions: {
        loadUsers({
            commit
        }) {
            commit(LOAD_USERS);
            const opts = {
                url: '/api/users?filter[include]=roles'
            }
            api.get(opts.url)
                .then(function (response) {
                    console.log('set users');
                    console.log(response);
                    commit('SET_USERS', response);

                })
                .catch(function (error) {
                    commit('API_FAILURE', error)
                    //  if (cb) cb(error);
                });
        },
        setUsers({
            commit
        }, users) {
            commit(SET_USERS, users);
        },
        createUser({
            commit,
            dispatch
        }, user) {
            // random password, there's no login anyway
            user.password = Math.random().toString(36).slice(-8);
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/users", user).then(response => {
                    // http success, call the mutator and change something in state
                    commit(CREATE_USER, response.body)
                    dispatch('loadUsers')
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
        updateUser({
            commit,
            dispatch
        }, user) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.patch("/api/users/" + user.id, user).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_USER, response.body)
                    dispatch('loadUsers')
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
        deleteUser({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.delete("/api/users/" + user.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_USER, user)
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
        users: state => {
            return state.users.map((el) => {
                let roles = el.roles || [];
                let role_names = roles.map((rl) => rl.name)
                el.role_names = role_names.join(',');
                return el;
            })
        },
    },
    state: {
        users: []
    }
}