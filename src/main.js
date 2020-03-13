import Vue from 'vue'
import VueStorage from 'vue-ls'
import App from './App.vue'
import { VueAxios } from './utils/request'
import config from '@/config/index'
import router from './router'
import store from './store'
import './permission'
import '@babel/polyfill'
import './plugins/ant-design-vue'
import './WMlib.less'

if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(VueStorage, config.storageOptions)

Vue.prototype.$config = config
window.document.title = config.title
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
