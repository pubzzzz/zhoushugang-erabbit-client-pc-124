<template>
<Transition name="fade">
  <div v-if="!filterLoading" class="sub-filter">
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
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="39px"  />
    <XtxSkeleton class="item" width="800px" height="39px"  />
    <XtxSkeleton class="item" width="600px" height="39px"  />
    <XtxSkeleton class="item" width="600px" height="39px"  />
    <XtxSkeleton class="item" width="600px" height="39px"  />
  </div>
</Transition>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
// 使用筛选区数据
const useFilter = () => {
  const filterData = ref(null)
  const filterLoading = ref(false)
  const route = useRoute()
  watch(() => route.params.id, async (newVal, oldVal) => {
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
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const { filterData, filterLoading } = useFilter()
    watch(filterData, () => {
      const attrs = []
      filterData.value.saleProperties.forEach(item => {
        const selectedValue = item.properties.find(p => p.id === item.selected)
        if (selectedValue.name !== '全部') {
          attrs.push(
            {
              groupName: item.name,
              propertyName: selectedValue.name
            }
          )
        }
      })
      emit('change', { brandId: filterData.value.selectedBrand, attrs: attrs.length ? attrs : undefined })
    }, { deep: true })
    return { filterData, filterLoading }
  }
}
</script>

<style scoped lang='less'>
// 筛选区
.sub-filter {
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
</style>
