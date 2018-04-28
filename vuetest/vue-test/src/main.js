// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/reset.css'
import './css/public.css'

import Vue from 'vue'
import 'es6-promise/auto'
import router from './router'
import iAxios from './public/iAxios.js'
import store from './store/store'

Vue.prototype.$ajax = iAxios

Vue.config.productionTip = false
/* axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
} */
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  created: function () {}
})
