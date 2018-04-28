// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// iAxios 并且挂载到原型上，挂载到原型上的含义是 能在 vue 的实例内通过this 调用
import * as iAxios from '@/utils/iAxios.js'
Vue.prototype.iAxios = iAxios; // 挂载到原型上

// 指令文件，
import * as directives from './utils/directives'

// lodash js 工具库
import _ from 'lodash'
Vue.prototype._ = _;

// bootstrap  不需要用
import 'bootstrap/dist/css/bootstrap.css';

// 过滤器  ，并将过滤器注入到全局
import * as filters from './utils/filters';

Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));

// vuex 
import store from '@/store'


Vue.config.productionTip = false // 去掉生产环境中的警告

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
