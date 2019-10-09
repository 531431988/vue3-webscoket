const $import = name => () => import(`@/views/${name}.vue`)
export default [
  {
    path: '/',
    component: $import('index')
  }
]
