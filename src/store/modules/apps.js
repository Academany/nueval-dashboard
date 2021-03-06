export const LOAD_INSTALLED_APPS = "LOAD_INSTALLED_APPS"
export const SET_INSTALLED_APPS = "SET_INSTALLED_APPS"
export const SET_INSTALLED_ROLES = "SET_INSTALLED_ROLES"

import {
    API_FAILURE,
} from './failure'

import api from './api'
export default {
  namespaced: true,
  state: {
    installedApps: [],
    userRoles: [],
    loading: false,
  },
  getters: {
    installedApps: state => state.installedApps,
    instructorCourses: (state) => {
      const instructRoles = state.userRoles.filter(userRole => userRole.role === 'instructor');
      const res = instructRoles.map(userRole => userRole.instructor.courseId)
      return res
    },
    studentCourses: (state) => {
      const studentRoles = state.userRoles.filter(userRole => userRole.role === 'student');
      return studentRoles.map(userRole => userRole.student.courseId)
    },
    userRoles: state => state.userRoles,
    isLoading: state => state.loading,
  },
  actions: {
    loadInstalledApps({
            commit, state,
        }) {
      commit(LOAD_INSTALLED_APPS)
      const opts = {
        url: '/api/me/apps',
      }
      return new Promise((resolve, reject) => {
        api.get(opts.url)
                .then(function (response) {
                  commit(SET_INSTALLED_APPS, response.apps);
                  commit(SET_INSTALLED_ROLES, response.roles)
                  resolve(response)
                })
                .catch(function (error) {
                  console.log("Failed to list apps")
                  console.log(error)
                  commit(API_FAILURE, error, {
                    root: true,
                  })
                  reject(error);
                    //  if (cb) cb(error);
                });
      });
    },
    setInstalledApps({
            commit,
        }, data) {
      commit(SET_INSTALLED_APPS, data.apps);
      commit(SET_INSTALLED_ROLES, data.roles)
    },
    getInstructor({ commit, state }, courseId) {
      var roles = state.roles
      const instructRoles = roles.filter(userRole => userRole.role === 'instructor');
      const res = instructRoles.filter(userRole => (userRole.instructor.courseId === courseId))
      if (res && res.length > 0) return res[0];
      return null;
    },
    getStudent({ commit, state }, courseId) {
      var roles = state.roles
      const studentRoles = roles.filter(userRole => userRole.role === 'student');
      const res = studentRoles.filter(userRole => (userRole.student.courseId === courseId))
      if (res && res.length > 0) return res[0];
      return null;
    },
  },
  mutations: {
    [LOAD_INSTALLED_APPS](state) {
      state.loading = true
    },
    [SET_INSTALLED_APPS](state, installedApps) {
      state.loading = false
      state.installedApps = installedApps
    },
    [SET_INSTALLED_ROLES](state, roles) {
      state.userRoles = roles
    },
  },


}
