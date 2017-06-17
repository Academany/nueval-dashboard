import {
    API_FAILURE,
} from '../failure'
import api from '../api'

export const INIT_LOGS = 'INIT_LOGS'
export const LOAD_LOGS = 'LOAD_LOGS'
export const SET_LOGS = 'SET_LOGS'
export const SET_LOGS_COUNT = 'SET_LOGS_COUNT'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const COUNT_LOGS = 'COUNT_LOGS'

export default {
  namespaced: true,
  state: {
    perPage: 5,
    currentPage: 0,
    total: 0,
    logs: [],
    loading: false,
  },
  getters: {
    logs: state => state.logs,
    currentPage: state => state.currentPage,
    isLoading: state => state.loading,
    total: state => state.total,
    perPage: state => state.perPage,
    pages: state => Math.min(Math.round(state.total / state.perPage), 1),
  },
  actions: {
    initLogs({ commit, dispatch }, perPage) {
      commit(INIT_LOGS, perPage)
      return new Promise((resolve, reject) => {
        dispatch('countLogs').then(
                    (success) => {
                      dispatch('loadLogs')
                      resolve(success)
                    }
                ).catch((error) => {
                  reject('Error loading logs:' + JSON.stringify(error))
                })
      })
    },
    setCurrentPage({ commit, dispatch }, page) {
      commit(SET_CURRENT_PAGE, page)
      dispatch('loadLogs')
    },
    countLogs({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.get('/api/activity/count')
                .then((data) => {
                  commit(SET_LOGS_COUNT, data.count)
                  resolve(data.count)
                }).catch((error) => {
                  commit(SET_LOGS, [])
                  commit(API_FAILURE, error, {
                    root: true,
                  })
                  reject(error)
                })
      })
    },
    loadLogs({
            commit,
            state,
        }) {
      commit(LOAD_LOGS)
      return new Promise((resolve, reject) => {
        api.get('/api/activity?filter=' +
                    encodeURI(
                        JSON.stringify({
                          'include': ['causer'],
                          'limit': state.perPage,
                          'order': 'createdAt DESC',
                          'skip': state.currentPage * state.perPage,
                        })
                ))
                .then((response) => {
                  commit(SET_LOGS, response)
                  resolve(response)
                }).catch((error) => {
                  commit(SET_LOGS, [])
                  commit(API_FAILURE, error, {
                    root: true,
                  })
                  reject(error)
                })
      })
    },
  },
  mutations: {
    [INIT_LOGS](state, perPage) {
      if (perPage) {
        state.perPage = perPage
      }
      state.logs = []
      state.total = 0
      state.currentPage = 0
      state.loading = false
    },
    [LOAD_LOGS](state) {
      state.loading = true
    },
    [COUNT_LOGS](state) {
      state.loading = true
    },
    [SET_LOGS](state, logs) {
      state.loading = false
      state.logs = logs
    },
    [SET_LOGS_COUNT](state, count) {
      state.total = count
      state.loading = false
    },
    [SET_CURRENT_PAGE](state, page) {
      state.currentPage = page
    },
  },
}
