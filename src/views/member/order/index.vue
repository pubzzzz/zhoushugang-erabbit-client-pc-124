<template>
  <div class="member-order-page">
    <XtxTabs>
      <XtxTabsPanel label="全部订单">全部订单</XtxTabsPanel>
      <XtxTabsPanel label="待付款">待付款</XtxTabsPanel>
      <XtxTabsPanel label="待发货">待发货</XtxTabsPanel>
      <XtxTabsPanel label="待收货">待收货</XtxTabsPanel>
      <XtxTabsPanel label="待评价">待评价</XtxTabsPanel>
      <XtxTabsPanel label="已取消">已取消</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>
<script>
export default {
  name: 'MemberOrder'
}
</script>
<style scoped lang="less"></style>
