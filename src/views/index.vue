<template>
  <div>
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
          <span style="color: red">{{ searchValue }}</span>
          {{ name.substr(name.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ name }}</span>
      </template>
    </a-tree>
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
      treeData: [],
      newTreeData: [],
      oldTreeData: [],
      expandedKeys: [],
      selectedKeys: [],
      videoList: []
    }
  },
  created () {
    getTree().then(res => {
      const { data } = res
      this.recursion(data)
      data[0].checkable = false
      data[0].selectable = false
      this.expandedKeys.push(data[0].id)
      data[0].children.forEach((item, index) => {
        // 展开第一级
        this.expandedKeys.push(item.id)
        if (item.children.length) {
          item.children.forEach((node, i) => {
            if (index === 0) {
              if (i < 4) {
                // 总包选中前四
                this.checkedKeys.push(node.id)
                this.selectedKeys.push(node.id)
              }
            } else {
              // 其他全部选中第一
              if (i === 0) {
                this.checkedKeys.push(node.id)
                this.selectedKeys.push(node.id)
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
    // 选择
    onSelect (selectedKeys, node) {
      // const keys = [...selectedKeys]
      // keys.unshift(keys.pop())
      // this.selectedKeys = keys
      this.selectedKeys = selectedKeys
      let selectedNodes = [...node.selectedNodes]
      selectedNodes.unshift(selectedNodes.pop())
      this.videoList = this.getCheckedVideo(selectedNodes)
      if (this.selectedKeys.length >= this.max) {
        // 选中的节点
        this.selectedKeys = selectedKeys.slice(0, this.max)
        // 选中的视频列表
        selectedNodes = selectedNodes.slice(0, this.max)
        this.videoList = this.getCheckedVideo(selectedNodes)
        this.$message.info(`最多只能选中${this.max}个`)
      }
      console.log(this.videoList)
    },
    // 获取选中的视频列表
    getCheckedVideo (data) {
      let arr = []
      data.forEach(item => {
        arr.push({
          name: item.data.props.name,
          key: item.key
        })
      })
      return arr
    },
    // 递归处理数据
    recursion (data) {
      data.forEach(item => {
        item.scopedSlots = { title: 'title' }
        if (item.children && item.children.length) {
          this.recursion(item.children)
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
      console.log(this.treeData)
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
