import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ElementUI from 'element-ui'
import './styles.scss'
import locale from 'element-ui/lib/locale/lang/en'

import VueAnalytics from 'vue-analytics'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub, faTwitter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI, { locale })

Vue.use(VueAnalytics, {
  id: 'UA-120919612-2',
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
