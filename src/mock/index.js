import Mock from 'mockjs'
Mock.mock(/\/del$/, {
  code: 200,
  data: [1, 2, 3],
  msg: '请求成功'
})
