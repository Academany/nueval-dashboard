export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const CLEAR_COURSE = "CLEAR_COURSE"
export const LOAD_COURSES = "LOAD_COURSES"
export const SET_COURSES = "SET_COURSES"
export const GET_INSTRUCTOR = "GET_INSTRUCTOR"
export const SET_INSTRUCTOR = "SET_INSTRUCTOR"
export const RELOAD_INSTRUCTOR = "RELOAD_INSTRUCTOR"

import sessions from './sessions.js'
import evaluations from './evaluations.js'
import records from './records.js'

import {
    API_FAILURE,
} from '../failure'
import api from '../api'

export default {
    namespaced: true,
    modules: {
        sessions,
        evaluations,
        records,
    },
    actions: {
        bootApp({
            commit,
            dispatch,
        }, instructor) {
            // debugger
            return new Promise((resolve, reject) => {
                // booting the app means loading all the stuff needed to show it correctly
                // we already loaded installed apps
                // instead of the course selector we'll have the instructor selector
                // load all instructors associated to the user (once)


                // then:
                //  pick the instructor with the most recent active program
                //  then:
                //      load the instructor courses
                //      load the instructor labs
                //      load the instructor students
                console.log(instructor)
                commit(SET_INSTRUCTOR, instructor)
                resolve()
            })
        },
        reloadInstructor({
            commit,
            state,
            dispatch,
        }) {
            return new Promise((resolve, reject) => {
                const instructor_id = state.instructor.id
                commit(RELOAD_INSTRUCTOR)
                api.get('/api/instructors/' + instructor_id + '?filter=' + encodeURIComponent(
                    JSON.stringify({
                        include: [{
                                course: {
                                    'presentations': ['booked', 'presented'],
                                    'modules': true,
                                },
                            },
                            {
                                labs: {
                                    'students': ['booked', 'presented', 'lab'],
                                },
                            }
                        ],
                    }))).then((response) => {
                    debugger
                    commit(SET_INSTRUCTOR, response)
                    resolve(response)
                }).catch((error) => {
                    commit(API_FAILURE, error)
                    reject(error)
                })
            })
        },
        changeApp({
            commit,
        }, newApp) {
            commit(CHANGE_APP, newApp)
        },
    },
    state: {
        currentApp: 0,
        courses: [],
        instructor: null,
    },
    mutations: {
        [CHANGE_APP](state, newApp) {
            state.currentApp = newApp;
        },
        [SET_INSTRUCTOR](state, data) {
            state.instructor = data
        },
        [RELOAD_INSTRUCTOR](state, data) {
            state.instructor = null
        },
    },
    getters: {
        currentCourse: state => state.instructor && state.instructor.course || null,
        currentApp: state => state.currentApp,
        courses: state => state.courses,
        instructor: state => state.instructor,
        labs: state => state.instructor && state.instructor.labs || [],
        labStudents: state => (lab) => {
            if (!lab) return []
            if (state.instructor && state.instructor.labs) {
                let students = []
                state.instructor.labs.some(function(alab) {
                    if (alab.id === lab.id) {
                        students = lab.students.map((s) => {
                            s.lab = alab
                            return s
                        })
                        return true
                    }
                })
                return students
            }
            return []
        },
        students: (state) => {
            if (state.instructor && state.instructor.labs) {
                let myStudents = []
                state.instructor.labs.forEach(function(element) {
                    if (!element) return
                    element.students.forEach(function(student) {
                        student.lab = element
                        myStudents.push(student)
                    }, this)
                }, this)
                return myStudents
            }
            return [];
        },
    },
}