
import { axios } from '@/libs/request'

// 直播 树 列表
const getLiveTree = () => {
  return axios({
    url: '/get-tree',
    method: 'post'
  })
}

// 直接视频
const getLiveUrl = id => {
  return axios({
    url: `/hikserver/tvHikvision/getPreviewURLs?cameraIndexCode=${id}`,
    method: 'get'
  })
}

export {
  getLiveTree,
  getLiveUrl
}
