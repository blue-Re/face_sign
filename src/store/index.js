import { createStore } from 'vuex'

export default createStore({
  state: {
    // 签到的状态
    isSign:false,
    // 所有的消息
    allInfo:[]
  },
  mutations: {
    // 改变当前签到的状态
    changeSignState(state){
      state.isSign = true
    },
    // 改变为签退
    changeSignState2(state){
      state.isSign = false
    }
  },
  actions: {
    
  },
  modules: {
  }
})
