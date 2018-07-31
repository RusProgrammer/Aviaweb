import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Responseviewer from './Components/Responseviewer.vue'
import Login from './Components/Login.vue'
import Table from './Components/Tablecontent.vue'

Vue.use(VueRouter)


var router = new VueRouter({
  routes:[
    {path: '/about', component: Responseviewer},//about => About.vue
    {path: '/table', component: Table},//about => About.vue
    {path: '/app', component: App},//about => About.vue
    {path: '/login', component: Login}
  ]
})

const app = new Vue({
  el: '#app',
  router: router
})
