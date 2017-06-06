import LoginPage from "./pages/LoginPage.vue"
import Apps from "./pages/Apps.vue"
import VueRouter from 'vue-router'
import appList from './apps'
import CheckLogin from './auth/CheckLogin.vue'
import PleaseLogin from './auth/PleaseLogin.vue'
import AccountPage from './pages/AccountPage.vue'
import Notifications from './pages/Notifications.vue'
import Feedback from './pages/Messages.vue'
let routes = [
  { path: '/', component: Apps},
  { path: '/login', component: PleaseLogin},
  { path: '/profile/account', component: AccountPage},
  { path: '/profile/notifications', component: Notifications},
  { path: '/profile/feedback', component: Feedback}
  // { path: '/', component: Apps},
  // { path: '/login', component: LoginPage }
]

appList.forEach( (el) => {
  // routes.push({
  //   path: el.target,
  //   component: el.component
  // })
  let app_routes = el.routes || []

  app_routes.forEach( (ex) => {

    let children = ex.children || []
    let routePath = el.target + ex.path;

    const buildMap = (path) => {
      return (c)=>{
        c.path = path + c.path
        if (c.children) 
          c.children = c.children.map(buildMap(c.path + '/'))
        console.log(c.path)
        return c
      }
    }

    children = children.map(buildMap(routePath))
    ex.children = children
    routes.push({
        path: el.target + ex.path,
        component: ex.component,
        children: ex.children || []
    })
  })
})

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for routes: routes
})




export default router
