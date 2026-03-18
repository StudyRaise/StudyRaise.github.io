import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserbuttonList: {},
    hospitalName: "",
    token: '',
  },
  mutations: {
    SetToken(state,token) {
      state.token = token
      // 同时存入 sessionStorage
      sessionStorage.setItem('token', token);
    }
  },
  actions: {

  },
  modules: {
  
  }
})
