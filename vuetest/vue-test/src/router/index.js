import Vue from 'vue'
import Router from 'vue-router'
import LawCase from '@/components/lawCase'
import PoltEdit from '@/components/poltEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lawCase',
      component: LawCase
    },
    {
      path: '/poltEdit',
      name: 'PoltEdit',
      component: PoltEdit
    }
  ]
})
