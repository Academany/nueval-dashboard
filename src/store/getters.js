
export default {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  currentCourse: state=>{
    return state.currentCourse
  },
  currentApp: state=>{
    return state.currentApp
  },
  userProfile: state=>{
    return state.userProfile
  },
  students: state=>{
    return state.students
  },
  api_error: state=>{
    return state.api_error
  },
  courses: state=>{
    return state.courses
  },
  labs: state=>{
    return state.labs
  },
  roles: state=>{
    return state.roles
  },
  users: state=>{
    return state.users.map((el)=>{
      let roles = el.roles || [];
      let role_names = roles.map((rl)=> rl.name)
      el.role_names = role_names.join(',');
      return el;
    })
  },
}
