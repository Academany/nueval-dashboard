export const LOAD_SESSIONS = "LOAD_SESSIONS"
export const SET_SESSIONS = "SET_SESSIONS"
export const SELECT_SESSION = "SELECT_SESSION"
export const CLEAR_SESSION = "CLEAR_SESSION"
export const LOAD_BOOKINGS = "LOAD_BOOKINGS"
export const SET_BOOKINGS = "SET_BOOKINGS"

export const LOAD_LABS = "LOAD_LABS"
export const SET_LABS = "SET_LABS"
export const SELECT_LAB = "SELECT_LAB"
export const CLEAR_LAB = "CLEAR_LAB"
export const LOAD_STUDENTS = "LOAD_STUDENTS"
export const SET_STUDENTS = "SET_STUDENTS"
export const SELECT_STUDENTS = "SELECT_STUDENTS"
export const BOOK_STUDENTS = "BOOK_STUDENTS"

export default {
    namespaced: true,
    state: {
        // collections
        sessions: [], //sessions that can be booked
        bookings: [] // existing list of bookings for the session
        labs: [], // list of labs associated to the current user
        students: [], //list of students for this lab
        // loading 
        loadingLabs: false,
        loadingSessions: false,
        loadingBookings: false,
        // selected items
        selectedSession: null, //currently selected section or null
        selectedLab: null, //currently selected lab
        selectedStudents: [], // list of selected students
        // booking
        isBooking: false, // true if we are in the booking process
        bookingError: null, // some error occurred duriing booking
    },
    getters: {
        sessions(state){
            return state.sessions
        },
        bookings(state){
            return state.bookings
        },
        labs(state){
            return state.labs
        },
        students(state){
            return state.students
        },
        isLoadingLabs(state){
            return state.loadingLabs
        },
        isLoadingBookings(state){
            return state.loadingBookings
        },
        isLoadingSessions(state){
            return state.loadingSessions
        },
        

    },
    actions: {
        loadSessions({commit}){
            commit('LOAD_SESSIONS')
        },
        setSessions({commit},data){
            commit('SET_SESSIONS', data)
        },
        selectSession({commit}, data){
            commit('SELECT_SESSION', data)
        },
        clearSession({commit}){
            commit('CLEAR_SESSION', data)
        },
        loadLabs({commit}){
            commit('LOAD_LABS')
        },
        setLabs({commit},data){
            commit('SET_LABS', data)
        },
        selectLab({commit}, data){
            commit('SELECT_LAB', data)
        },
        clearLab({commit}){
            commit('CLEAR_LAB', data)
        },
        loadStudents({commit}){
            commit('LOAD_LABS')
        },
        setStudents({commit},data){
            commit('SET_LABS', data)
        },
        selectLab({commit}, data){
            commit('SELECT_LAB', data)
        },
        clearLab({commit}){
            commit('CLEAR_LAB', data)
        },
        loadStudents({commit},data){
            commit('LOAD_STUDENTS', data)
        },
        setStudents({commit},data){
            commit('SET_STUDENTS',data)
        },
        selectStudents({commit},data){
            commit('SELECT_STUDENTS',data)
        },

    }
    mutations: {
        [LOAD_SESSIONS](state,course_id) {
            state.loadingSessions = true
        },
        [SET_SESSIONS](state,newSessions) {
            state.loadingSessions = false
            state.sessions = newSessions
        },
        [SELECT_SESSION](state,selected){
            state.selectedSession = selected
        },
        [CLEAR_SESSION](state){
            state.selectedSession = null
        },
        [LOAD_BOOKINGS](state){
            state.loadingBookings = true
        },
        [SET_BOOKINGS](state,data){
            state.bookings = data
            state.loadingBookings = false
        },
        [LOAD_LABS](state){
            state.loadingLabs = true
        },
        [SET_LABS](state,data){
            state.labs = data
            state.loadingLabs = false
        },
        [SELECT_LAB](state,selected){
            state.selectedLab = selected
        },
        [CLEAR_LAB](state){
            state.selectedLab = null
        },
        [LOAD_STUDENTS](state){
            state.loadingStudents = true
        },
        [SET_STUDENTS](state,data){
            state.loadingStudents = false
            state.students = data
        },
        [SELECT_STUDENTS](state,data){
            state.selectedStudents = data
        },
        [BOOK_STUDENTS](state){
            state.isBooking = true
        },
        [BOOKING_COMPLETE](state){
            state.isBooking = false
            state.selectedStudents = null
        },
        [BOOKING_ERROR](state,error){
            state.isBooking = false
            state.bookingError = error
        }

    }
}