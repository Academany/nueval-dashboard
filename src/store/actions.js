import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  CHANGE_COURSE,
  CHANGE_APP,SET_PROFILE,
  LOAD_STUDENTS,
  SET_STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
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
  LOAD_LABS,
  SET_LABS,
  CREATE_LAB,
  UPDATE_LAB,
  DELETE_LAB

} from './mutation-types'

import {router} from '../main'
import api from './api'
function push(route){
  var r = router;
  r.replace({path:route,force:true})
}

export default {
   login({ commit }, creds) {
     commit(LOGIN); // show spinner
     console.log('setting token')
     console.log(creds)
     localStorage.setItem("token", creds.params.token);
     localStorage.setItem("userId", creds.params.userId);
     commit(LOGIN_SUCCESS);
   },
   logout({ commit }) {
     localStorage.removeItem("token");
     commit(LOGOUT);
     router.push('/login');
   },
   changeCourse({ commit }, newcourse ) {
     if (newcourse == '-' || newcourse == 'new') {
       commit(CHANGE_COURSE, null)
       router.replace({path:'/apps/manager/courses', 'force':true})
     } else {
       commit(CHANGE_COURSE, newcourse)
      //  commit(LOAD_STUDENTS, newcourse.id)
      //  commit(LOAD_LABS, newcourse.id)
       router.replace({path:'/apps/manager', 'force':true})
     }
   },
   changeApp({commit}, newApp) {
     commit(CHANGE_APP,newApp)
   },
   setUserProfile({commit}, newProfile){
     commit(SET_PROFILE, newProfile)
   },
   loadStudents({commit}, course_id) {
       commit(LOAD_STUDENTS, course_id)
       const opts = {
         url: '/api/courses/' +
              course_id +
              '/students?filter=' +
              encodeURIComponent(JSON.stringify({"include":["lab","course","user"]}))
       }
       api.get(opts.url)
       .then(function(response){
         console.log('set courses');
         console.log(response);
         commit('SET_STUDENTS', response);
       })
       .catch(function(error){
         commit('API_FAILURE', error)
        //  if (cb) cb(error);
       });
   },
   setStudents({commit},students){
     console.log('Got');
     console.log(courses);
     commit(SET_STUDENTS, students);
   },
   createStudent({commit}, student){
     return new Promise((resolve, reject) => {
       const courseId = student.course.id;
        // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses/" + courseId + "/students",student).then(response => {
            // http success, call the mutator and change something in state
            commit(LOAD_STUDENTS, courseId)
             // Let the calling function know that http is done. You may send some data back
            // push('/apps/manager/courses')
            resolve(response);
        }, error => {
            // http failed, let the calling function know that action did not work out
            commit(API_FAILURE, error);
            // push('/apps/manager/courses')
            reject(error);
        })
    });
  },
  updateStudent({commit}, student){
      console.log(student);
      return new Promise((resolve, reject) => {
          const courseId = student.courseId;
           // Do something here... lets say, a http call using vue-resource
           api.put("/api/courses/" + courseId + "/students/" + student.id, student).then(response => {
               // http success, call the mutator and change something in state
               commit(LOAD_STUDENTS, courseId)

                // Let the calling function know that http is done. You may send some data back
              //  push('/apps/manager/courses')
               resolve(response);
           }, error => {
               // http failed, let the calling function know that action did not work out
               commit(API_FAILURE, error);
              //  push('/apps/manager/courses')
               reject(error);
           })
      });
  },
   updateProfile({commit}, data){
     let cb = data.callback || function(){}
     api.post(data.url,data.data)
     .then(function(response){
       commit('UPDATE_PROFILE', response)
       if (cb) cb(null,response);
     })
     .catch(function(error){
       commit('API_FAILURE', error)
       if (cb) cb(error);
     });
   },
   loadCourses({commit,state},refresh){
     commit(LOAD_COURSES);
     if (state.courses && state.courses.length > 0 && refresh){
       return;
     }
     const opts = {
       url: '/api/courses?filter=' + encodeURIComponent(
         JSON.stringify({include:['students']}))
     }
     api.get(opts.url)
     .then(function(response){
       console.log('set courses');
       console.log(response);
       commit('SET_COURSES', response);
     })
     .catch(function(error){
       commit('API_FAILURE', error)
      //  if (cb) cb(error);
     });
   },
   setCourses({commit},courses){
     console.log('Got');
     console.log(courses);
     commit(SET_COURSES, courses);
   },
   createCourse({commit}, course){
     return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.post("/api/courses",course).then(response => {
            // http success, call the mutator and change something in state
            commit(CREATE_COURSE, course)
             // Let the calling function know that http is done. You may send some data back
            // push('/apps/manager/courses')
            resolve(response);
        }, error => {
            // http failed, let the calling function know that action did not work out
            commit(API_FAILURE, error);
            // push('/apps/manager/courses')
            reject(error);
        })
    });
  },
  updateCourse({commit}, course){
      return new Promise((resolve, reject) => {
           // Do something here... lets say, a http call using vue-resource
           api.post("/api/courses/" + course.id , course).then(response => {
               // http success, call the mutator and change something in state
               commit(UPDATE_COURSE, course)
                // Let the calling function know that http is done. You may send some data back
              //  push('/apps/manager/courses')
               resolve(response);
           }, error => {
               // http failed, let the calling function know that action did not work out
               commit(API_FAILURE, error);
              //  push('/apps/manager/courses')
               reject(error);
           })
      });
  },
  deleteCourse({commit}, course){
    return new Promise((resolve, reject) => {
       // Do something here... lets say, a http call using vue-resource
       api.delete("/api/courses/" + course.id).then(response => {
           // http success, call the mutator and change something in state
           commit(DELETE_COURSE, course)
            // Let the calling function know that http is done. You may send some data back
          //  push('/apps/manager/courses')
           resolve(response);
       }, error => {
           // http failed, let the calling function know that action did not work out
           commit(API_FAILURE, error);
          //  push('/apps/manager/courses')
           reject(error);
       })
    });
  },
  loadRoles({commit}){
    commit(LOAD_ROLES);
    const opts = {
      url: '/api/roles'
    }
    api.get(opts.url)
    .then(function(response){
      console.log('set roles');
      console.log(response);
      commit('SET_ROLES', response);
    })
    .catch(function(error){
      commit('API_FAILURE', error)
     //  if (cb) cb(error);
    });
  },
  setRoles({commit},roles){
    console.log('Got');
    console.log(roles);
    commit(SET_ROLES, roles);
  },
  createRole({commit}, role){
    return new Promise((resolve, reject) => {
       // Do something here... lets say, a http call using vue-resource
       api.post("/api/roles",role).then(response => {
           // http success, call the mutator and change something in state
           commit(CREATE_ROLE, role)
            // Let the calling function know that http is done. You may send some data back
           // push('/apps/manager/courses')
           resolve(response);
       }, error => {
           // http failed, let the calling function know that action did not work out
           commit(API_FAILURE, error);
           // push('/apps/manager/courses')
           reject(error);
       })
   });
 },
 updateRole({commit}, role){
     return new Promise((resolve, reject) => {
          // Do something here... lets say, a http call using vue-resource
          api.patch("/api/roles/" + role.id , course).then(response => {
              // http success, call the mutator and change something in state
              commit(UPDATE_ROLE, role)
               // Let the calling function know that http is done. You may send some data back
             //  push('/apps/manager/courses')
              resolve(response);
          }, error => {
              // http failed, let the calling function know that action did not work out
              commit(API_FAILURE, error);
             //  push('/apps/manager/courses')
              reject(error);
          })
     });
 },
 deleteRole({commit}, role){
   return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      api.delete("/api/roles/" + role.id).then(response => {
          // http success, call the mutator and change something in state
          commit(DELETE_ROLE, role)
           // Let the calling function know that http is done. You may send some data back
         //  push('/apps/manager/courses')
          resolve(response);
      }, error => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
         //  push('/apps/manager/courses')
          reject(error);
      })
   });
 },
 loadUsers({commit}){
   commit(LOAD_USERS);
   const opts = {
     url: '/api/users?filter[include]=roles'
   }
   api.get(opts.url)
   .then(function(response){
     console.log('set users');
     console.log(response);
     commit('SET_USERS', response);
   })
   .catch(function(error){
     commit('API_FAILURE', error)
    //  if (cb) cb(error);
   });
 },
 setUsers({commit},users){
    commit(SET_USERS, users);
 },
 createUser({commit}, user){
   // random password, there's no login anyway
   user.password =Math.random().toString(36).slice(-8);
   return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      api.post("/api/users",user).then(response => {
          // http success, call the mutator and change something in state
          commit(CREATE_USER, user)
           // Let the calling function know that http is done. You may send some data back
          // push('/apps/manager/courses')
          resolve(response);
      }, error => {
          // http failed, let the calling function know that action did not work out
          commit(API_FAILURE, error);
          // push('/apps/manager/courses')
          reject(error);
      })
  });
},
updateUser({commit}, user){
    return new Promise((resolve, reject) => {
         // Do something here... lets say, a http call using vue-resource
         api.patch("/api/users/" + user.id , user).then(response => {
             // http success, call the mutator and change something in state
             commit(UPDATE_USER, user)
              // Let the calling function know that http is done. You may send some data back
            //  push('/apps/manager/courses')
             resolve(response);
         }, error => {
             // http failed, let the calling function know that action did not work out
             commit(API_FAILURE, error);
            //  push('/apps/manager/courses')
             reject(error);
         })
    });
},
deleteUser({commit}, user){
  return new Promise((resolve, reject) => {
     // Do something here... lets say, a http call using vue-resource
     api.delete("/api/users/" + user.id).then(response => {
         // http success, call the mutator and change something in state
         commit(DELETE_USER, user)
          // Let the calling function know that http is done. You may send some data back
        //  push('/apps/manager/courses')
         resolve(response);
     }, error => {
         // http failed, let the calling function know that action did not work out
         commit(API_FAILURE, error);
        //  push('/apps/manager/courses')
         reject(error);
     })
  });
},
loadLabs({commit},courseId){
  commit(LOAD_LABS);
  const opts = {
    url: '/api/courses/' + courseId + '/labs?filter=' + encodeURIComponent(
      JSON.stringify({include:['course']})
    )
  }
  api.get(opts.url)
  .then(function(response){
    console.log('set labs');
    console.log(response);
    commit('SET_LABS', response);
  })
  .catch(function(error){
    commit('API_FAILURE', error)
   //  if (cb) cb(error);
  });
},
setLabs({commit},users){
   commit(SET_LABS, users);
},
createLab({commit}, lab){
  // random password, there's no login anyway
  user.password =Math.random().toString(36).slice(-8);
  return new Promise((resolve, reject) => {
     // Do something here... lets say, a http call using vue-resource
     api.post("/api/courses/" + lab.course.id + "/labs",lab).then(response => {
         // http success, call the mutator and change something in state
         commit(CREATE_LAB, lab)
          // Let the calling function know that http is done. You may send some data back
         // push('/apps/manager/courses')
         resolve(response);
     }, error => {
         // http failed, let the calling function know that action did not work out
         commit(API_FAILURE, error);
         // push('/apps/manager/courses')
         reject(error);
     })
 });
},
updateLab({commit}, lab){
   return new Promise((resolve, reject) => {
        // Do something here... lets say, a http call using vue-resource
        api.put("/api/courses/" + lab.course.id + "/labs/" + lab.id, lab).then(response => {
            // http success, call the mutator and change something in state
            commit(UPDATE_LAB, lab)
             // Let the calling function know that http is done. You may send some data back
           //  push('/apps/manager/courses')
            resolve(response);
        }, error => {
            // http failed, let the calling function know that action did not work out
            commit(API_FAILURE, error);
           //  push('/apps/manager/courses')
            reject(error);
        })
   });
},
deleteLab({commit}, lab){
 return new Promise((resolve, reject) => {
    // Do something here... lets say, a http call using vue-resource
    api.delete("/api/courses/" + lab.course.id + "/labs/" + lab.id).then(response => {
        // http success, call the mutator and change something in state
        commit(DELETE_LAB, lab)
         // Let the calling function know that http is done. You may send some data back
       //  push('/apps/manager/courses')
        resolve(response);
    }, error => {
        // http failed, let the calling function know that action did not work out
        commit(API_FAILURE, error);
       //  push('/apps/manager/courses')
        reject(error);
    })
 });
}

}
