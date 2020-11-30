<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template v-slot:right><XtxMore /></template>
    <div ref="box" style="position: relative;height: 406px;">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    const { container, data } = useLazyData(findNew)
    return { goods: data, box: container }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
