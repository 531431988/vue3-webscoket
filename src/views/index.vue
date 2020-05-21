<template>
  <div class="pd15">
    <a-row>
      <a-col :span="6">
        <a-input-search
          v-model="searchValue"
          style="margin-bottom: 8px"
          placeholder="Search"
          allowClear
          @change="onChange"
        />
        <a-tree
          selectable
          multiple
          v-model="checkedKeys"
          :expandedKeys="expandedKeys"
          :selectedKeys="selectedKeys"
          :replaceFields="{
        title: 'name',
        children: 'children',
        key: 'id'
      }"
          :tree-data="treeData"
          @select="onSelect"
        >
          <a-icon type="caret-down" slot="switcherIcon" />
          <template #title="{name}">
            <span v-if="name.indexOf(searchValue) > -1">
              {{ name.substr(0, name.indexOf(searchValue)) }}
              <span
                style="color: red"
              >{{ searchValue }}</span>
              {{ name.substr(name.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ name }}</span>
          </template>
        </a-tree>
      </a-col>
      <a-col :span="18">
        <a-row class="pl15" :gutter="30">
          <a-col :span="8" v-for="(item, index) in videoList" :key="index">
            <a-card class="mb15" :title="item.name" :bodyStyle="{padding: 0}">
              <VideoPlayer v-if="item.src" :src="item.src" />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { VideoPlayer } from '@/components'
import { getLiveTree, getLiveUrl } from '@/api'
export default {
  props: {
    max: {
      type: Number,
      default: 9
    }
  },
  components: {
    VideoPlayer
  },
  data () {
    return {
      searchValue: '',
      checkedKeys: [],
      expandedKeys: [],
      selectedKeys: [],
      treeData: [],
      newTreeData: [],
      oldTreeData: [],
      videoList: []

    }
  },
  created () {
    getLiveTree().then(res => {
      const { data } = res
      this.recursionData(data, (item, index) => {
        if (item.id === '99') {
          item.selectable = false
        }
        if (item.children && item.id !== '99') {
          item.selectable = false
          item.children.forEach((node, i) => {
            if (index === 0) {
              if (i < 4) {
                // 总包选中前四
                this.checkedKeys.push(node.id)
                this.selectedKeys.push(node.id)
                this.videoList.push({
                  id: node.id,
                  name: node.name
                })
              }
            } else {
              // 其他全部选中第一
              if (i === 0) {
                this.checkedKeys.push(node.id)
                this.selectedKeys.push(node.id)
                this.videoList.push({
                  id: node.id,
                  name: node.name
                })
              }
            }
          })
        }
      })
      this.treeData = data
      this.oldTreeData = data
      this.getVideoUrl()
    })
  },
  methods: {
    // 获取视频地址
    async getVideoUrl () {
      for (let index = 0; index < this.videoList.length; index++) {
        const item = this.videoList[index]
        const { status, data } = await getLiveUrl(item.id)
        if (status === 200) {
          item.src = data
          this.videoList.splice(index, 1, item)
        }
      }
      console.log(this.videoList)
    },
    // 选择节点
    onSelect (selectedKeys, { node, nativeEvent, selected }) {
      let { videoList } = this
      this.selectedKeys = selectedKeys
      if (this.selectedKeys.length >= this.max) {
        // 选中的节点
        this.selectedKeys = selectedKeys.slice(0, this.max)
        this.$message.info(`最多只能选中${this.max}个`)
      }
      // 选中的视频列表
      if (selected) {
        // 如果大于9个取前9
        if (videoList.length >= this.max) {
          videoList = videoList.slice(0, this.max)
        } else {
          // 否则追加
          videoList.push({
            name: nativeEvent.target.innerText,
            id: node.eventKey
          })
          videoList.unshift(videoList.pop())
        }
      } else {
        videoList = videoList.filter(item => item.id !== node.eventKey)
      }
      this.videoList = videoList
    },
    // 获取选中的数据列表
    getCheckedVideo (data = []) {
      let arr = []
      data.forEach(item => {
        arr.push({
          name: item.data.props.name,
          id: item.key
        })
      })
      return arr
    },
    // 递归处理数据
    recursionData (data, callback) {
      data.forEach((item, index) => {
        // 添加slot自定义节点
        item.scopedSlots = { title: 'title' }
        // 展开所有
        this.expandedKeys.push(item.id)
        callback && callback(item, index)
        if (item.children && item.children.length) {
          this.recursionData(item.children, callback)
        }
      })
    },
    // 搜索
    onChange (e) {
      const value = e.target.value
      this.newTreeData = []
      if (value) {
        this.filterTree(this.oldTreeData, value)
        this.treeData = [...this.newTreeData]
      } else {
        this.treeData = [...this.oldTreeData]
      }
    },
    // 过滤tree
    filterTree (data, name) {
      for (var i in data) {
        // 过滤关键字
        if (data[i].name.indexOf(name) !== -1) {
          this.newTreeData.push(data[i])
        } else {
          // 递归
          this.filterTree(data[i].children, name)
        }
      }
    }
  }

}
</script>
<style lang="less" scoped>
#video {
  width: 300px;
  height: 500px;
}
</style>
