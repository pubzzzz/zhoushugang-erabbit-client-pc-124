<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span>{{time}}</span>, 超时后将取消订单</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{order.payMoney}}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type" v-if="order">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn" href="javascript:;">微信</a>
          <a class="btn" :href="`http://pcapi-xiaotuxian-front.itheima.net/pay/aliPay?orderId=${order.id}`" target="_blank">支付宝</a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: 'XtxPayPage',
  setup () {
    // 订单
    const order = ref(null)
    // 倒计时
    const downTime = ref(0)
    // 路由信息
    const route = useRoute()
    // 查询订单
    findOrder(route.query.id).then(data => {
      // 设置订单
      order.value = data.result
      // 算出倒计时时间单位秒，30分钟
      const nowTime = Date.now()
      const createTime = new Date(order.value.createTime).getTime()
      downTime.value = Math.ceil(1800 - (nowTime - createTime) / 1000)
    })
    // 倒计时文本
    const timer = setInterval(() => {
      downTime.value--
      if (downTime.value <= 0) clearInterval(timer)
    }, 1000)
    const time = computed(() => {
      if (order.value && downTime.value > 0) {
        const m = Math.floor(downTime.value / 60)
        const s = downTime.value % 60
        return `${m}分${s}秒`
      }
    })
    return { order, time }
  }
}
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
  }
}
</style>
