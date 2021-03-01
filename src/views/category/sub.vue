<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @change="filterChange" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <GoodsSort @change="sortChange"/>
        <!-- 列表 -->
        <ul>
          <li v-for="item in list" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading v-model:loading="loading" v-model:finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import GoodsSort from './components/goods-sort'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/category'
import { ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, GoodsSort, GoodsItem },
  setup () {
    // 获取vue实例
    const { proxy: that } = getCurrentInstance()
    // 获取路由信息
    const route = useRoute()
    // 数据列表
    const list = ref([])
    // 是否加载中
    const loading = ref(false)
    // 是否加载完
    const finished = ref(false)
    // 查询参数
    that.params = {
      page: 1,
      pageSize: 15
    }
    // 获取数据
    const getData = async () => {
      loading.value = true
      await that.$sleep()
      that.params.categoryId = route.params.id
      const data = await findSubCategoryGoods(that.params)
      list.value.push(...data.result.items)
      loading.value = false
      if (data.result.items.length === 0) {
        finished.value = true
      } else {
        that.params.page++
      }
    }
    // 筛选改变
    const filterChange = (filterParams) => {
      that.params = { ...that.params, ...filterParams }
      that.params.page = 1
      list.value = []
      finished.value = false
    }
    // 排序改变
    const sortChange = (sortParams) => {
      that.params = { ...that.params, ...sortParams }
      that.params.page = 1
      list.value = []
      finished.value = false
    }
    return { getData, list, loading, finished, filterChange, sortChange }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
