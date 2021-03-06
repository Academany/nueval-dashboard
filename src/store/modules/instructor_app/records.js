export const MARK_COMPLETE = "MARK_COMPLETE"
export const MARK_NOT_COMPLETE = "MARK_NOT_COMPLETE"

export const LEAVE_FEEDBACK = "LEAVE_FEEDBACK"
export const CREATE_FEEDBACK = "CREATE_FEEDBACK"
export const UPDATE_PROGRESS = "UPDATE_PROGRESS"
export const UPDATE_CHECKLIST = "UPDATE_CHECKLIST"
export const UPDATE_TOTAL = "UPDATE_TOTAL"
export const SELECT_MODULE = "SELECT_MODULE"
export const RECORD_PERSISTED = "RECORD_PERSISTED"
export const LOAD_RECORD = "LOAD_RECORD"
export const SET_RECORD = "SET_RECORD"

import {
    API_FAILURE,
} from '../failure'
import api from '../api'

export default {
    namespaced: true,
    actions: {
        selectModule({ commit, state, dispatch }, { module, record }) {
            commit(SELECT_MODULE, { module, record })
        },
        markComplete({ commit, state, dispatch }) {
            // console.log('Mark complete!')
            return new Promise((resolve, reject) => {
                commit(MARK_COMPLETE)
                dispatch("persistRecord").then((success) => {
                    commit(RECORD_PERSISTED, success)
                    dispatch('loadRecord').then(resolve).catch(reject)
                }).catch((error) => {
                    commit(API_FAILURE, error, { root: true })
                    reject()
                })
            })
        },
        markNotComplete({ commit, state, getters, dispatch }) {
            return new Promise((resolve, reject) => {
                commit(MARK_NOT_COMPLETE, { progress: getters.recordProgress })
                dispatch("persistRecord").then((success) => {
                    commit(RECORD_PERSISTED, success)
                    dispatch('loadRecord').then(resolve).catch(reject)
                }).catch((error) => {
                    commit(API_FAILURE, error, { root: true })
                })

            })
        },
        persistRecord({ commit, state, dispatch }) {
            const record = state.record
            return new Promise((resolve, reject) => {
                api.patch('/api/records/' + state.record.id, {
                    checklist: record.checklist || [],
                    lines: record.lines || [],
                    progress: record.progress || 0,
                    completed: record.completed || false,
                }).then(resolve).
                catch((error) => {
                    console.log("Error persting record")
                    reject(error)
                })
            })
        },
        leaveFeedback({ commit, state, dispatch }, message) {
            // console.log('Leave feedback!')
            // console.log(message)
            return new Promise((resolve, reject) => {
                api.post('/api/messages', {
                        from: message.from,
                        subject: message.subject,
                        body: message.body,
                        to: message.to,
                        timestamp: message.timestamp,
                        userId: message.userId,
                        about: 'local_eval',
                        ref: state.record.id,
                    })
                    .then((success) => {
                        commit(CREATE_FEEDBACK, success.body)
                        const feedbackItem = success.body
                        if (feedbackItem.id) {
                            api.put('/api/records/' + state.record.id + '/messages/rel/' + feedbackItem.id, {
                                evaluationRecordId: state.record.id,
                                messageId: feedbackItem.id,
                            }).then((success) => {
                                commit(LEAVE_FEEDBACK, feedbackItem)
                                dispatch('loadRecord').then(resolve).catch(reject)
                            }).catch((error) => {
                                commit(API_FAILURE, error, { root: true })
                                reject(error)
                            })
                        }
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, { root: true })
                        reject(error)
                    })
            })
        },
        updateProgress({ commit, state, dispatch }, { totalProgress, outcomes }) {
            // console.log('Leave progress!')
            // console.log(totalProgress)
            return new Promise((resolve, reject) => {

                commit(UPDATE_PROGRESS, outcomes)
                commit(UPDATE_TOTAL, totalProgress)
                dispatch("persistRecord").then((success) => {
                    // dispatch('loadRecord')
                    commit(RECORD_PERSISTED, success)
                    dispatch('loadRecord').then(resolve).catch(reject)
                }).catch((error) => {
                    commit(API_FAILURE, error, { root: true })
                    reject(error)
                })
            })
        },
        updateChecklist({ commit, state, dispatch }, checklist) {
            // console.log('Leave checkList!')
            // console.log(checklist)
            return new Promise((resolve, reject) => {

                commit(UPDATE_CHECKLIST, checklist)
                dispatch("persistRecord").then((success) => {
                    // dispatch('loadRecord')
                    commit(RECORD_PERSISTED, success)
                    dispatch('loadRecord').then(resolve).catch(reject)
                }).catch((error) => {
                    commit(API_FAILURE, error, { root: true })
                    reject(error)
                })
            })
        },
        loadRecord({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                if (state && state.record && state.record.id) {
                    const recordId = state.record.id
                    commit(LOAD_RECORD)
                    api.get('/api/records/' + recordId + '/?filter=' + encodeURIComponent(JSON.stringify({
                            include: ['messages', 'logs'],
                        })))
                        .then((success) => {
                            commit(SET_RECORD, success)
                            resolve(success)
                        })
                        .catch((error) => {
                            commit(API_FAILURE, error, { root: true })
                            reject(error)
                        })
                } else {
                    reject("No record found")
                }
            })
        },
    },
    getters: {
        module: state => state.module,
        record: state => state.record,
        logs: state => state.record && state.record.logs || [],
        messages: function(state) {
            if (state.record && state.record.messages) {
                return state.record.messages
            }
            return []
        },
        recordProgress: (state) => {
            if (!state.record) return 0
            const lines = state.record.lines || []
            const progress = lines.reduce(function(acc, val) {
                acc += val.progress
                return acc
            }, 0)
            const computed = Math.round(progress / lines.length)
            return computed
        },
    },
    mutations: {
        [SELECT_MODULE](state, { module, record }) {
            state.module = module
            state.record = record
        },
        [MARK_COMPLETE](state) {
            state.record = {...state.record, completed: true, progress: 100 }
        },
        [MARK_NOT_COMPLETE](state, { progress }) {
            state.record = {
                ...state.record,
                completed: false,
                progress: progress,
            }
        },
        [UPDATE_TOTAL](state, total) {
            let rec = {...state.record } || {}
            rec.progress = total
            state.record = rec
        },
        [UPDATE_PROGRESS](state, progress) {
            const rec = {...state.record } || {}
            const cl = progress || []
            rec.lines = progress
            state.record = rec
        },
        [UPDATE_CHECKLIST](state, checklist) {
            const rec = {...state.record } || {}
            const cl = checklist || []
            rec.checklist = checklist
            state.record = rec
        },
        [LEAVE_FEEDBACK](state, feedback) {
            const rec = {...state.record } || {}
            const msgs = rec.messages || []
            msgs.push(feedback)
            rec.messages = msgs
            state.record = rec
        },
        [RECORD_PERSISTED](state, response) {
            // console.log('Record persisted')
            if (response.body) {
                state.record = response.body
            }
        },
        [CREATE_FEEDBACK](state, feedback) {
            // console.log('Feedback created')
            // console.log(feedback)
        },
        [LOAD_RECORD](state) {},
        [SET_RECORD](state, record) {
            // console.log("Setting record to ")
            // console.log(record)
            state.record = record
        },
    },
    state: {
        module: null,
        record: null,
    },
}