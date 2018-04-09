import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import bus from '@/utils/bus'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.account.student.token) {
      next({ path: '/home' })
      bus.$emit('isWarning', {
        snackbar: true,
        snackbarTitle: '抱歉！ 在浏览之前，请先登录',
        snackbarColor: 'amber accent-4',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
