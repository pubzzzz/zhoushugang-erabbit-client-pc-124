<template>
  <div class='top-category'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="currCategory.id">{{currCategory.name}}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in currCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subCategoryList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">柔软细腻，融水即化无残余</p>
          <XtxMore :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { mapState } from 'vuex'
import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  data () {
    return {
      sliders: [],
      subCategoryList: []
    }
  },
  computed: {
    ...mapState('category', ['list']),
    currCategory () {
      let currCategory = {}
      if (this.list && this.list.length) {
        currCategory = this.list.find(item => item.id === this.$route.params.id) || {}
      }
      console.log(currCategory)
      return currCategory
    }
  },
  async created () {
    const data = await findBanner()
    this.sliders = data.result
  },
  watch: {
    '$route.params.id': {
      handler (now) {
        now && this.loadData()
      },
      immediate: true
    }
  },
  methods: {
    async loadData () {
      const data = await findTopCategory(this.$route.params.id)
      this.subCategoryList = data.result.children
    }
  }
}
</script>

<style scoped lang='less'>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
}
</style>
