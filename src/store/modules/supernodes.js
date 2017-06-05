const LOAD_SUPERNODES = "LOAD_SUPERNODES"
const SET_SUPERNODES = "SET_SUPERNODES"
const CREATE_SUPERNODE = "CREATE_SUPERNODE"
const UPDATE_SUPERNODE = "UPDATE_SUPERNODE"
const DELETE_SUPERNODE = "DELETE_SUPERNODE"
import {API_FAILURE} from './failure'
import api from './api'


export default {
  state: {
    supernodes: []
  },
  actions: {
    loadSupernodes({
      commit
    }, courseId) {
      commit(LOAD_SUPERNODES)
      api.get('/api/courses/' + courseId + '/supernodes?filter[include]=labs').
      then((response)=>{
        commit(SET_SUPERNODES, response)
      }).catch((error)=>{
        commit(API_FAILURE, error, {root: true})
      })
    },
    setSupernodes({
      commit
    }, newPres) {
      commit(SET_SUPERNODES, newPres)
    },
    createSupernode({
            commit
        }, supernode) {
            // random password, there's no login anyway
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.post("/api/courses/" + supernode.courseId + "/supernodes", supernode).then(response => {
                    // http success, call the mutator and change something in state
                    debugger
                    commit(CREATE_SUPERNODE, response.body)
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
        updateSupernode({
            commit
        }, supernode) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.put("/api/courses/" + supernode.courseId + "/supernodes/" + supernode.id, supernode).then(response => {
                    // http success, call the mutator and change something in state
                    commit(UPDATE_SUPERNODE, response.body)
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
        deleteSupernode({
            commit
        }, supernode) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.delete("/api/courses/" + supernode.courseId + "/supernodes/" + supernode.id).then(response => {
                    // http success, call the mutator and change something in state
                    commit(DELETE_SUPERNODE, supernode)
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
  mutations: {
    [LOAD_SUPERNODES](state) {
      //nop
    },
    [SET_SUPERNODES](state, newList) {
      state.supernodes = newList;
    },
    [CREATE_SUPERNODE](state, response) {
      debugger
      let newc = state.supernodes.slice();
      newc.push(response);
      state.supernodes = newc;
    },
    [UPDATE_SUPERNODE](state, response) {
      let newc = [];
      state.supernodes.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.supernodes = newc;
    },
    [DELETE_SUPERNODE](state, response) {
      let newc = [];
      state.supernodes.forEach((el) => {
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.supernodes = newc;
    }

  },

  getters: {
    supernodes(state) {
      return state.supernodes
    }
  }
}