<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <div class="unbind" v-if="isBind">
      <div class="loading"></div>
    </div>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import QC from 'qc'
import { qqLogin } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'LoginCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  data () {
    return {
      nickname: 'zhoushugang',
      avatar: 'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png',
      hasAccount: true,
      isBind: true
    }
  },
  computed: {
    ...mapState('user', ['returnUrl'])
  },
  methods: {
    ...mapMutations('user', ['setUser'])
  },
  created () {
    if (QC.Login.check()) {
      QC.Login.getMe(async (openId) => {
        try {
          // 已注册，已绑定
          const data = await qqLogin(openId)
          this.setUser(data.result)
          this.$router.push(this.returnUrl)
        } catch (e) {
          this.isBind = false
          // 未绑定
          QC.api('get_user_info').success(({ data }) => {
            this.avatar = data.figureurl_1
            this.nickname = data.nickname
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
