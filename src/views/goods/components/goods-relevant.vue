<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <div class="slider">
      <a href="javascript:;" v-for="i in 4" :key="i">
        <img src="https://yanxuan-item.nosdn.127.net/65be335760e2375432b4410adbd32b2f.png" alt="">
        <p class="name">者或定级般器离</p>
        <p class="price">&yen;100.00</p>
      </a>
    </div>
    <div class="pager">
      <span>1</span>
      <span class="active">2</span>
      <span>3</span>
      <span>4</span>
    </div>
  </div>
</template>

<script>
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant'
}
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  .slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a {
      width: 240px;
      text-align: center;
      img {
        padding: 20px;
      }
      .name {
        font-size: 16px;
        color: #666;
      }
      .price {
        font-size: 16px;
        color: @priceColor;
        margin-top: 10px;
      }
    }
  }
  .pager {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 50%;
      background: lighten(@xtxColor, 50%);
      color: @xtxColor;
      margin: 0 10px;
      &.active {
        background: @xtxColor;
        color: #fff;
      }
    }
  }
}
</style>
