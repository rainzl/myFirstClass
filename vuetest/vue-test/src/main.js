// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import router from './router'
import * as iAxios from './utils/iAxios.js'
import store from './store'
import loading from './components/public/loading'
import emptyVue from './components/public/empty'
import {Num} from '@/utils/directive'


Vue.prototype.$ajax = iAxios

Vue.config.productionTip = false
/* axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
} */
/* eslint-disable no-new */
Vue.component('loading',loading);
Vue.component('emptyVue',emptyVue);
new Vue({
  el: '#app',
  router,
  store,
  created: function () {}
})

