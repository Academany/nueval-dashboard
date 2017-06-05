export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const CLEAR_COURSE = "CLEAR_COURSE"
export const LOAD_COURSES = "LOAD_COURSES"
export const SET_COURSES = "SET_COURSES"
export const GET_INSTRUCTOR = "GET_INSTRUCTOR"
export const SET_INSTRUCTOR = "SET_INSTRUCTOR"


import {API_FAILURE} from '../failure'
import api from '../api'

export default {
    namespaced: true,
    actions: {
        loadInstructor({
            commit
        }, instructor_id){
            commit(GET_INSTRUCTOR, instructor_id)
            api.get('/api/instructors/' + instructor_id + "?filter=" + 
                encodeURIComponent(
                    JSON.stringify({
                        include: {
                            'labs':  ['students','instructors']
                        }
                    })
                )
            ).then((response)=>{
                commit(SET_INSTRUCTOR, response.body)
            }).catch((error)=>{
                commit(API_FAILURE, error, {root: true})
            })
        },
        changeCourse({
            commit
        }, newcourse) {
            if (newcourse == '-' || newcourse == 'new') {
                commit(CHANGE_COURSE, null)
            } else {
                commit(CHANGE_COURSE, newcourse)
                //  commit(LOAD_STUDENTS, newcourse.id)
                //  commit(LOAD_LABS, newcourse.id)
            }
        },
        changeApp({
            commit
        }, newApp) {
            commit(CHANGE_APP, newApp)
        },
        clearCourse({
            commit
        }) {
            commit(CLEAR_COURSE)
        },
        loadCourses({
            commit
        },ids) {
            commit(LOAD_COURSES)
                    
            const opts = {
                url: '/api/courses?filter=' + encodeURIComponent(
                    JSON.stringify({
                        where: {id: {inq: [...ids]}}
                    }))
            }
            api.get(opts.url)
                .then(function (response) {
                    // console.log('set courses');
                    // console.log(response);
                    commit(SET_COURSES, response);
                })
                .catch(function (error) {
                    commit(API_FAILURE, error, {root: true})
                    //  if (cb) cb(error);
                });
        },
        setCourses({
            commit
        }, data) {
            commit(SET_COURSES, data)
        }
    },
    state: {
        currentCourse: {},
        currentApp: 0,
        courses: [],
        instructor: null
    },
    mutations: {
        [LOAD_COURSES](state){
            // nop
        },
        [CHANGE_COURSE](state, newcouse) {
            // console.log('Changing course to ' + JSON.stringify(newcouse));
            state.currentCourse = newcouse;
        },
        [CHANGE_APP](state, newApp) {
            state.currentApp = newApp;
        },
        [CLEAR_COURSE](state){
            state.currentCourse = {};
        },
        [SET_COURSES](state,data){
            state.courses = data
        },
        [GET_INSTRUCTOR](state,data){
            
        },
        [SET_INSTRUCTOR](state,data){
            state.instructor = data
        }
    },
    getters: {
        currentCourse: state => {
            return state.currentCourse
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
        students: state => {
            if (state.instructor){
                let students = []
                const labs = state.instructor.labs || []
                labs.forEach(function(el){
                    if (el && el.students)
                        students = [...students, ...el.students]
                })
                return students;
            }
            return [];
        }
    }
}