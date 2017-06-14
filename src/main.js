import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en'
import Icon from 'vue-awesome/components/Icon.vue'

// uncomment here and in vendor.js to enable webix
// import webix from 'webix'
// import 'webix/webix.css'
// import WebixWidget from './components/WebixWidget.vue'
// import './components/webix-controls'

import Vuex from 'vuex'
import routes from './routes'
import VueResource from 'vue-resource'
import Vapi from 'vuex-rest-api'
import VueMoment from 'vue-moment'
// uncomment to add vue webix widgets
// Vue.use(WebixUI)
Vue.use(VueResource);
Vue.use(ElementUI, { locale })
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueMoment)

// globally (in your main .js file)
Vue.component('fa-icon', Icon)

import Truncate from './filters'
export const store = require('./store').default
export const router = routes

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
