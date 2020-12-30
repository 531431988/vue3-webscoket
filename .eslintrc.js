module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/no-v-model-argument': 'off',
    'generator-star-spacing': 'off',
    'quote-props': [0, 'always'],
    'quotes': [2, 'single', 'avoid-escape'],
    'no-mixed-operators': 'off',
    'template-curly-spacing': 'off',
    'no-unreachable': 'off',
    'camelcase': 'off',
    'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 2 }],
    'no-irregular-whitespace': 'off',
    indent: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
