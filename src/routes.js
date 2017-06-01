import LoginPage from "./pages/LoginPage.vue"
import Apps from "./pages/Apps.vue"
import VueRouter from 'vue-router'
import appList from './apps'
import CheckLogin from './auth/CheckLogin.vue'
import PleaseLogin from './auth/PleaseLogin.vue'
import AccountPage from './pages/AccountPage.vue'
let routes = [
  { path: '/', component: Apps},
  { path: '/login', component: PleaseLogin},
  { path: '/profile/account', component: AccountPage}
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
