<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!selectedAddress.id" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="selectedAddress.id">
        <li><span>收<i/>货<i/>人：</span>{{selectedAddress.name}}</li>
        <li><span>联系方式：</span>{{selectedAddress.mobile}}</li>
        <li><span>收货地址：</span>{{selectedAddress.address}}</li>
      </ul>
      <a v-if="selectedAddress.id" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="dialogVisible=true" class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
      对话框内容
      <template v-slot:footer>
        <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="dialogVisible=false" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'CheckoutAddress',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 得到默认选中地址
    const selectedAddress = computed(() => {
      if (props.list.length === 0) return {}
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) return defaultAddress
      else return props.list[0]
    })
    // 对话框显示隐藏
    const dialogVisible = ref(false)
    return { selectedAddress, dialogVisible }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
