/*eslint-disable*/
import * as fetch from '../../common/js/http';
import * as common from '../../common/js/common';
import {api, types} from '../../common/config/api';
import * as util from '../../common/js/util';
import { Message } from 'element-ui';

/*  异步action
    payload: {
        url: 'string/ []',
        data: [{}],  //入参对象
        method: 'get / post'
    }
*/
export const fetchUrlAction = ({commit}, payload) => {
    let params = Object.assign({}, common.requestParamsOption);
    const url = api[payload.url];
    const data = payload.data;
    const method = payload.method || 'post';
    const requestBefore = payload.reqStatusBefore || false;
    const reqStatusError = payload.reqStatusError || false;
    if (util.isArray(payload.url) && payload.url.length > 1) {
        // 同时发多个请求
        if (method === 'post') {
            let postAllParams = [];
            for (let i = 0; i < payload.url.length; i++) {
                postAllParams.push({
                    url: api[payload.url[i]],
                    data: data[i]
                });
            }

            fetch.postAll(postAllParams, function (resDataArr) {
                commit(types[payload.url[0] + 'POSTALL'], {res: resDataArr});
            });
        }
    } else {
        params.path = url;
        params.data = data;
        params.commit = commit;
        // 乐观更新 进行请求前的判断
        if (requestBefore) {
            commit(types[payload.url] + '_BEFORE');
        }

        if (reqStatusError) {
            fetch[method](url, params, function (res) {
                commit(types[payload.url], { res: res, searchParams: data });
            }, function (data) {
                Message({
                    message: data.respMsg || '系统异常',
                    type: 'error'
                });
                commit(types[payload.url] + '_ERROR');
            });
        } else {
            fetch[method](url, params, function (res) {
                commit(types[payload.url], { res: res, searchParams: data });
            });
        }
    }
};

// 同步action
export const dispatch = ({commit}, payload) => {
    commit(types[payload.url], payload.data);
};