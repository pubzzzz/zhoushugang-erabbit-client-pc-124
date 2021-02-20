<template>
  <p class="g-name">{{goods.name}}</p>
  <p class="g-desc">{{goods.desc}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
    <span>{{goods.oldPrice}}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至 <XtxCity @change="changeCity" :provinceCode="provinceCode" :cityCode="cityCode" :countyCode="countyCode" /></dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodName',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    // 默认配送北京市-市辖区-东城区
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    // 根据商品详情数据设置配送地址
    if (props.goods.userAddresses) {
      const defaultAddress = props.goods.userAddresses.find(item => item.isDefault)
      if (defaultAddress) {
        provinceCode.value = defaultAddress.provinceCode
        cityCode.value = defaultAddress.cityCode
        countyCode.value = defaultAddress.countyCode
      }
    }
    // 接收城市组件选择后的传值
    const changeCity = (data) => {
      provinceCode.value = data.provinceCode
      cityCode.value = data.cityCode
      countyCode.value = data.countyCode
    }
    return { provinceCode, cityCode, countyCode, changeCity }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
