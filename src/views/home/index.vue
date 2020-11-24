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
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'xtx-home-page',
  components: { HomeCategory, HomeBanner }
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
