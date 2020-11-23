<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId=item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{sub.name}}</RouterLink>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currCategory && currCategory.id!=='brand'">分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.goods && currCategory.goods.length">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCategory',
  data () {
    return {
      categoryId: null
    }
  },
  computed: {
    currCategory () {
      return this.menuList.find(item => item.id === this.categoryId)
    },
    menuList () {
      const category = this.$store.state.category.list.map(item => {
        const sub = item.children && item.children.slice(0, 2)
        return {
          id: item.id,
          name: item.name,
          children: sub,
          goods: item.goods
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
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            img {
              width: 95px;
              height: 95px;
            }
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
