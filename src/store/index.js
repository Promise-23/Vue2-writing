import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../myVuex/my-vuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() =>{
        commit('add')
      }, 1000)
    }
  }
})
