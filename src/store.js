import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showChart: true
  },
  mutations: {
    setShowChart (state, value) {
      state.showChart = value
    }
  },
  actions: {

  }
})
