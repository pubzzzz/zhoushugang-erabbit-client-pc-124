<template>
  <div class='goods-list-head'>
    <div class="sort">
      <a :class="{active:myFilters.sortField==='publishTime'}" href="javascript:;" @click="changeSort('publishTime')">最新商品</a>
      <a :class="{active:myFilters.sortField==='orderNum'}" href="javascript:;" @click="changeSort('orderNum')">最高人气</a>
      <a :class="{active:myFilters.sortField==='evaluateNum'}" href="javascript:;" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{active:myFilters.sortMethod==='asc'}" />
        <i class="arrow down"  :class="{active:myFilters.sortMethod==='desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="myFilters.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="myFilters.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListHead',
  data () {
    return {
      myFilters: {
        sortField: '',
        sortMethod: '',
        inventory: false,
        onlyDiscount: false
      }
    }
  },
  methods: {
    changeSort (field) {
      this.myFilters.sortField = field
      if (field === 'price') {
        if (this.sortMethod === '') {
          this.myFilters.sortMethod = 'desc'
        } else {
          this.myFilters.sortMethod = this.myFilters.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        this.myFilters.sortMethod = ''
      }
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list-head {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
