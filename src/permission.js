import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/index'
const LOGIN_PAGE = '/login'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (!token && to.path !== LOGIN_PAGE) {
    // 未登录且要跳转的页面不是登录页
    next({
      path: LOGIN_PAGE // 跳转到登录页
    })
  } else if (!token && to.path === LOGIN_PAGE) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.path === LOGIN_PAGE) {
    // 已登录且要跳转的页面是登录页
    next({
      path: defaultRoutePath // 跳转到homeName页
    })
  } else {
    if (store.getters.roles.length === 0) {
      next()
    } else {
      store.dispatch('GetInfo').then(res => {
        console.log(res)
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
