import Vue from 'vue'
import Vuex from 'vuex'
import iAxios from './../public/iAxios.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lawCase: {
      ajaxData: {
        currPage: 1,
        zmstate: undefined,
        joinstate: undefined,
        kindstate: undefined,
        lasj: 2,
        tolimit: undefined,
        searchstr: undefined
      },
      data: {
        page: {},
        result: []
      }
    }
  },
  actions: {
    // 封装一个 ajax 方法
    lawCaseAjax (context) {
      iAxios.post('getCaseByLoginId', context.state.lawCase.ajaxData, param => {
        console.log(param)
        if (context.state.lawCase.ajaxData.currPage === 1) {
          this.state.lawCase.data = param
        } else {
          this.state.lawCase.data.page.currPage = param.page.currPage
          this.state.lawCase.data.page.totalPage = param.page.totalPage
          this.state.lawCase.data.result = this.state.lawCase.data.result.concat(param.result)
        }
      })
    }
  }
})

export default store
