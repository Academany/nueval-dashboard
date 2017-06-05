import ManagerDashboard from './manager/Dashboard.vue'
import InstructorDashboard from './instructor/Dashboard.vue'
import InstructorDashboardHome from './instructor/Home.vue'
import InstructorDashboardStudents from './instructor/students/List.vue'
import InstructorDashboardEvaluation from './instructor/evaluations/List.vue'
import InstructorDashboardPresentations from './instructor/presentations/List.vue'
import ManagerHome from './manager/Home.vue'
import labs from './manager/labs/List.vue'
import supernodes from './manager/supernodes/List.vue'
import instructors from './manager/instructors/List.vue'
import students from './manager/students/List.vue'
import finalprojects from './manager/finalprojects/List.vue'
import evaluations from './manager/evaluations/List.vue'
import courses from './manager/courses/List.vue'
import settings from './manager/Settings.vue'
import AdminDashboard from './admin/Dashboard.vue'
import AdminHome from './admin/Home.vue'
import users from './admin/users/List.vue'
import roles from './admin/roles/List.vue'

const applist = ['labs','supernodes','finalprojects','programs']

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
        component: ManagerDashboard,
        children: [
          {path: '', component: ManagerHome},
          {path: 'settings', component: settings},
          {path: 'labs', component: labs},
          {path: 'instructors', component: instructors},
          {path: 'students', component: students},
          {path: 'supernodes', component: supernodes},
          {path: 'finalprojects', component: finalprojects},
          {path: 'evaluations', component: evaluations},
          {path: 'courses', component: courses},
        ]
      },
    ]
  },
  {'id': 'student', 'label': 'Student Dashboard', 'description': 'This app allows to monitor your progress as a student','target' : '/apps/student/', 'icon' : 'child'},
  {
    'id': 'instructor', 
    'label': 'Instructor Dashboard', 
    'description': 'This app allows to monitor your student as an instructor', 
    'target' : '/apps/instructor/', 
    'icon' : 'child',
    'routes': [
      {
        path:'/',
        component: InstructorDashboard,
        children: [
          {path: '', component: InstructorDashboardHome},
          {path: 'students', component: InstructorDashboardStudents},
          {path: 'evaluations', component: InstructorDashboardEvaluation},
          {path: 'finalprojects', component: InstructorDashboardPresentations}
        ]
      }
    ]
  },
  {'id': 'evaluation', 'label': 'Evaluation Dashboard', 'description': 'This app allows to evaluate assigned students', 'target' : '/apps/evaluation/', 'icon' : 'child'},
  {'id': 'lab', 'label': 'Lab Manager', 'description': 'This app allows to manage your lab profile and students', 'target' : '/apps/lab/', 'icon' : 'child'},
  {'id': 'supernode', 'label': 'Supernode', 'description': 'This app allows to monitor nodes under your responsibility', 'target' : '/apps/supernode/', 'icon' : 'child'},
  {'id': 'admin', 'label': 'Admin', 'description': 'This app allows to create users and do maintenance', 'target' : '/apps/admin/', 'icon' : 'child',
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
