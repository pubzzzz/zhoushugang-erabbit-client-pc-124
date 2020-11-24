<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="index=i" v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  watch: {
    sliders (newVal, oldVal) {
      if (newVal.length) {
        // 开启自动轮播
        this.autoPlay && this.autoPlayHandler()
      }
    }
  },
  data () {
    return {
      index: 0
    }
  },
  // vue3.0 的钩子，销毁时候执行
  beforeUnmount () {
    if (this.timer) window.clearInterval(this.timer)
  },
  methods: {
    autoPlayHandler () {
      if (this.timer) window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        if ((this.index + 1) > (this.sliders.length - 1)) {
          this.index = 0
        } else {
          this.index++
        }
      }, this.duration)
    },
    toggle (step) {
      if ((this.index + step) < 0) {
        this.index = this.sliders.length - 1
        return
      }
      if ((this.index + step) > (this.sliders.length - 1)) {
        this.index = 0
        return
      }
      this.index += step
    },
    stop () {
      if (this.timer) window.clearInterval(this.timer)
    },
    start () {
      this.autoPlay && this.sliders.length && this.autoPlayHandler()
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      text-align: center;
      line-height: 44px;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
}
</style>
