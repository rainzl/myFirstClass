import axios from 'axios'
import common from './common'
import {
  mainConfig
} from './mainConfig'

function request (method, url, param, callback) {
  let fIEVersion = common.ieVersion()
  axios({
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    },
    cache: false,
    method: method || 'post',
    url: '/normalLx/' + url,
    params: param,
    data: param,
    timeout: 3000000,
    responseType: 'json'
  })
    .then(response => {
      console.log(response.data)
      if (common.myBrowser() == 'IE' && (+fIEVersion == 9)) {
        if (response.status >= 200 || (response.status < 300)) {
          if (response.request.responseText) {
            callback(JSON.parse(response.request.responseText))
          } else {
            callback()
          }
        }
      } else {
        if (response.status >= 200 || (response.status < 300)) {
          if (response.data) {
            callback(response.data)
          } else {
            callback()
          }
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (+fIEVersion == 9 && (common.myBrowser() == 'IE')) {
          if (error.response.status == 401) { // 跳转
            let href = encodeURIComponent(window.location.href)
            window.location.href = `${mainConfig.api}/ssologin?originUrl=${href}&loginPath=login/index&appId=crm`
          } else {
            callback(error.response.data)
            errorCallback(error.response.data.message)
          }
        } else {
          if (error.response.data.code == 401) { // 跳转
            let href = encodeURIComponent(window.location.href)
            window.location.href = `${mainConfig.api}/ssologin?originUrl=${href}&loginPath=login/index&appId=crm`
          } else {
            callback(error.response.data)
            errorCallback(error.response.data.message)
          }
        }
      }
    })
}

function errorCallback (data) {
  alert('系统异常')
  /**
   * vueM.$notify.error({
    title: '系统异常',
    message: data,
    position: 'bottom-left'
  })**/
}

export default {
  get: (url, params, callback) => request('get', url, params, callback),
  post: (url, params, callback) => request('post', url, params, callback),
  deleteAjax: (url, params, callback) => request('delete', url, params, callback),
  put: (url, params, callback) => request('put', url, params, callback)
}
// objArr: [{url: url, data: params}]
