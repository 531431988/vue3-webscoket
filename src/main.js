import Vue from 'vue'
import router from './router'
import App from './App.vue'
import api from '@/api/index'
import '@babel/polyfill'
import './plugins/ant-design-vue'
import './WMlib.less'
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = true
Vue.prototype.$get = api.$get
Vue.prototype.$post = api.$post
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
