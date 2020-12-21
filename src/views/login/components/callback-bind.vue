<template>
  <Form ref="form" class="xtx-form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field v-model="form.mobile" name="mobile" :class="{err:errors.mobile}" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field v-model="form.code" name="code" :class="{err:errors.code}" class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">
          {{duration===0?'发送验证码':`${duration}秒后发送`}}
        </span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import veeSchema from '@/utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { qqBindCode, qqBind } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: ['nickname', 'avatar', 'openId'],
  data () {
    const { mobile, code } = veeSchema
    return {
      schema: { mobile, code },
      form: {
        mobile: '',
        code: ''
      },
      duration: 0
    }
  },
  computed: {
    ...mapState('user', ['returnUrl'])
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    async submit () {
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          const data = await qqBind({ openId: this.openId, ...this.form })
          this.setUser(data.result)
          this.$router.push(this.returnUrl)
          this.$message('绑定账户成功', 'success')
        } catch (e) {
          this.$message('绑定账户失败', 'error')
        }
      }
    },
    async send () {
      const valid = this.schema.mobile(this.form.mobile)
      if (valid === true) {
        if (this.duration > 0) return
        await qqBindCode()
        this.duration = 60
        clearInterval(this.timer)
        this.timer = window.setInterval(() => {
          this.duration--
          if (this.duration === 0) clearInterval(this.timer)
        }, 1000)
      } else {
        this.$refs.form.setFieldError('mobile', valid)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
</style>
