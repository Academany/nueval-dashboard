export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const CLEAR_COURSE = "CLEAR_COURSE"
export const LOAD_COURSES = "LOAD_COURSES"
export const SET_COURSES = "SET_COURSES"
export const GET_INSTRUCTOR = "GET_INSTRUCTOR"
export const SET_INSTRUCTOR = "SET_INSTRUCTOR"
export const RELOAD_INSTRUCTOR = "RELOAD_INSTRUCTOR"

import sessions from './sessions.js'
import {
    API_FAILURE
} from '../failure'
import api from '../api'

export default {
    namespaced: true,
    modules: {
        sessions
    },
    actions: {
        bootApp({
            commit,
            dispatch
        }, instructor) {
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
            dispatch
        }) {
            return new Promise((resolve, reject) => {
                commit(RELOAD_INSTRUCTOR)
                api.get('/api/instructors/' + state.instructor.id + '?filter=' + encodeURIComponent(
                    JSON.stringify({
                        include: [{
                                course: {
                                    'presentations': ['booked', 'presented']
                                }
                            },
                            {
                                labs: {
                                    'students': ['booked', 'presented','lab']
                                }
                            }
                        ]
                    }))).then((response) => {
                    commit(SET_INSTRUCTOR, response)
                    resolve(response)
                }).catch((error) => {
                    commit(API_FAILURE, error)
                    reject(error)
                })

            })

        },
        changeApp({
            commit
        }, newApp) {
            commit(CHANGE_APP, newApp)
        }
    },
    state: {
        currentApp: 0,
        courses: [],
        instructor: null
    },
    mutations: {

        [CHANGE_APP](state, newApp) {
            state.currentApp = newApp;
        },
        [SET_INSTRUCTOR](state, data) {
            state.instructor = data
        },
        [RELOAD_INSTRUCTOR](state,data){

        }
    },
    getters: {
        currentCourse: state => {
            return state.instructor.course
        },
        currentApp: state => {
            return state.currentApp
        },
        courses: state => {
            return state.courses
        },
        instructor: state => {
            return state.instructor
        },
        labs: state => {
            return state.instructor && state.instructor.labs || []
        },
        students: state => {
            if (state.instructor && state.instructor.labs) {
                let myStudents = []
                state.instructor.labs.forEach(function (element) {
                    if (!element) return
                    element.students.forEach(function (student) {
                        student.lab = element
                        myStudents.push(student)
                    }, this)
                }, this)
                return myStudents
            }
            return [];
        }
    }
}