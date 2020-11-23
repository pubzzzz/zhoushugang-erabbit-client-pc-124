<template>
  <div class='xtx-home-page'>
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  name: 'xtx-home-page',
  components: { HomeCategory }
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
