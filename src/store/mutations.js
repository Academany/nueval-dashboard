import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  CHANGE_COURSE,
  CHANGE_APP,SET_PROFILE,
  LOAD_STUDENTS,
  SET_STUDENTS,
  UPDATE_PROFILE,
  API_FAILURE,
  LOAD_COURSES,
  SET_COURSES,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  LOAD_ROLES,
  SET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  LOAD_USERS,
  SET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  LOAD_LABS,
  SET_LABS,
  CREATE_LAB,
  UPDATE_LAB,
  DELETE_LAB
} from './mutation-types'
import _ from 'lodash';

export default {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
    [CHANGE_COURSE](state,newcouse){
      console.log('Changing course to ' + JSON.stringify(newcouse));
      state.currentCourse = newcouse;
    },
    [CHANGE_APP](state,newApp){
      state.currentApp = newApp;
    },
    [SET_PROFILE](state,newProfile){
      state.userProfile = newProfile;
    },
    [LOAD_STUDENTS](state){
      //nop
    },
    [SET_STUDENTS](state,newStudents){
      state.students = newStudents;
    },
    [CREATE_STUDENT](state,response){
    },
    [UPDATE_STUDENT](state,response){
    },
    [DELETE_STUDENT](state,response){
      let newc = [];
      state.students.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.students = newc;
    },

    [UPDATE_PROFILE](state,response){
      // console.log(updatedProfile);
      console.log(response);
    },
    [API_FAILURE](state,error){
      state.api_error = error;
    },
    [LOAD_COURSES](state){
      //nop
    },
    [SET_COURSES](state,courses){
      state.courses = courses;
    },
    [CREATE_COURSE](state,response){
      var newc = state.courses.slice();
      newc.push(response);
      state.courses = newc;
    },
    [UPDATE_COURSE](state,response){
      let newc = [];
      state.courses.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.courses = newc;

    },
    [DELETE_COURSE](state,response){
      let newc = [];
      state.courses.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.courses = newc;
    },
    [LOAD_ROLES](state){
      //nop
    },
    [SET_ROLES](state,roles){
      state.roles = roles;
    },
    [CREATE_ROLE](state,response){
      var newc = state.roles.slice();
      newc.push(response);
      state.roles = newc;
    },
    [UPDATE_ROLE](state,response){
      let newc = [];
      state.roles.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.roles = newc;

    },
    [DELETE_ROLE](state,response){
      let newc = [];
      state.roles.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.roles = newc;
    },
    [LOAD_USERS](state){
      //nop
    },
    [SET_USERS](state,users){
      state.users = users;
    },
    [CREATE_USER](state,response){
      var newc = state.users.slice();
      newc.push(response);
      state.users = newc;
    },
    [UPDATE_USER](state,response){
      let newc = [];
      state.users.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.users = newc;

    },
    [DELETE_USER](state,response){
      let newc = [];
      state.users.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.users = newc;
    },
    [LOAD_LABS](state){
      //nop
    },
    [SET_LABS](state,labs){
      state.labs = labs;
    },
    [CREATE_LAB](state,response){
      var newc = state.labs.slice();
      newc.push(response);
      state.labs = newc;
    },
    [UPDATE_LAB](state,response){
      let newc = [];
      state.labs.forEach((el)=>{
        if (el.id === response.id) {
          newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.labs = newc;

    },
    [DELETE_LAB](state,response){
      let newc = [];
      state.labs.forEach((el)=>{
        if (el.id === response.id) {
          // newc.push(response);
        } else {
          newc.push(el)
        }
      });
      state.labs = newc;
    },

}
