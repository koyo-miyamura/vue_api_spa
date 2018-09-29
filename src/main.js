var routes = [
  { path: '/', component: Index},
  { path: '/home', component: Home}
]

var router = new VueRouter({
  routes
})

var vm = new Vue({
  el: '#app',
  router
})
