import Vue from 'vue'
import Router from 'vue-router'
import LawCase from '@/components/lawCase'
import PoltEdit from '@/components/poltEdit'
import setter from '@/components/setter'
import setCommon from '@/components/setComponents/common'
import setFirst from '@/components/setComponents/first'
import setCrime from '@/components/setComponents/crime'
import setCrimeSingle from '@/components/setComponents/crimeSingle'
import setCrimeSingleOther from '@/components/setComponents/crimeSingleOther'
import setCrimeSingleJzx from '@/components/setComponents/crimeSingleJzx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'setter',
      component: setter
    },
    {
      path: '/poltEdit',
      name: 'PoltEdit',
      component: PoltEdit
    },
    {
      path: '/setter',
      name: 'setter',
      component: setter,
      children: [
        {
          path: 'first',
          component: setFirst
        },
        {
          path: 'common',
          component: setCommon
        },
        {
          path: 'crime',
          component: setCrime,
          children: [
            {
              path: 'crimesingle/:crime',
              name: 'crimesingle',
              component: setCrimeSingle,
              children: [
                {
                  name: 'crimeother',
                  path: 'crimeother/:index',
                  component: setCrimeSingleOther,
                },

                {
                  name: 'crimejzx',
                  path: 'crimejzx',
                  component: setCrimeSingleJzx,
                },
              ]
            }
          ]
        }
      ]
    }
  ]
})
