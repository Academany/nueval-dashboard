export const CHANGE_COURSE = "CHANGE_COURSE"
export const CHANGE_APP = "CHANGE_APP"
export const CLEAR_COURSE = "CLEAR_COURSE"
import { API_FAILURE } from './failure'
import api from './api'

export default {
    actions: {
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
        }
    },
    state: {
        currentCourse: {},
        currentApp: 0,
    },
    mutations: {
        [CHANGE_COURSE](state, newcouse) {
            console.log('Changing course to ' + JSON.stringify(newcouse));
            state.currentCourse = newcouse;
        },
        [CHANGE_APP](state, newApp) {
            state.currentApp = newApp;
        },
        [CLEAR_COURSE](state) {
            state.currentCourse = {};
        }
    },
    getters: {
        currentCourse: state => {
            return state.currentCourse
        },
        currentApp: state => {
            return state.currentApp
        },
    }
}