<template>
  <div class="xtx-tabs-panel">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="less">
.xtx-tabs-panel {

}
</style>
