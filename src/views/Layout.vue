<template>
  <AppTopnav/>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
export default {
  name: 'XtxLayout',
  components: { AppTopnav }
}
</script>

<style scoped lang='less'></style>
