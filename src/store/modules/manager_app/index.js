import {
    API_FAILURE,
} from '../failure'

const SET_STUDENT_PROGRESS="SET_STUDENT_PROGRESS"
const SET_LAB_STATS="SET_LAB_STATS"
import api from '../api'
export default {
  namespaced: true,
  actions: {
    loadStudentProgress({commit}, studentId){
      return new Promise((resolve, reject) => {
          const params = {}
          api.get('/api/students/' + studentId + '/progress?cache=' + (Math.random() * 1000000))
              .then((data) => {
                  //debugger
                  if (data && data.length > 0) {
                      commit(SET_STUDENT_PROGRESS, { studentId: studentId, progress: data})
                      resolve(data)
                  } else {
                      resolve(null)
                  }
              })
              .catch((error) => {
                  commit('API_FAILURE', error)
                  reject(error)
              })
      })
    },
    loadStats({commit}, labId){
      return new Promise((resolve,reject)=>{
        api.get('/api/labs/' + labId + '/stats')
        .then((data) => {
            console.log('got ' + data)
            if (data && data.stats) {
              commit(SET_LAB_STATS, { labId: data.stats})
              resolve( {stats: data.stats} )
            } else {
              resolve(null)
            }
        }).catch((error) => {
            console.log(error)
            commit('API_FAILURE', error)
            reject(error)
        })
      })
    }
  },
  mutations: {
    [SET_STUDENT_PROGRESS](state, {studentId,progress}) {
      state.students = { studentId: progress, ...state.students}
    },
    [SET_LAB_STATS](state, labStats) {
      state.stats = { ...labStats, ...state.stats}
    }
  },
  state: {
    students: {},
    stats: {}
  }
}
