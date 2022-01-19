import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 准备state——用于存储数据
  state: {
    sum: 0,
    name: "张三",
    age: 18
  },
  // 准备mutation——用于操作数据（state）
  mutations: {
    JIA(state, value) {
      state.sum += value
    },
    JIAN(state, value) {
      state.sum -= value
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
      if (contentx.state.sum % 2) contentx.commit('JIA', value)
    },
    jiaWait(contentx, value) {
      setTimeout(() => {
        contentx.commit('JIA', value)
      }, 500);
    }
  },
  modules: {},
  // 准备geters——用于将state中的数据进行加工
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
})