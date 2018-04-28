// axios 的封装
import axios from 'axios';
import common from './common';
import {
  mainConfig
} from './apiConfig';
import Cookies from 'js-cookie'
import {
  Notification
} from 'element-ui'; // 提示组件

function request(method, url, param, callback) {
  let fIEVersion = common.iEVersion();
  if (Cookies.get('crmToken')) { // 获取crmToken 如果存在则在请求头中 加入 X-Token 用于表示登陆状态
    axios.interceptors.request.use(config => {
        Object.assign(config.headers, { // 合并请求头信息
          'X-Token': Cookies.get('crmToken')
        });
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      });
  }
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Pragma': 'no-cache', // 解决缓存的问题 但只在ie10 生效
      'Cache-Control': 'no-cache',
      // 'Access-Control-Allow-Origin':'*'
    },
    cache: false,
    method: method || 'post',
    url: `/api/v1/${url}`,
    // data: param,
    timeout: 3000000, // 超时时间
    responseType: 'json',
    // params:param,
    // data:param
  }
  if (method == 'get' || method == 'delete') {
    config.params = { // 参数拼接在url 后，类似于get 请求
      ...param,
      _time: new Date().getTime()
    };
  } else {
    config.data = param; // 参数放在请求体中
  }
  axios(config) // axios 实例化
    .then(response => { // ie9 下 iaxios 的出参形式不同
      if (common.myBrowser() == 'IE' && (+fIEVersion == 9)) {
        if (response.status >= 200 && (response.status < 300)) {
          if (response.request.responseText) {
            callback(JSON.parse(response.request.responseText).data);
          } else {
            callback();
          }
        }
      } else {
        if (response.status >= 200 && (response.status < 300)) {
          if (response.data) {
            callback(response.data.data);
          } else {
            callback();
          }
        }
      }
    })
    .catch(function (error) { // 异常catch 若状态码为401则跳转到 passport 登陆页面
      let href = encodeURIComponent(window.location.href); // url 进行编码
      if (error.response) {
        if (+fIEVersion == 9 && (common.myBrowser() == 'IE')) {
          if (error.response.status == 401) { // 跳转
            window.location.href = `${mainConfig.api}/ssologin?originUrl=${href}&loginPath=login/index&appId=crm`;
          } else {
            errorCallback(error.response.data)
          }
        } else {
          if (error.response.data.code == 401) { // 跳转
            window.location.href = `${mainConfig.api}/ssologin?originUrl=${href}&loginPath=login/index&appId=crm`;
          } else {
            errorCallback(error.response.data.message)
          }
        }

      }
    });
}

function errorCallback(data) { // 出错后统一的回调函数，弹出后端提示的错误信息
  Notification.error({
    title: '系统异常',
    message: data,
    position: 'bottom-left'
  });
}
// 四中请求方式
export const get = (url, params, callback) => request('get', url, params, callback);
export const post = (url, params, callback) => request('post', url, params, callback);
export const deleteAjax = (url, params, callback) => request('delete', url, params, callback);
export const put = (url, params, callback) => request('put', url, params, callback);
