<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条-->
    <DetailSteps :order="order" />
    <!-- 物流栏 -->
    <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order" />
    <!-- 订单商品信息 -->
    <DetailInfo :order="order" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics'
import DetailInfo from './components/detail-info'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailSteps, DetailLogistics, DetailInfo },
  setup () {
    // 获取订单详情
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
