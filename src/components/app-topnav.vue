<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登录后展示 -->
        <template v-if="profile.token">
          <li><RouterLink to="/member"><i class="iconfont icon-user"></i>{{profile.nickname}}</RouterLink></li>
          <li><a href="javascript:" @click="logout()">退出登录</a></li>
        </template>
        <!-- 未登录展示 -->
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="#">免费注册</a></li>
        </template>
        <li><a href="#">我的订单</a></li>
        <li><a href="#">会员中心</a></li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">关于我们</a></li>
        <li><a href="#"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'AppTopnav',
  computed: {
    ...mapState('user', ['profile'])
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    logout () {
      this.setUser({})
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.app-topnav{
  background: #333;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;
    li {
      a {
        color: #dcdcdc;
        padding: 0 15px;
        line-height: 1;
        font-size: 14px;
        display: inline-block;
        &:hover {
          color: @xtxColor;
        }
        i {
          font-size: 14px;
          margin-right: 3px;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
