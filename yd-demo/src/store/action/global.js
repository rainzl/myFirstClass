import * as iAxios from '@/utils/iAxios';
import * as types from '@/store/types';

/*  异步action
    payload: {
        url: '动作标识',
        data: {},  //入参对象
        method: 'get / post / deleteAjax/ input',
        setStore：默认为false 是否把请求的数据放到vuex 中
    }
*/
export const fetchUrl = ({
  commit
}, payload) => {
  return new Promise((resolve, reject) => {
    let params = {};
    const method = payload.method || 'post';
    params.path = types.api[payload.url];
    params.data = payload.data;
    iAxios[method](params.path, params.data, function (res) { 
        payload.setStore&&commit(payload.url, {
        res: res,
        searchParams: params.data
      });
      resolve(res)
    });
  })
};

// 同步action
export const dispatch = ({
  commit
}, payload) => {
  commit(types[payload.url], payload.data);
};
