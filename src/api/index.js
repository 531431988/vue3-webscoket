
import { axios } from '@/libs/request'

const getTree = () => {
  return axios({
    url: '/get-tree',
    method: 'post'
  })
}

export {
  getTree
}
