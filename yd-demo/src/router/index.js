import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: a => {
        require(['@/views/demo.vue'], a)
      }
    },
    {
      path: '/list',
      name: 'List',
      component: a => {
        require(['@/views/company/list.vue'], a)
      }
    }
  ]
})
