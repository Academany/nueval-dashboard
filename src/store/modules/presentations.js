const LOAD_PRESENTATIONS = "LOAD_PRESENTATIONS"
const SET_PRESENTATIONS = "SET_PRESENTATIONS"
const CREATE_PRESENTATION = "CREATE_PRESENTATION"
const UPDATE_PRESENTATION = "UPDATE_PRESENTATION"
const DELETE_PRESENTATION = "DELETE_PRESENTATION"
import {
  API_FAILURE
} from './failure'
import api from './api'

export default {
  state: {
    presentations: []
  },
  actions: {
    loadPresentations({
      commit
    }, courseId) {
      commit(LOAD_PRESENTATIONS);
      const opts = {
        url: '/api/courses/' + courseId + '/presentations?filter=' + encodeURIComponent(JSON.stringify({
          include: ['booked', 'presented']
        }))
      }
      api.get(opts.url)
        .then(function (response) {
          commit('SET_PRESENTATIONS', response);
        })
        .catch(function (error) {
          commit('API_FAILURE', error)
        });
    },
    setPresentations({
      commit
    }, newPres) {
      commit(SET_PRESENTATIONS, newPres)
    },
    createPresentation({
      commit
    }, newPres) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        // var body = { ...newPres
        // }
        // delete body.course;
        api.post("/api/courses/" + newPres.courseId + "/presentations", newPres).then((response) => {
          // http success, call the mutator and change something in state
          console.log(response);
          commit(CREATE_PRESENTATION, response.body)
          // Let the calling function know that http is done. You may send some data back
          // push('/apps/manager/courses')
          resolve(response.body);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          // push('/apps/manager/courses')
          reject(error);
        })
      })
    },
    updatePresentation({
      commit
    }, newPres) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        var body = { ...newPres}
        api.put("/api/courses/" + newPres.courseId + "/presentations/" + newPres.id, body).then(response => {
          // http success, call the mutator and change something in state
          commit(UPDATE_PRESENTATION, response.body)
          // Let the calling function know that http is done. You may send some data back
          //  push('/apps/manager/courses')
          resolve(response.body);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          //  push('/apps/manager/courses')
          reject(error);
        })
      });
    },
    deletePresentation({
      commit
    }, newPres) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + newPres.courseId + "/presentations/" + newPres.id).then(response => {
          // http success, call the mutator and change something in state
          commit(DELETE_PRESENTATION, newPres)
          // Let the calling function know that http is done. You may send some data back
          //  push('/apps/manager/courses')
          resolve(response);
        }).catch((error) => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          //  push('/apps/manager/courses')
          reject(error);
        })
      })
    }
  },
  mutations: {
    [LOAD_PRESENTATIONS](state) {
      //nop
    },
    [SET_PRESENTATIONS](state, newList) {
      state.presentations = newList;
    },
    [CREATE_PRESENTATION](state, response) {
      let newc = state.presentations.slice();
      newc.push(response);
      state.presentations = newc;
    },
    [UPDATE_PRESENTATION](state, response) {
      let newc = [];
      state.presentations.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.presentations = newc;
    },
    [DELETE_PRESENTATION](state, response) {
      let newc = [];
      state.presentations.forEach((el) => {
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
    presentations(state) {
      return state.presentations
    }
  }
}