<template>
  <div class="member-home">
    <HomeOverview />
    <HomePanel title="收藏的商品"  />
    <HomePanel title="我的足迹" />
    <GoodsRelevant title="猜你喜欢" />
  </div>
</template>
<script>
import HomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant
  },
  setup () {
  }
}
</script>
<style scoped lang="less"></style>
