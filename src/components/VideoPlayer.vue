<template>
  <video-player
    class="vjs-custom-skin"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
  ></video-player>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
export default {
  props: {
    src: {
      type: String,
      // default: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc' // 香港财经
      default: 'rtmp://58.200.131.2:1935/livetv/hunantv' // 湖南卫视
    }
  },
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        sources: [{
          type: 'rtmp/flv',
          src: this.src
        }],
        techOrder: ['flash'],
        autoplay: true, // 自动播放
        controls: true,
        fluid: true,
        preload: 'auto',
        aspectRatio: '16:9'
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
