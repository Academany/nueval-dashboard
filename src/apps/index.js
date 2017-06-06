// // import ManagerDashboard from './manager/Dashboard.vue'
// import InstructorDashboard from './instructor/Dashboard.vue'
// import InstructorDashboardBoot from './instructor/Boot.vue'
// import InstructorDashboardError from './instructor/Error.vue'
// import InstructorDashboardHome from './instructor/Home.vue'
// import InstructorDashboardStudents from './instructor/students/List.vue'
// import InstructorDashboardLabs from './instructor/students/List.vue'
// import InstructorDashboardEvaluation from './instructor/evaluations/List.vue'
// import InstructorDashboardPresentations from './instructor/presentations/List.vue'

import AdminDashboard from './admin/Dashboard.vue'
import AdminHome from './admin/Home.vue'
import users from './admin/users/List.vue'
import roles from './admin/roles/List.vue'

const applist = ['labs','supernodes','finalprojects','programs']

const lazy = (path) => {
    return ()=> { return import(`${path}`) }
}

let apps =
[
  { 'id': 'manager',
    'label': 'Programs Manager',
    'description': 'This app allows to manage and configure the different educational programs',
    'target' : '/apps/manager',
    'icon' : 'books',
    // 'component' : Programs,
    'routes': [
      {
        path:'/',
        component: lazy('./manager/Dashboard.vue') ,
        children: [
          {path: '', component: lazy('./manager/Home.vue')},
          {path: 'settings', component: lazy('./manager/Settings.vue')},
          {path: 'labs', component: lazy('./manager/labs/List.vue')},
          {path: 'instructors', component: lazy('./manager/instructors/List.vue')},
          {path: 'students', component: lazy('./manager/students/List.vue')},
          {path: 'supernodes', component: lazy('./manager/supernodes/List.vue')},
          {path: 'finalprojects', component: lazy('./manager/finalprojects/List.vue')},
          {path: 'evaluations', component: lazy('./manager/evaluations/List.vue')},
          {path: 'courses', component: lazy('./manager/courses/List.vue')},
        ]
      },
    ]
  },
  {'id': 'student', 'label': 'Student Dashboard', 'description': 'This app allows to monitor your progress as a student','target' : '/apps/student/', 'icon' : 'child'},
  {
    'id': 'instructor', 
    'label': 'Instructor Dashboard', 
    'description': 'This app allows to monitor your student as an instructor', 
    'target' : '/apps/instructor', 
    'icon' : 'child',
    'routes': [
      {
        path:'/',
        component: lazy('./instructor/Boot.vue'),
        children: [
          { path: 'error', component: lazy('./instructor/Error.vue') },
          {
            path: 'd', 
            component: lazy('./instructor/Dashboard.vue'),              
            // absolute path for 2nd level components
            children: [
              {path: 'home', component: lazy('./instructor/Home.vue')},
              {path: 'students', component: lazy('./instructor/students/List.vue')},
              {path: 'labs',  component: lazy('./instructor/labs/List.vue')},
              {path: 'evaluations',  component: lazy('./instructor/evaluations/List.vue')},
              {path: 'finalprojects', component: lazy('./instructor/finalprojects/List.vue')},
            ]
          }
        ]
      }
    ]
  },
  {'id': 'evaluation', 'label': 'Evaluation Dashboard', 'description': 'This app allows to evaluate assigned students', 'target' : '/apps/evaluation/', 'icon' : 'child'},
  {'id': 'lab', 'label': 'Lab Manager', 'description': 'This app allows to manage your lab profile and students', 'target' : '/apps/lab/', 'icon' : 'child'},
  {'id': 'supernode', 'label': 'Supernode', 'description': 'This app allows to monitor nodes under your responsibility', 'target' : '/apps/supernode/', 'icon' : 'child'},
  {'id': 'admin', 'label': 'Admin', 'description': 'This app allows to create users and do maintenance', 
  'target' : '/apps/admin',
   'icon' : 'child',
  'routes': [
    {
      path:'/',
      component: AdminDashboard,
      children: [
        {path: '', component: AdminHome},
        {path: 'users', component: users},
        {path: 'roles', component: roles},
      ]
    }
  ]},
  {'id': 'settings', 'label': 'Settings', 'description': 'This app allows to configure the system', 'target' : '/apps/settings/', 'icon' : 'child'}
]

export default apps;
