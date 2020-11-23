<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{sub.name}}</RouterLink>
        </template>
      </li>
    </ul>
    <div class="layer"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeCategory',
  computed: {
    menuList () {
      const category = this.$store.state.category.list.map(item => {
        const sub = item.children && item.children.slice(0, 2)
        return {
          id: item.id,
          name: item.name,
          children: sub
        }
      })
      const brand = {
        id: 'brand',
        name: '品牌',
        children: [{ id: 'brand-create', name: '品牌制造' }]
      }
      return [...category, brand]
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
