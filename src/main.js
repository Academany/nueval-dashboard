import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en'
import Icon from 'vue-awesome/components/Icon.vue'
import webix from 'webix'
import 'webix/webix.css'
import WebixWidget from './components/WebixWidget.vue'
import './components/webix-controls'
import Vuex from 'vuex'
import routes from './routes'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.component('WebixWidget', WebixWidget)

// Vue.use(WebixUI)
Vue.use(ElementUI, { locale })
Vue.use(Vuex)
Vue.use(VueRouter)


// globally (in your main .js file)
Vue.component('fa-icon', Icon)

export const store = require('./store').default
export const router = routes

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
