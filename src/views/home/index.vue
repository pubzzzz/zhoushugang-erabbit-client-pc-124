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
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand style="background:#f5f5f5" />
    <!-- 商品区域 -->
    <HomeProduct />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
export default {
  name: 'xtx-home-page',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct }
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
