import Vue from 'vue'
import style from './style'

Object.keys(style).forEach(key => {
  Vue.directive(key, style[key])
})
