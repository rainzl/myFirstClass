import * as types from '../types'


export const state = {
  isTeam: false,
  centerMaskControl: { // 弹框控制器
    flag: [], // 遮罩的组件
    position: "",
    payload: {
        title:null,
        hintContent:null,
        buttons:[]

    } // 用于传入其他数据
  },
  rightMaskControl: { // 弹框控制器
    flag: [], // 遮罩的组件
    position: "",
    payload: {
        title:null,
        hintContent:null,
        buttons:[]
    } // 用于传入其他数据
  },
  details:{
      name:'张博亚'
  },
  test:1
}
export const mutations = {
  [types.CHANGEISTEAM](state, data) {

  },
  /*posiiton:'',
    name:'弹框的名称'
    payload: { // 如果是确认删除弹框
        title:null,
        hintContent:null,
        buttons:[{
            text: "我新增一条数据",
            color:'red',
            fn
        }]
    }
  */
  [types.MASKCONTROL](state, data) {
    if (data) {
      if (_.includes(state[(`${data.position}MaskControl`)].flag, data.name)) {
        _.without(state[(`${data.position}MaskControl`)].flag, data.name);
      } else {
        state[(`${data.position}MaskControl`)].flag.push(data.name)
      }
      data.payload&&(state[(`${data.position}MaskControl`)].payload = data.payload);
    } else {
        state.centerMaskControl = _.assign({},{ // 弹框控制器
            flag: [], // 遮罩的组件
            position: "",
            payload: {
                title:null,
                hintContent:null,
                buttons:[]
            } // 用于传入其他数据
        })
        state.rightMaskControl = _.assign({},{ // 弹框控制器
            flag: [], // 遮罩的组件
            position: "",
            payload: {
                title:null,
                hintContent:null,
                buttons:[]
            } // 用于传入其他数据
        })
    }
  },
  [types.UPDATEDETAILS](state,data){
      console.log(data)
      _.assign(state.details,{name:data})
      console.log(state)
  }
}
