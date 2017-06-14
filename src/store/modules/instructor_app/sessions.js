import {API_FAILURE} from '../failure'
import api from '../api'

export const LOAD_SESSION = "LOAD_SESSION"
export const SET_SESSION = "SET_SESSION"
export const BOOK_STUDENT = "BOOK_STUDENT"
export const UNBOOK_STUDENT = "UNBOOK_STUDENT"
export const STUDENT_PRESENTED = "STUDENT_PRESENTED"
export const BOOKED_STUDENT = "BOOKED_STUDENT"
export const SESSION_FULL = "SESSION_FULL"
export const ALREADY_BOOKED = "ALREADY_BOOKED"


export default {
    namespaced: true,
    state: {
        session: null,
        loading: false,
        booking: false
    },
    actions: {
        loadSession({commit},session){
            return new Promise((resolve,reject)=>{
                // debugger
                if (!session || !session.id) return reject("Invalid session")
                commit(LOAD_SESSION, session.id)
                api.get('/api/presentations/' + session.id + '?filter=' +
                    encodeURIComponent(
                        JSON.stringify({
                            include: ['booked', 'presented','noshow']
                        })
                    )
                ).
                then((response) => {
                    commit(SET_SESSION, session)
                    resolve(response.body)
                })
                .catch((error) => {
                    commit(API_FAILURE, error, {root: true})
                    reject(error)
                })
            })
        },
        bookStudent({commit,dispatch, state},{ session, studentId}){
           return new Promise((resolve,reject)=>{
            commit(BOOK_STUDENT, studentId)
            
            api.get('/api/students/' + studentId + "/booked/count").then((response)=>{
                const count = response.body && response.body.count || 0;
                if (count > 0) {
                    reject({error: 'Already booked'})
                    commit(ALREADY_BOOKED)
                } else {
                    api.get('/api/presentations/' + session.id + '/booked/count').then((response)=>{
                        const count = response.body && response.body.count || 0;
                        if (count + 1 > session.max){
                            commit(SESSION_FULL)
                            reject({error: 'Session full'})
                        } else {
                            api.put('/api/presentations/' + session.id + '/booked/rel/' + studentId,
                            {
                                studentId: studentId,
                                presentationId: session.id
                            }).then((success)=>{
                                commit(BOOKED_STUDENT, success)
                                dispatch('loadSession', session)
                                resolve(success)
                            }).catch((error)=>{
                                commit(API_FAILURE, error, {root: true})
                                reject(error)
                            })
                        }
                    })
                }
            })
            // make sure student is not already booked

            // make sure session is not full already

        })

        },
        unbookStudent({commit}, studentId){
           commit(UNBOOK_STUDENT, studentId)
        },
        studentPresented({commit}, studentId){
            commit(STUDENT_PRESENTED, studentId)
        }
    },
    getters: {
        session: (state)=>state.session,
        booked: (state)=>{
            if (!state.session) return [];
            return state.session.booked
        },
        presented: (state)=>{
            if(!state.session) return [];
            return state.session.presented
        }
    },
    mutations: {
        [LOAD_SESSION](state){
            state.loading = true
        },
        [SET_SESSION](state,session){
            state.loading = false
            state.session = session
        },
        [BOOK_STUDENT](state,student){
            state.booking = true
        },
        [BOOKED_STUDENT](state, student){
            state.booking = false
        },
        [SESSION_FULL](state){
            state.session.full = true;
        },
        [ALREADY_BOOKED](state){
            
        }
    }


}