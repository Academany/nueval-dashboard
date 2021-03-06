import {
    API_FAILURE,
} from '../failure'
import api from '../api'
import config from '../../../config'

export const LOAD_EVALUATIONS = "LOAD_EVALUATIONS"
export const SELECT_EVALUATION = "SELECT_EVALUATION"
export const SET_EVALUATIONS = "SET_EVALUATIONS"
export const LOAD_PROGRESS = "LOAD_PROGRESS"
export const SET_PROGRESS = "SET_PROGRESS"
export const SELECT_STUDENT = "SELECT_STUDENT"
export const CLEAR_STUDENT = "CLEAR_STUDENT"
export const PREPARE_EVALUATION = "PREPARE_EVALUATION"
export const NEEDS_SETUP = "NEEDS_SETUP"
export const UPDATE_PROGRESS = "UPDATE_PROGRESS"
export const BOOK_STUDENT = "BOOK_STUDENT"
export const HAS_FAILURE = "HAS_FAILURE"
export const GRADUATE_STUDENT = "GRADUATE_STUDENT"
export const GRADUATE_STUDENT_CONDITIONAL = "GRADUATE_STUDENT_CONDITIONAL"
export const RECYCLE_STUDENT = "RECYCLE_STUDENT"
export const DROP_STUDENT = "DROP_STUDENT"
export const LOCAL_COMPLETE = "LOCAL_COMPLETE"
export const WAITING_FEEDBACK = "WAITING_FEEDBACK"
export const LEAVE_COMMENT = "LEAVE_COMMENT"


export default {
    namespaced: true,
    actions: {
        loadEvaluations({
            commit,
        }, courseId) {
            return new Promise((resolve, reject) => {
                commit(LOAD_EVALUATIONS)
                const params = {
                    include: [
                        'evaluators',
                        {
                            'students': ['lab', 'presented', 'booked', 'noshow']
                        },
                        {
                            'pairings': [{
                                    'student': ['presented', 'booked', 'noshow']
                                },
                                'instructor'

                            ]

                        },
                        'course'
                    ],
                    where: {
                        courseId,
                    },
                }
                api.get('/api/evaluations?filter=' + encodeURIComponent(JSON.stringify(params)))
                    .then((success) => {
                        commit(SET_EVALUATIONS, success)
                        resolve(success)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        })
                        commit(HAS_FAILURE)
                        reject(error)
                    })
            })
        },
        selectEvaluation({
            commit,
        }, evaluation) {
            commit(SELECT_EVALUATION, evaluation)
        },
        selectStudent({
            commit,
            dispatch,
        }, student) {
            const studentId = student && student.id || null
            if (studentId) {
                commit(SELECT_STUDENT, student)
                dispatch('loadProgress', studentId)
            } else {
                commit(CLEAR_STUDENT)
            }
        },
        prepareLocalEvaluation({
            commit,
            state,
            dispatch,
        }, {
            student_id,
            instructor_id,
        }) {
            return new Promise((resolve, reject) => {
                commit(PREPARE_EVALUATION, student_id)
                const localEval = state.evaluations.find(e => e.kind === 'local')
                if (localEval) {
                    api.post('/api/evaluations/' + localEval.id + '/prepare/' + student_id, {
                        evaluationId: localEval.id,
                        studentId: student_id,
                        instructorId: instructor_id,
                    }).then((response) => {
                        resolve(response)
                        dispatch('loadProgress', student_id)
                    }).catch((error) => {
                        reject(error)
                    })
                } else {
                    reject("No local evaluation found")
                }
            })
        },
        prepareGlobalEvaluation({
            commit,
            state,
            dispatch,
        }, {
            evaluationId,
            instructorId,
            studentId
        }) {
            return new Promise((resolve, reject) => {
                commit(PREPARE_EVALUATION, studentId)
                api.post('/api/evaluations/' + evaluationId + '/prepare/' + studentId, {
                    evaluationId,
                    studentId,
                    instructorId,
                }).then((response) => {
                    resolve(response)
                    dispatch('loadProgress', student_id)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        loadProgress({
            commit,
            dispatch,
        }, studentId) {
            commit(LOAD_PROGRESS, studentId)
            return new Promise((resolve, reject) => {
                const params = {}
                api.get('/api/students/' + studentId + '/progress?cache=' + (Math.random() * 1000000))
                    .then((data) => {
                        //debugger
                        if (data && data.length > 0) {
                            commit(SET_PROGRESS, data)
                            resolve(data)
                        } else {
                            commit(NEEDS_SETUP)
                            resolve()
                        }
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        })
                        commit(HAS_FAILURE)

                        reject(error)
                    })
                    // load evaluation sheets and evaluation records
                    // limit the editing to local sheet for local evaluation
                    // selected sheet for global evaluation
            })
        },
        bookStudent({
            commit,
            state,
            dispatch,
        }, {
            session,
            student,
        }) {
            return new Promise((resolve, reject) => {
                api.put("/api/evaluations/" + session.id + "/students/rel/" + student.id)
                    .then((response) => {
                        commit(BOOK_STUDENT, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        syncProgress({
            commit,
            dispatch,
            state,
        }, {
            module,
            record,
        }) {
            // state.overallProgress
            // go and find the module and record to be updated

            dispatch('loadProgress', state.currentStudent.id)
        },
        graduateStudent({
            commit,
            dispatch,
            state
        }) {
            return new Promise((resolve, reject) => {
                // graduate current student
                const student = state.currentStudent
                const session = state.currentEvaluation
                if (!student || !session)
                    return reject("Missing parameters")
                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        graduated: true,
                        conditional: false,
                        dropped: false,
                        next_cycle: false,
                        waiting_feedback: false
                    })
                    .then((response) => {
                        commit(GRADUATE_STUDENT, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        graduateStudentConditional({
            commit,
            dispatch,
            state
        }) {
            return new Promise((resolve, reject) => {
                // graduate current student
                const student = state.currentStudent
                const session = state.currentEvaluation
                if (!student || !session)
                    return reject("Missing parameters")
                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        graduated: true,
                        conditional: true,
                        dropped: false,
                        next_cycle: false,
                        waiting_feedback: false
                    })
                    .then((response) => {
                        commit(GRADUATE_STUDENT_CONDITIONAL, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        leaveComment({
            commit,
            state,
            dispatch
        }, message) {
            console.log('Leave comment!')
            console.log(message)
            const uuidv4 = () => {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                )
            }

            return new Promise((resolve, reject) => {
                api.post('/api/students/' + state.currentStudent.id + '/comments', {
                        id: uuidv4(),
                        from: message.from,
                        subject: message.subject,
                        body: message.body,
                        to: message.from,
                        timestamp: message.timestamp,
                        userId: message.userId,
                        about: 'student',
                        ref: state.currentStudent.id,
                    })
                    .then((success) => {
                        console.log('Got this reply')
                        console.log(success)
                        commit(LEAVE_COMMENT, success.body)
                        resolve(success.body)
                            // const feedbackItem = success.body
                            // if (feedbackItem.id) {
                            //     api.put('/api/records/' + state.record.id + '/messages/rel/' + feedbackItem.id, {
                            //         evaluationRecordId: state.record.id,
                            //         messageId: feedbackItem.id,
                            //     }).then((success) => {
                            //         commit(LEAVE_FEEDBACK, feedbackItem)
                            //         dispatch('loadRecord').then(resolve).catch(reject)
                            //     }).catch((error) => {
                            //         commit(API_FAILURE, error, { root: true })
                            //         reject(error)
                            //     })
                            // }
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true
                        })
                        reject(error)
                    })
            })
        },
        requestFeedback({
            commit,
            dispatch,
            state
        }) {
            return new Promise((resolve, reject) => {
                // graduate current student
                const student = ç
                const session = state.currentEvaluation
                if (!student || !session)
                    return reject("Missing parameters")
                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        graduated: false,
                        dropped: false,
                        next_cycle: false,
                        waiting_feedback: true
                    })
                    .then((response) => {
                        commit(WAITING_FEEDBACK, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        localComplete({
            commit,
            dispatch,
            state
        }) {
            // send student to next cycle
            return new Promise((resolve, reject) => {
                // graduate current student
                const student = state.currentStudent
                const session = state.currentEvaluation
                if (!student || !session)
                    return reject("Missing parameters")
                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        local_complete: true
                    })
                    .then((response) => {
                        commit(LOCAL_COMPLETE, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        nextCycle({
            commit,
            dispatch,
            state
        }, sessionParam) {
            // send student to next cycle
            return new Promise((resolve, reject) => {
                // graduate current student
                //debugger
                const student = state.currentStudent
                const session = state.currentEvaluation || sessionParam || null
                if (!student || !session) {
                    //debugger
                    return reject("Missing parameters")

                }
                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        next_cycle: true,
                        graduated: false,
                        dropped: false,
                        waiting_feedback: false
                    })
                    .then((response) => {
                        commit(RECYCLE_STUDENT, {
                            session,
                            student,
                        })
                        dispatch('loadProgress', student.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
        cancelStudent({
            commit,
            dispatch,
            state
        }, sessionParam) {
            // mark student as dropped out
            // send student to next cycle
            return new Promise((resolve, reject) => {
                // graduate current student
                // debugger
                const student = state.currentStudent
                const session = state.currentEvaluation || sessionParam || null
                if (!student || !session) {
                    // debugger
                    return reject("Missing parameters")
                }




                api.put("/api/evaluations/" + session.id + "/students/" + student.id, {
                        next_cycle: false,
                        graduated: false,
                        dropped: true,
                        waiting_feedback: false
                    })
                    .then((response) => {
                        commit(DROP_STUDENT, {
                            session,
                            student,
                        })

                        api.post('/api/notification-center', {
                            test: "sample"
                        }).then((success) => {
                            dispatch('loadProgress', student.id)
                            resolve(response)
                        }).catch((error) => {
                            console.log('Failed to post notification')
                        })


                    })
                    .catch((error) => {
                        commit(API_FAILURE, error, {
                            root: true,
                        });
                        commit(HAS_FAILURE)

                        reject(error)
                    })
            })
        },
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
        [SELECT_STUDENT](state, student) {
            state.currentStudent = student
            state.canGoGlobal = false
        },
        [CLEAR_STUDENT](state) {
            state.currentStudent = null
        },
        [LOAD_PROGRESS](state, studentId) {
            state.loading = true
        },
        [SET_PROGRESS](state, progress) {
            state.needsSetup = progress.find(p => p.records && p.records.length > 0) == null
            state.loading = false
            state.overallProgress = progress
        },
        [UPDATE_PROGRESS](state, progress) {
            state.needsSetup = progress.find(p => p.records && p.records.length > 0) == null
            state.loading = false
            state.overallProgress = progress
        },
        [PREPARE_EVALUATION](state, studentId) {
            state.loading = false
        },
        [NEEDS_SETUP](state, studentId) {
            state.needsSetup = true
            state.loading = false
        },
        [BOOK_STUDENT](state, {
            session,
            student,
        }) {
            // TODO Mark student complete!!!

        },
        [GRADUATE_STUDENT](state, {
            session,
            student
        }) {
            if (state.currentStudent) {
                const current = state.currentStudent
                state.currentStudent = {...current,
                    graduated: true,
                    conditional: false
                }
            }
        },
        [GRADUATE_STUDENT_CONDITIONAL](state, {
            session,
            student
        }) {
            if (state.currentStudent) {
                const current = state.currentStudent
                state.currentStudent = {...current,
                    graduated: true,
                    conditional: true
                }
            }
        },
        [WAITING_FEEDBACK](state, {
            session,
            student
        }) {
            if (state.currentStudent)
                state.currentStudent.waiting_feedback = true
        },
        [RECYCLE_STUDENT](state, {
            session,
            student
        }) {
            if (state.currentStudent)
                state.currentStudent.next_cycle = true
        },
        [DROP_STUDENT](state, {
            session,
            student
        }) {
            if (state.currentStudent)
                state.currentStudent.dropped = true
        },
        [LOCAL_COMPLETE](state, {
            session,
            student
        }) {
            if (state.currentStudent)
                state.currentStudent.local_complete = true
        },
        [HAS_FAILURE](state) {
            state.loading = false
            state.failure = true
        },
        [LEAVE_COMMENT](state, comment) {
            debugger
            if (state.currentStudent) {
                const student = state.currentStudent
                student._comments.push(comment)
                state.currentStudent = student
            }
        }
    },
    getters: {
        evaluations: state => state.evaluations,
        currentEvaluation: state => state.currentEvaluation,
        currentStudent: state => state.currentStudent,
        currentStudentSheets: state => [],
        needsSetup: state => state.needsSetup,
        overallProgress: state => state.overallProgress,
        loading: state => state.loading,
        localSession: state => {
            let localEvaluation = undefined
            if (state.overallProgress) {
                localEvaluation = state.overallProgress.find((ev) => {
                    if (ev.evaluation.kind === 'local')
                        return true
                    return false
                })
            }
            if (localEvaluation) {
                return localEvaluation.evaluation
            }
            return null
        },
        canGoGlobal: (state) => {
            let canGoGlobal = false
            const sessions = state && state.overallProgress || []
            sessions.forEach((ev) => {
                const recs = ev && ev.records || []
                const completed = recs.filter(er => er.completed)
                let allCompleted = (completed.length == recs.length)
                    // check if we do incremental evaluation
                    // in this case the student can be sent to global if he completed at least one unit
                if (config.use_incremental) {
                    allCompleted = (completed.length >= 1)
                }
                debugger
                if (completed.length > 0 && allCompleted && ev.evaluation.kind === 'local') {
                    canGoGlobal = true
                }
            })
            return canGoGlobal
        },
        isInGlobal: (state) => {
            let isIn = false
            const sessions = state && state.overallProgress || []
            sessions.some((ev) => {
                if (ev.evaluation.kind === 'global') {
                    isIn = true;
                    return true
                }
            })
            return isIn
        },
        isGraduated: (state) => {
            if (state.currentStudent && state.currentStudent.graduated === true) {
                return true
            }
            return false
        },
        isRecycled: (state) => {
            if (state.currentStudent && state.currentStudent.next_cycle === true) {
                return true
            }
            return false
        },
        isDropped: (state) => {
            if (state.currentStudent && state.currentStudent.dropped === true) {
                return true
            }
            return false
        },
        waitingFeedback: (state) => {
            if (state.currentStudent && state.currentStudent.waiting_feedback === true) {
                return true
            }
            return false
        },
        canGraduate: (state) => {
            if (state.currentStudent && (
                    state.currentStudent.graduated === true ||
                    state.currentStudent.next_cycle === true ||
                    state.currentStudent.dropped === true
                )) {
                return false
            }
            let isIn = false
            const sessions = state && state.overallProgress || []
            sessions.some((ev) => {
                if (ev.evaluation.kind === 'global' && ev.completed == true) {
                    isIn = true;
                    return true
                }
            })
            return isIn
        },
        studentsQueue(state) {
            return (instructor) => {
                const evaluations = state.evaluations || []
                let queue = {}
                evaluations.forEach((session) => {
                    const pairings = session.pairings || []
                    queue[session.name] = []
                        // const evaluators = evaluation.evaluators || []
                    const students = session.students || []
                    pairings.forEach((p) => {
                        if (p.instructorId === instructor.id) {
                            const student = students.find(s => (s.id === p.studentId))
                            if (student) {
                                if (!student.booked) {
                                    student.booked = p.student.booked || []
                                    student.presented = p.student.presented || []
                                    student.noshow = p.student.noshow || []
                                }
                                queue[session.name].push(student)
                            }
                        }
                    })
                })
                return queue
            }
        },
    },
    state: {
        overallProgress: [],
        evaluations: [],
        currentStudent: null,
        currentEvaluation: null,
        currentStudentSheets: [],
        loading: false,
        local: true,
        needsSetup: false,
        // canGraduate: false,
        failure: true
    },
}