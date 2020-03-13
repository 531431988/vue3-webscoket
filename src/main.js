import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/libs'
import '@/permission'
import '@babel/polyfill'
import '@/plugins/ant-design-vue'
import '@/WMlib.less'

if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
