import students from './students'
import instructors from './instructors'
import Vuex from 'vuex'

export default {
    namespaced: true,
    strict: true,
    modules: {
        students,
        instructors
    }
}