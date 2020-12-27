<template>
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
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
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
export default {
  name: 'SubBread',
  setup () {
    const breadCategory = useBreadCategory()
    return { breadCategory }
  }
}
</script>

<style scoped lang='less'></style>
