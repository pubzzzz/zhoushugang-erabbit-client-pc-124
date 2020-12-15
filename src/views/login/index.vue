<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a @click="activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
        <a @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
      </nav>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter
  },
  data () {
    return {
      // account 账户登录 qrcode 扫码登录
      activeName: 'account'
    }
  }
}
</script>

<style scoped lang='less'>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 380px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px,0,0);
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        text-align: center;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5
        }
        &:hover,&.active{
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
