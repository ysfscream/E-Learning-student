import Vue from 'vue'
import Vuex from 'vuex'

import student from './modules/student'
import theme from './modules/theme'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account: student,
    themeColor: theme,
  },
})

export default store
