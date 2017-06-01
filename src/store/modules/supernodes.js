const LOAD_SUPERNODES = "LOAD_SUPERNODES"
const SET_SUPERNODES = "SET_SUPERNODES"
const CREATE_SUPERNODE = "CREATE_SUPERNODE"
const UPDATE_SUPERNODE = "UPDATE_SUPERNODE"
const DELETE_SUPERNODE = "DELETE_SUPERNODE"


export default {
  state: {
    supernodes: []
  },
  actions: {
    loadPresentations({ commit }){
      commit(LOAD_SUPERNODES)

    },
    setPresentations({ commit},newPres){
      commit(SET_SUPERNODES, newPres)
    }
  },
  mutations: {
    [LOAD_SUPERNODES](state){
      //nop
    },
    [SET_SUPERNODES](state,newList){
      state.supernodes = newList;
    },
    [CREATE_SUPERNODE](state,response){
      let newc = state.supernodes.slice();
      newc.push(response);
      state.supernodes = newc;
    },
    [UPDATE_SUPERNODE](state,response){
      let newc = [];
      state.supernodes.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.supernodes = newc;
    },
    [DELETE_SUPERNODE](state,response){
      let newc = [];
      state.supernodes.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.supernodes = newc;
    }

  },

  getters: {
    supernodes (state) {
      return state.supernodes
    }
  }
}
