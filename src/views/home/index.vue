<template>
  <div class='xtx-home-page'>
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
export default {
  name: 'xtx-home-page',
  components: { HomeCategory, HomeBanner, HomeNew }
}
</script>

<style scoped lang='less'>
.home-entry {
  .container {
    height: 500px;
    position: relative;
  }
}
</style>
