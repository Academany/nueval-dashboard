export const API_FAILURE = "API_FAILURE"

export default {
    actions: {

    },
    mutations: {
        [API_FAILURE](state, error) {
            state.api_error = error;
        }
    },
    getters: {
        api_error: state => {
            return state.api_error
        }
    },
    state: {
        api_error: ''
    }

}