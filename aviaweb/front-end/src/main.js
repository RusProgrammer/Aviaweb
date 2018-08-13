import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Responseviewer from './Components/Responseviewer.vue'
import Login from './Components/Login.vue'
import Table from './Components/Tablecontent.vue'
import Loginux from './Components/Loginux.vue'
import testedMenu from './Components/testedMenu.vue'
import Dropdown from './Components/etc/dropdown.vue'
import store from '../Store/index.js'
import Projecttree from './Components/Projecttree.vue'
import Main from './Components/Main.vue'
import Sortedtable from './Components/Sortedtable.vue'
var VueAuth = require('vue-auth')
 
Vue.use(VueAuth, {
  storagePrefix: '_prefix.',
  redirectType: 'router',
  authPath : '/loginux'
})

Vue.use(VueRouter)


var router = new VueRouter({
  routes:[
    {path: '/about', component: Dropdown},//about => About.vue
    {path: '/table', component: Table},//about => About.vue
    {path: '/main', component: Main},//about => About.vue
    {path: '/tree', component: Projecttree},//about => About.vue
    {path: '/sortedtable', component: Sortedtable},//about => About.vue
    {path: '/app', component: App},//about => About.vue
    {path: '/login', component: Login, query: { redirect: '/table' }},
    {path: '/loginux', component: Loginux},
    {path: '/testedmenu', component: testedMenu},
    {path: '/refs', component: Responseviewer, props: true }
  ]
})

const myTestedMenu = new Vue({
  el: '#myTestedMenu',
  store: store,
  render: h =>h(testedMenu)
})

Vue.component('myGlobalMenu', testedMenu)

const app = new Vue({
  el: '#app',
  store: store,
  router: router
})
