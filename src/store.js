import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    querySearch: {
      query: 'fukuokaex',
      items: 100
    },
    tagSearch: {
      tag: 'elixir',
      items: 100
    },
    showChart: true
  },
  mutations: {
    setShowChart (state, value) {
      state.showChart = value
    },
    setQuery (state, value) {
      state.querySearch.query = value
    },
    setQueryItems (state, value) {
      state.querySearch.items = value
    },
    setTag (state, value) {
      state.tagSearch.tag = value
    },
    setTagItems (state, value) {
      state.tagSearch.items = value
    }
  },
  actions: {

  }
})
