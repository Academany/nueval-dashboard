const LOAD_PRESENTATIONS = "LOAD_PRESENTATIONS"
const SET_PRESENTATIONS = "SET_PRESENTATIONS"
const CREATE_PRESENTATION = "CREATE_PRESENTATION"
const UPDATE_PRESENTATION = "UPDATE_PRESENTATION"
const DELETE_PRESENTATION = "DELETE_PRESENTATION"


export default {
  state: {
    presentations: []
  },
  actions: {
    loadPresentations({ commit }){
      commit(LOAD_PRESENTATIONS)
      
    },
    setPresentations({ commit},newPres){
      commit(SET_PRESENTATIONS, newPres)
    }
  },
  mutations: {
    [LOAD_PRESENTATIONS](state){
      //nop
    },
    [SET_PRESENTATIONS](state,newList){
      state.presentations = newList;
    },
    [CREATE_PRESENTATION](state,response){
      let newc = state.presentations.slice();
      newc.push(response);
      state.presentations = newc;
    },
    [UPDATE_PRESENTATION](state,response){
      let newc = [];
      state.presentations.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.presentations = newc;
    },
    [DELETE_PRESENTATION](state,response){
      let newc = [];
      state.presentations.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.presentations = newc;
    }

  },

  getters: {
    presentations (state) {
      return state.presentations
    }
  }
}
