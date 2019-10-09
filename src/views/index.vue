<template>
  <div>1</div>
</template>

<script>
export default {
  components: {
  },
  created () {
    this.$get('del').then(res => {
      console.log('del',res)
    })
  },

}
</script>
<style lang="less" scoped>
</style>
