<template>
  <Transition name="down">
    <div class='xtx-message' :style="style" v-show="show">
      <i class="iconfont" :class="[style.icon]"></i>
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'XtxMessage',
  props: {
    type: {
      type: String,
      default: 'warning'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      if (this.type === 'success') {
        return {
          icon: 'icon-queren2',
          color: '#67C23A',
          backgroundColor: 'rgb(240, 249, 235)',
          borderColor: 'rgb(225, 243, 216)'
        }
      }
      if (this.type === 'error') {
        return {
          icon: 'icon-shanchu',
          color: '#F56C6C',
          backgroundColor: 'rgb(254, 240, 240)',
          borderColor: 'rgb(253, 226, 226)'
        }
      }
      return {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      }
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style scoped lang='less'>
.down {
  &-enter {
    &-from {
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
