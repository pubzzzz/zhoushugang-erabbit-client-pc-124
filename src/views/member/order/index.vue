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
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        @order-cancel="orderCancel(item)"
        @order-delete="orderDelete(item)"
        @order-confirm="orderConfirm(item)"
        @order-logistics="orderLogistics(item)"
        v-for="item in orderList"
        :key="item.id" :order="item"
      />
    </div>
    <XtxPagination
      v-if="total > reqParams.pageSize"
      @current-change="reqParams.page=$event"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"  />
    <Teleport to="#model">
      <OrderCancel ref="orderCancelCom" />
    </Teleport>
    <Teleport to="#model">
      <OrderLogistics ref="orderLogisticsCom" />
    </Teleport>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { findOrderAll, orderDelete as orderDeleteApi, orderConfirm as orderConfirmApi } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import OrderLogistics from './components/order-logistics'
import Confirm from '@/components/library/confirm'
import Message from '@/components/library/message'
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
  setup () {
    // 查询订单参数
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })

    return {
      reqParams,
      ...useOrderTab(reqParams),
      ...useOrderList(reqParams),
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    }
  }
}
// 标签页业务
const useOrderTab = (reqParams) => {
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
  return { activeName, orderTabs, clickTab }
}
// 订单列表业务
const useOrderList = (reqParams) => {
  const orderList = ref([])
  const total = ref(0)
  const loading = ref(true)
  // 初始化后，查询条件更改后，查询。
  const findOrderList = () => {
    loading.value = true
    findOrderAll(reqParams).then(data => {
      orderList.value = data.result.items
      total.value = data.result.counts
      loading.value = false
    })
  }
  watch(reqParams, () => {
    findOrderList()
  }, { immediate: true })
  // 删除逻辑
  const app = getCurrentInstance()
  const orderDelete = (item) => {
    Confirm(app, { text: '您确认删除订单吗？' }).then(async () => {
      await orderDeleteApi([item.id])
      Message(app, { text: '删除订单成功', type: 'success' })
      findOrderList()
    }).catch(e => {})
  }
  return { orderList, total, loading, orderDelete }
}
// 取消订单业务
export const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const orderCancel = (item) => {
    orderCancelCom.value.open(item)
  }
  return { orderCancelCom, orderCancel }
}
// 确认发货业务
export const useConfirmOrder = () => {
  const app = getCurrentInstance()
  const orderConfirm = (item) => {
    Confirm(app, { text: '您确认已经收到货了吗？' }).then(async () => {
      await orderConfirmApi(item.id)
      Message(app, { text: '确认收货成功', type: 'success' })
      item.orderState = 4
    }).catch(e => {})
  }
  return { orderConfirm }
}
// 查看物流业务
export const useLogisticsOrder = () => {
  const orderLogisticsCom = ref(null)
  const orderLogistics = (item) => {
    orderLogisticsCom.value.open(item.id)
  }
  return { orderLogisticsCom, orderLogistics }
}
</script>
<style scoped lang="less">
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
