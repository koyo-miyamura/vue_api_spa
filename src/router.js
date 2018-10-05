import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/search/query',
      name: 'query-search',
      component: () => import('./views/QuerySearch.vue')
    }
  ]
})
