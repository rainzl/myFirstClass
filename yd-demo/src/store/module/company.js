import * as types from '../types'


export const state = {
    tabledata:[],
    
}
export const mutations = {
  [types.GETTABLE](state, data) {
    state.tabledata = data.res.list;
  },
}
