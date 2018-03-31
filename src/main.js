import router from '@/routes'
import store from '@/store'

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
