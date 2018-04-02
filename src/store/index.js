import Vue from 'vue'
import Vuex from 'vuex'

import teacher from './modules/teacher'
import theme from './modules/theme'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account: teacher,
    themeColor: theme,
  },
})

export default store
