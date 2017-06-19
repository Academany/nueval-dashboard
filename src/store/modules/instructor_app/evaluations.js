import {
    API_FAILURE
} from '../failure'
import api from '../api'

export const LOAD_EVALUATIONS = "LOAD_EVALUATIONS"
export const SELECT_EVALUATION = "SELECT_EVALUATION"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const SET_PROGRESS = "SET_PROGRESS"
export const SELECT_STUDENT = "SELECT_STUDENT"

export default {
    namespaced: true,
    actions: {
        loadEvaluations({
            commit
        }, courseId) {
            return new Promise((resolve, reject) => {
                const params = {
                    include: [
                        'evaluators',
                        'students',
                        {
                        'pairings': ['student', 'instructor']
                        },
                        'course',
                    ],
                    where: {
                        courseId
                    }
                }
                api.get('/evaluations?filter=' + encodeURIComponent(JSON.stringify(params)))
                .then((success)=>{

                })
                .catch((error)=>{

                })
            })
        },
        selectEvaluation({commit}, evaluation) (
            commit(SELECT_EVALUATION, evaluation)
        ),
        selectStudent({commit,dispatch}, student){
            commit(SELECT_STUDENT, student)
            dispatch(loadProgress, student.id)
        },
        loadProgress({commit}, studentId){
            commit(LOAD_PROGRESS, studentId)
            return new Promise((resolve,reject)=>{
                // load evaluation sheets and evaluation records
                // limit the editing to local sheet for local evaluation
                // selected sheet for global evaluation
            })
        }
    },
    mutations: {
        [LOAD_EVALUATIONS](state, local) {
            state.loading = false;
            state.local = !!local;
        },
        [SET_EVALUATIONS](state, evaluations) {
            state.loading = false;
            state.evaluations = evaluations
        },
        [SELECT_EVALUATION](state, evaluation) {
            state.currentEvaluation = evaluation
        },
        [SELECT_STUDENT](state, student){
            state.currentStudent = student
        }
        [LOAD_PROGRESS](state, studentId) {
            this.loading = true            
        },
        [SET_PROGRESS](state, progress) {
            this.overallProgress = progress
        }
    },
    getters: {
        evaluations: state => state.evaluations,
        currentEvaluation: state => state.currentEvaluation,
        currentStudent: state => state.currentStudent
    },
    state: {
        overallProgress: {},
        evaluations: [],
        currentStudent: null,
        currentEvaluation: null,
        loading: false,
        local: true
    },

}