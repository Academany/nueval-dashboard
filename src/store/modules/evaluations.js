const LOAD_EVALUATIONS = "LOAD_EVALUATIONS"
const SET_EVALUATIONS = "SET_EVALUATIONS"
const CREATE_EVALUATION = "CREATE_EVALUATION"
const UPDATE_EVALUATION = "UPDATE_EVALUATION"
const DELETE_EVALUATION = "DELETE_EVALUATION"
import {
  API_FAILURE
} from './failure'
import api from './api'

export default {
  state: {
    evaluations: []
  },
  actions: {
    loadEvaluations({
      commit
    }, courseId) {
      commit(LOAD_EVALUATIONS);
      const opts = {
        url: '/api/courses/' + courseId + '/evaluations'
      }
      api.get(opts.url)
        .then(function (response) {
          commit('SET_EVALUATIONS', response);
        })
        .catch(function (error) {
          commit('API_FAILURE', error)
        });
    },
    setEvaluations({
      commit
    }, item) {
      commit(SET_EVALUATIONS, item)
    },
    createEvaluation({
      commit
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses/" + item.courseId + "/evaluations", item).then((response) => {
          // http success, call the mutator and change something in state
          console.log(response);
          commit(CREATE_EVALUATION, response.body)
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
    updateEvaluation({
      commit
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.put("/api/courses/" + item.courseId + "/evaluations/" + item.id, item).then(response => {
          // http success, call the mutator and change something in state
          commit(UPDATE_EVALUATION, response.body)
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
    deleteEvaluation({
      commit
    }, item) {
      return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + item.courseId + "/evaluations/" + item.id).then(response => {
          // http success, call the mutator and change something in state
          commit(DELETE_EVALUATION, item)
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
    [LOAD_EVALUATIONS](state) {
      //nop
    },
    [SET_EVALUATIONS](state, newList) {
      state.evaluations = newList;
    },
    [CREATE_EVALUATION](state, response) {
      let newc = state.evaluations.slice();
      newc.push(response);
      state.evaluations = newc;
    },
    [UPDATE_EVALUATION](state, response) {
      let newc = [];
      state.evaluations.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.evaluations = newc;
    },
    [DELETE_EVALUATION](state, response) {
      let newc = [];
      state.evaluations.forEach((el) => {
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.evaluations = newc;
    }

  },

  getters: {
    evaluations(state) {
      return state.evaluations
    }
  }
}