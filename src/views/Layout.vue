<template>
  <AppHeaderSticky />
  <AppTopnav/>
  <AppHeader/>
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'
export default {
  name: 'XtxLayout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  created () {
    this.$store.dispatch('category/getCategory')
  }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 666px;
}
</style>
