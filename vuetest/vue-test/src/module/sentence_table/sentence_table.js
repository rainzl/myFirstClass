// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import iAxios from './../../public/iAxios.js'
import store from './../../store/store'

Vue.prototype.$ajax = iAxios

Vue.config.productionTip = false
/* axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
} */
/* eslint-disable no-new */

new Vue({
  el: '#box',
  store,
  // components: { App },
  template: '<span>123</span>',
  created: function () {
    this.$ajax.post('json/zmfl.json', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }, (param) => {
      console.log(param)
    })
  }
})
