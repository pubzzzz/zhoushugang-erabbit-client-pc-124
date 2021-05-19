<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont" :class="[orderStateAndIcon[order.orderState].icon]"></span>
      <p>{{ orderStateAndIcon[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <XtxButton @click="$router.push('/member/pay?id='+order.id)" type="primary" size="small">立即付款</XtxButton>
        <XtxButton @click="orderCancel(order)" type="gray" size="small">取消订单</XtxButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <XtxButton @click="$router.push(`/member/checkout?id=${order.id}`)"  type="primary" size="small">再次购买</XtxButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <XtxButton @click="orderConfirm(order)" type="primary" size="small">确认收货</XtxButton>
        <XtxButton @click="$router.push(`/member/checkout?id=${order.id}`)"  type="plain" size="small">再次购买</XtxButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <XtxButton @click="$router.push(`/member/checkout?id=${order.id}`)"  type="primary" size="small">再次购买</XtxButton>
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <XtxButton  @click="$router.push(`/member/checkout?id=${order.id}`)"  type="primary" size="small">再次购买</XtxButton>
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
  <Teleport to="#model">
    <OrderCancel ref="orderCancelCom" />
  </Teleport>
</template>
<script>
import OrderCancel from './order-cancel'
import { useCancelOrder, useConfirmOrder } from '../index'
export default {
  name: 'OrderDetailPage',
  components: { OrderCancel },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    // 状态和图标字典
    const orderStateAndIcon = {
      1: { label: '待付款', icon: 'icon-order-unpay' },
      2: { label: '待发货', icon: 'icon-order-deliver' },
      3: { label: '待收货', icon: 'icon-order-receive' },
      4: { label: '待评价', icon: 'icon-order-comment' },
      5: { label: '已完成', icon: 'icon-order-complete' },
      6: { label: '已取消', icon: 'icon-order-cancel' }
    }
    return { orderStateAndIcon, ...useCancelOrder(), ...useConfirmOrder() }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
