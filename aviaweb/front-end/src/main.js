import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Responseviewer from './Components/Responseviewer.vue'
import Login from './Components/Login.vue'
import Table from './Components/Tablecontent.vue'
import Loginux from './Components/Loginux.vue'
import store from '../Store/index.js'
var VueAuth = require('vue-auth')
 
Vue.use(VueAuth, {
  storagePrefix: '_prefix.',
  redirectType: 'router',
  authPath : '/loginux'
})

Vue.use(VueRouter)


var router = new VueRouter({
  routes:[
    {path: '/about', component: Responseviewer},//about => About.vue
    {path: '/table', component: Table},//about => About.vue
    {path: '/app', component: App},//about => About.vue
    {path: '/login', component: Login},
    {path: '/loginux', component: Loginux}
  ]
})

const app = new Vue({
  el: '#app',
  store: store,
  router: router
})
