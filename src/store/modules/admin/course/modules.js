export const LOAD_MODULES = "LOAD_MODULES"
export const SET_MODULES = "SET_MODULES"
export const CREATE_MODULE = "CREATE_MODULE"
export const UPDATE_MODULE = "UPDATE_MODULE"
export const DELETE_MODULE = "DELETE_MODULE"

import { API_FAILURE } from '../../failure'
import api from '../../api'

export default {
  namespaced: true,
  state: {
    modules: [],
    loading: false,
    courseId: null,
  },
  getters: {
    modules: state => state.modules,
  },
  actions: {
    loadModules({ commit, dispatch, state, getters }, courseId) {
      commit(LOAD_MODULES, courseId)
      api.get('/api/courses/' + courseId + '/modules')
        .then((response) => {
          commit(SET_MODULES, response)
        })
        .catch((error) => {
          commit(API_FAILURE, error, { root: true })
        })
    },
    updateModule({ commit, dispatch, state }, module) {
      if (!module.id) {
        return dispatch('createModule', module)
      }
      return new Promise((resolve, reject) => {
        api.put('/api/courses/' + state.courseId + '/modules/' + module.id, {
          name: module.name,
          description: module.description,
          date: module.date,
        }).then((response) => {
          commit(UPDATE_MODULE, response.body)
          dispatch('loadModules', state.courseId)
          resolve(response.body)
        }).catch((error) => {
          commit(API_FAILURE, error, { root: true })
          reject(error)
        })
      })
    },
    createModule({ commit, state, dispatch }, module) {
      return new Promise((resolve, reject) => {
        api.post('/api/courses/' + state.courseId + '/modules', {
          name: module.name,
          description: module.description,
          date: module.date,
        }).then((response) => {
          commit(CREATE_MODULE, response.body)
          dispatch('loadModules', state.courseId)
          resolve(response.body)
        }).catch((error) => {
          commit(API_FAILURE, error, { root: true })
          reject(error)
        })
      })
    },
    deleteModule({ commit, dispatch, state }, module) {
      return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
        api.delete("/api/courses/" + state.courseId + "/modules/" + module.id).then((response) => {
                    // http success, call the mutator and change something in state
          commit(DELETE_MODULE, module)
          dispatch('loadModules', state.courseId)


          resolve(response);
        }).catch((error) => {
                    // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error, { root: true });
                    //  push('/apps/manager/courses')
          reject(error);
        })
      });
    },
  },
  mutations: {
    [LOAD_MODULES](state, courseId) {
      state.loading = true
      state.courseId = courseId
    },
    [SET_MODULES](state, data) {
      state.loading = false
      state.modules = data
    },
    [UPDATE_MODULE](state, reponse) {},
    [CREATE_MODULE](state, response) {},
    [DELETE_MODULE](state, response) {},

  },
}
