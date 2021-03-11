<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggleCollapse">
      <span class="ellipsis">{{text}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="collapse">
      <GoodsSku v-if="goods" :goods="goods" :skuId="skuId" @change="changeSku" />
      <XtxButton v-if="goods" size="mini" type="primary" @click="submit()">确认</XtxButton>
      <div v-else class="loading" ></div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { findGoodsSkus } from '@/api/goods'
import GoodsSku from '@/views/goods/components/goods-sku'
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    skuId: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  },
  setup (props, { emit }) {
    const collapse = ref(false)
    const goods = ref(null)
    // 切换展开收起
    const open = () => {
      collapse.value = true
      findGoodsSkus(props.skuId).then(data => {
        goods.value = data.result
      })
    }
    const close = () => {
      collapse.value = false
      goods.value = null
    }
    const toggleCollapse = () => {
      collapse.value ? close() : open()
    }
    // 点击其他地方，收起
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })
    // 选择sku触发事件
    const changedSku = ref(null)
    const changeSku = (sku) => {
      changedSku.value = sku
    }
    // 确认事件
    const submit = () => {
      close()
      if (changedSku.value && changedSku.value.skuId && changedSku.value.skuId !== props.skuId) {
        // 选择了一个有效的skuId且和默认的不一致，才去更新
        emit('change', changedSku.value)
      }
    }
    return { collapse, toggleCollapse, target, goods, changeSku, submit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 242px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
.goods-sku {
  font-size: 14px;
  padding-left: 20px;
}
.xtx-button {
  margin-left: 70px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
