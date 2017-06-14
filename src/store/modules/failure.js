export const API_FAILURE = "API_FAILURE"

export default {
  actions: {

  },
  mutations: {
    [API_FAILURE](state, error) {
      state.api_error = JSON.stringify(error);
    },
  },
  getters: {
    api_error: state => state.api_error,
  },
  state: {
    api_error: '',
  },

}
