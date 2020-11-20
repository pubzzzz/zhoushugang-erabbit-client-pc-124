<template>
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
import AppFooter from '@/components/app-footer'
import { findAllCategory } from '@/api/category'
export default {
  name: 'XtxLayout',
  components: { AppTopnav, AppHeader, AppFooter },
  async created () {
    const data = await findAllCategory()
    console.log(data)
  }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 666px;
}
</style>
