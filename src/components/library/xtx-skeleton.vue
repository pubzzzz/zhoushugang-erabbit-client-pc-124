<template>
  <div class="xtx-skeleton" :class="{ shan: animated }">
    <div class="block"></div>
  </div>
</template>

<script>
export default {
  name: 'XtxSkeleton',
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '16px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang='less' vars={bg,width,height}>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  width: var(--width);
  height: var(--height);
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
