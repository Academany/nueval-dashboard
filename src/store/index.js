import Vuex from 'vuex'
import failure from './modules/failure'
import courses from './modules/courses'
import labs from './modules/labs'
import login from './modules/login'
import manager from './modules/manager'
import presentations from './modules/presentations'
import evaluations from './modules/evaluations'
import profile from './modules/profile'
import roles from './modules/roles'
// import students from './modules/students'
import supernodes from './modules/supernodes'
import users from './modules/users'
import notifications from './modules/notifications'
import admin from './modules/admin'
import modules from './modules/modules'
import apps from './modules/apps'
import instructor_app from './modules/instructor_app'

export default new Vuex.Store({
  strict: true,
  modules:
  {
    failure,
    courses,
    labs,
    login,
    manager,
    presentations,
    evaluations,
    profile,
    roles,
    // students,
    apps,
    supernodes,
    modules,
    users,
    notifications,
    admin,
    instructor_app
  }
})
