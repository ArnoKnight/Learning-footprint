import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 准备state——用于存储数据
  state: {
    sum: 0
  },
  // 准备mutation——用于操作数据（state）
  mutations: {
    JIA(state, value) {
      state.sum += value
    },
    JIAN(state, value) {
      state.sum -= value
    },
    JIAODD(state, value) {
      state.sum += value
    },
    JIAWAIT(state, value) {
      state.sum += value
    },
  },
  //准备actions——用于响应组件中的动作
  actions: {
    jia(contentx, value) {
      contentx.commit('JIA', value)
    },
    jian(contentx, value) {
      contentx.commit('JIAN', value)
    },
    jiaOdd(contentx, value) {
      contentx.commit('JIAODD', value)
    },
    jiaWait(contentx, value) {
      contentx.commit('JIAWAIT', value)
    }
  },
  modules: {}
})