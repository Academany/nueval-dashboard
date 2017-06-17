import students from './students'
import instructors from './instructors'
import course from './course'
import logs from './logs'
import Vuex from 'vuex'

export default {
  namespaced: true,
  strict: true,
  modules: {
    students,
    instructors,
    course,
    logs,
  },
}
