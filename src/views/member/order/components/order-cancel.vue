<template>
    <XtxDialog v-model:visible="visibleDialog" title="取消订单">
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            @click="curText = item"
            v-for="item in cancelReason"
            :key="item"
            href="javascript:;"
            :class="{ active: curText === item }"
          >
            {{ item }}
          </a>
        </div>
      </div>
      <template #footer>
        <XtxButton type="gray" @click="visibleDialog=false" style="margin-right:20px">取消</XtxButton>
        <XtxButton type="primary" @click="submit">确认</XtxButton>
      </template>
    </XtxDialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { cancelReason } from '@/api/constants'
import { orderCancel } from '@/api/order'
import Message from '@/components/library/message'

export default {
  name: 'OrderCancel',
  emits: ['success'],
  setup (props, { emit }) {
    // 对话框显示隐藏
    const visibleDialog = ref(false)
    // 订单ID
    const selfOrder = ref(null)
    // 打开对话框
    const open = (order) => {
      visibleDialog.value = true
      curText.value = ''
      selfOrder.value = order
    }
    // 选中的取消订单原因
    const curText = ref('')
    // 确认
    const app = getCurrentInstance()
    const submit = async () => {
      if (!curText.value) return Message(app, { text: '请选择取消原因' })
      // 取消订单请求
      await orderCancel(selfOrder.value.id, curText.value)
      selfOrder.value.orderState = 6
      visibleDialog.value = false
    }
    return { visibleDialog, open, cancelReason, curText, submit }
  }
}
</script>
<style scoped lang="less">
 .xtx-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
