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
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  setup () {
    const breadCategory = useBreadCategory()
    return { breadCategory }
  }
}
const useBreadCategory = () => {
  const store = useStore()
  const route = useRoute()
  return computed(() => {
    const { list } = store.state.category
    const breadCategory = {}
    list.forEach(item => {
      if (item.children) {
        item.children.forEach(sub => {
          console.log(route.params.id, sub.id)
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
.sub-category {}
</style>
