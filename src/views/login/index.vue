<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a @click="activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
        <a @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
      </nav>
      <div class="account-box" v-if="activeName==='account'">
        <div class="toggle">
          <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
            <i class="iconfont icon-user"></i> 使用账号登录
          </a>
          <a @click="isMsgLogin=true" href="javascript:;" v-else>
            <i class="iconfont icon-msg"></i> 使用短信登录
          </a>
        </div>
        <Form ref="form" class="form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
            </div>
            <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
          </div>
          <div class="form-item" v-if="!isMsgLogin">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
            </div>
            <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
          </div>
          <div class="form-item" v-else>
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field :class="{error:errors.code}" v-model="form.code" name="code" type="password" placeholder="请输入验证码" />
              <span @click="send()" class="code">
                {{duration===0?'发送验证码':`${duration}秒后发送`}}
              </span>
            </div>
            <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
          </div>
          <div class="form-item">
            <div class="agree">
              <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"/>
              <span>我已同意</span>
              <a href="javascript:;">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:;">《服务条款》</a>
            </div>
            <div class="error" v-if="errors.isAgree"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
          </div>
          <a @click="submit()" href="javascript:;" class="btn">登 录</a>
        </Form>
        <div class="action">
          <a :href="'https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri='+qqUrl">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
          </a>
          <div class="url">
            <a href="javascript:;">忘记密码</a>
            <a href="javascript:;">免费注册</a>
          </div>
        </div>
      </div>
      <div class="qrcode-box" v-if="activeName==='qrcode'">
        <img src="@/assets/images/qrcode.jpg" alt="">
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import { accountLogin, mobileLoginCode, mobileLogin } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    Form,
    Field
  },
  data () {
    const { isAgree, mobile, password, code } = veeSchema
    return {
      // account 账户登录 qrcode 扫码登录
      activeName: 'account',
      // 是否短信登录
      isMsgLogin: false,
      // 表单信息
      form: {
        isAgree: true,
        mobile: '',
        password: '',
        code: ''
      },
      // 校验规则
      schema: { isAgree, mobile, password, code },
      // 倒计时
      duration: 0,
      qqUrl: encodeURIComponent(process.env.VUE_APP_QQBACK)
    }
  },
  watch: {
    // 切换时候，重置校验和数据
    isMsgLogin () {
      this.form = {
        isAgree: true,
        mobile: '',
        password: '',
        code: ''
      }
      this.$refs.form.resetForm()
    }
  },
  unmounted () {
    clearInterval(this.timer)
  },
  methods: {
    async send () {
      const valid = this.schema.mobile(this.form.mobile)
      if (valid === true) {
        if (this.duration > 0) return
        await mobileLoginCode(this.form.mobile)
        this.duration = 60
        clearInterval(this.timer)
        this.timer = window.setInterval(() => {
          this.duration--
          if (this.duration === 0) clearInterval(this.timer)
        }, 1000)
      } else {
        this.$refs.form.setFieldError('mobile', valid)
      }
    },
    async submit () {
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          if (this.isMsgLogin) {
          // 短信登录
            const { mobile, code } = this.form
            const data = await mobileLogin(mobile, code)
            this.setUser(data.result)
          } else {
          // 账户登录
            const { mobile, password } = this.form
            const data = await accountLogin({ account: mobile, password })
            this.setUser(data.result)
          }
          this.$message('登录成功', 'success')
          // 合并购物车
          this.$store.dispatch('cart/mergeCart')

          const redirectUrl = this.$route.query.redirectUrl || '/'
          this.$router.push(redirectUrl)
        } catch (e) {
          this.$message('手机号或密码错误', 'error')
        }
      }
    },
    ...mapMutations('user', ['setUser', 'setReturnUrl'])
  },
  created () {
    this.setReturnUrl(this.$route.query.returnUrl || '/')
  }
}
</script>

<style scoped lang='less'>
// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
// 主体容器
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
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
      padding: 0 40px;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: right;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
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
