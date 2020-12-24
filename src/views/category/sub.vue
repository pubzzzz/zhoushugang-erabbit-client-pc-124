<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-if="breadCategory.parent" :to="`/category/${breadCategory.parent.id}`">
          {{breadCategory.parent.name}}
        </XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="breadCategory.current.id" v-if="breadCategory.current">
            {{breadCategory.current.name}}
          </XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 筛选区 -->
      <Transition name="fade">
        <div v-if="!filterLoading" class="xtx-filter">
          <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
              <a @click="filterData.selectedBrand=val.id" :class="{active:filterData.selectedBrand===val.id}" href="javascript:;" v-for="val in filterData.brands" :key="val.id">{{val.name}}</a>
            </div>
          </div>
          <div class="item" v-for="attr in filterData.saleProperties" :key="attr.id">
            <div class="head">{{attr.name}}：</div>
            <div class="body">
              <a @click="attr.selected=val.id" :class="{active:attr.selected===val.id}" href="javascript:;" v-for="val in attr.properties" :key="val.id">{{val.name}}</a>
            </div>
          </div>
        </div>
        <div v-else class="xtx-filter">
          <XtxSkeleton class="item" width="800px" height="39px"  />
          <XtxSkeleton class="item" width="800px" height="39px"  />
          <XtxSkeleton class="item" width="600px" height="39px"  />
          <XtxSkeleton class="item" width="600px" height="39px"  />
          <XtxSkeleton class="item" width="600px" height="39px"  />
        </div>
      </Transition>
      <!-- 结果区域 -->
      <div class="goods-list">
        <GoodsListHead />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
import GoodsListHead from './components/goods-list-head'
export default {
  name: 'SubCategory',
  components: { GoodsListHead },
  setup () {
    const breadCategory = useBreadCategory()
    const { filterData, filterLoading } = useFilter()
    return { breadCategory, filterData, filterLoading }
  }
}
// 使用筛选区数据
const useFilter = () => {
  const filterData = ref(null)
  const filterLoading = ref(false)
  const route = useRoute()
  watch(() => route.params.id, async (newVal, oldVal) => {
    filterData.value = null
    filterLoading.value = true
    const { result } = await findSubCategoryFilter(newVal)
    result.selectedBrand = undefined
    result.brands.unshift({ id: undefined, name: '全部' })
    result.saleProperties.forEach(item => {
      item.selected = undefined
      item.properties.unshift({ id: undefined, name: '全部' })
    })
    filterData.value = result
    filterLoading.value = false
  }, {
    immediate: true
  })
  return { filterData, filterLoading }
}
// 使用面包屑数据
const useBreadCategory = () => {
  const store = useStore()
  const route = useRoute()
  return computed(() => {
    const { list } = store.state.category
    const breadCategory = {}
    list.forEach(item => {
      if (item.children) {
        item.children.forEach(sub => {
          if (route.params.id === sub.id) {
            breadCategory.current = sub
            breadCategory.parent = { id: item.id, name: item.name }
          }
        })
      }
    })
    return breadCategory
  })
}
</script>

<style scoped lang='less'>
.sub-category {
  // 筛选区
  .xtx-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      padding: 10px 0;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.goods-list {
  background: #fff;
  padding: 0 30px 30px;
  margin-top: 25px;
}
</style>
