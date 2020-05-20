<template>
  <div class="pd15">
    <a-row>
      <a-col :span="6">
        <a-input-search
          v-model="searchValue"
          style="margin-bottom: 8px"
          placeholder="Search"
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
          @expand="(keys) => expandedKeys = keys"
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
            <a-card class="mb15" :title="item.name"></a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getTree } from '@/api'
export default {
  props: {
    max: {
      type: Number,
      default: 9
    }
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
    getTree().then(res => {
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
    })
  },
  methods: {
    // 选择节点
    onSelect (selectedKeys, node) {
      // const keys = [...selectedKeys]
      // keys.unshift(keys.pop())
      // this.selectedKeys = keys
      this.selectedKeys = selectedKeys
      let selectedNodes = [...node.selectedNodes]
      if (this.selectedKeys.length >= this.max) {
        // 选中的节点
        this.selectedKeys = selectedKeys.slice(0, this.max)
        // 选中的视频列表
        selectedNodes = selectedNodes.slice(0, this.max)
        this.videoList = this.getCheckedVideo(selectedNodes)
        this.$message.info(`最多只能选中${this.max}个`)
      }
      if (node.selected) {
        selectedNodes.unshift(selectedNodes.pop())
      }
      this.videoList = this.getCheckedVideo(selectedNodes)
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
</style>
