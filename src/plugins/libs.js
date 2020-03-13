import Vue from 'vue'
import VueStorage from 'vue-ls'
import { VueAxios } from '@/utils/request'
import config from '@/config/index'

Vue.use(VueAxios)
Vue.use(VueStorage, config.storageOptions)
Vue.prototype.$config = config

window.document.title = config.title