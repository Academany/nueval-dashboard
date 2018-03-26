import { API_FAILURE } from './failure'
import api from './api'

const SET_LOCAL_STATS = 'SET_LOCAL_STATS'


export default {
  actions: {
    loadLocalStats({
            commit,
            state,
        }, course_id){
          return new Promise((resolve,reject)=>{

          const opts = {
            url: '/api/courses/' + course_id + '/stats/local'
          }
          api.get(opts.url)
                    .then(function (response) {
                        // console.log('set courses');
                        // console.log(response);
                      commit('SET_LOCAL_STATS', response);
                      resolve(response)
                    })
                    .catch(function (error) {
                      commit('API_FAILURE', error)
                        //  if (cb) cb(error);
                        reject(error)
                    });

          })
    }
  },
  mutations: {
    [SET_LOCAL_STATS](state, stats) {
      state.localStats = stats;
    },
  },
  getters: {
     localStats: state => state.localStats,
  },
  state: {
    localStats: []
  }
}
