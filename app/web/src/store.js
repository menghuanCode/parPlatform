import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const app = {
  namespaced: true,
  state: {
    path: "/"
  },
  mutations: {
    
  },
  actions: {

  },
  getters: {

  }
}

export default new Vuex.Store({
  modules: {
    app
  }
})
