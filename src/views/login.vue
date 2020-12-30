<template>
  <div>
    <input v-model="username" />
    {{username}}
    <button @click="onLogin">进入聊天室</button>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const username = ref('')
    const router = useRouter()
    onMounted(() => {
      username.value = localStorage.getItem('username')
      if (username.value) {
        router.push('/')
      }
    })
    return {
      username,
      onLogin: () => {
        const leg = 6
        const value = username.value.trim()
        if (value.length < leg) {
          alert(`用户名不能小于${leg}位`)
          return
        }
        localStorage.setItem('username', value)
        username.value = ''
        router.push('/')
      }
    }
  }
}
</script>
