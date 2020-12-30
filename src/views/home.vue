<template>
  <div>
    <ul>
      <li v-for="(item, index) of msgList" :key="index">
        <p>{{item.user}} {{new Date(item.dateTime)}}</p>
        <p>{{item.message}}</p>
      </li>
    </ul>
    <textarea v-model="message" placeholder="请输入消息"></textarea>
    <button @click="onSendMessage">发送消息</button>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const state = reactive({
      message: '',
      msgList: []
    })
    const router = useRouter()
    let username = ''
    onMounted(() => {
      username = localStorage.getItem('username')
      if (!username) {
        router.push('/login')
        return
      }
    })
    const onSendMessage = () => {
      const { message } = state
      if (!message.trim().length) return
      state.msgList.push({
        id: new Date().getTime(),
        user: username,
        dateTime: new Date().getTime(),
        message: state.message
      })
      state.message = ''
    }
    return {
      ...toRefs(state),
      onSendMessage
    }
  }
}
</script>

<style lang="less" scoped>
</style>
