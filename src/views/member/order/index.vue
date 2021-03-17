<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @click-tab="clickTab">
      <XtxTabsPanel
        v-for="item in orderTabs"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        ></XtxTabsPanel
      >
    </XtxTabs>
    <div class="order-list" v-if="orderList">
      <div class="none" v-if="orderList.length === 0">没有查询到订单</div>
      <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <div v-else class="loading"></div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { findOrderAll } from '@/api/order'
import OrderItem from './components/order-item'
export default {
  name: 'MemberOrder',
  components: { OrderItem },
  setup () {
    const activeName = ref('all')
    const orderTabs = [
      { name: 'all', label: '全部订单' },
      { name: 'unpay', label: '待付款' },
      { name: 'deliver', label: '待发货' },
      { name: 'receive', label: '待收货' },
      { name: 'comment', label: '待评价' },
      { name: 'complete', label: '已完成' },
      { name: 'cancel', label: '已取消' }
    ]
    // 切换状态
    const clickTab = ({ index }) => {
      reqParams.orderState = index
      reqParams.page = 1
    }
    // 查询订单参数
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 初始化后，查询条件更改后，查询。
    watch(reqParams, () => {
      orderList.value = null
      findOrderAll(reqParams).then(data => {
        orderList.value = data.result.items
      })
    }, { immediate: true })

    return { activeName, clickTab, orderTabs, orderList }
  }
}
</script>
<style scoped lang="less">
.order-list {
  padding: 20px;
}
.loading {
  height: 400px;
  background: url(../../../assets/images/loading.gif) no-repeat center ;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
