/*eslint-disable*/
import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';

function error(data) {
    Message({
        message: data.respMsg || '系统异常',
        type: 'error'
    });
}

function request(method, url, param, callback, errorNotice, failBack) {
    let errorCallback = errorNotice || error;
    let failCallBack = failBack || error;
    axios({
        method: method || 'post',
        url: url,
        params: method === 'get' ? param : {},
        data: method === 'post' ? param : {},
        timeout: 3000000,
        responseType: 'json',
        baseURL: ''
    }).then(function (response) {
        if (response.data.respCode) {
            if (response.data.respCode != '00' && response.data.respCode != '0') {
                errorCallback(response.data);
            } else {
                callback(response.data.result);
            }
        } else {
            // 任何请求
            callback(response.data);
        }
        
    }).catch(function(error) {
        if (error && error.response) {
            Message({
                message: error.response.data && error.response.data.respMsg || '系统异常',
                type: 'error'
            });
        }
    });
}



export function get(url, params, callback) {
    return request('get', url, params, callback);
}

export function post(url, params, callback, errorNotice, failBack) {
    return request('post', url, params, callback, errorNotice, failBack);
}

// objArr: [{url: url, data: params}]
export function postAll(objArr, callback) {
    let newArr = [];
    objArr.forEach(function (item, index) {
        newArr.push(axios.post(item.url, item.data || {}));
    });
    axios.all(newArr)
        .then(function (results) {
            let resDataArr = [];
            results.forEach(function (item, index) {
                resDataArr.push(item.data);
            });
            callback(resDataArr);
        })
        .catch(function (error) {
            console.log(error);
        });
}