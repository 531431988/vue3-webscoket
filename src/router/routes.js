const routes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  }, {
    path: '/',
    component: () => import('@/views/index.vue')
  }, {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/error/404.vue')
  }
]
export default routes
