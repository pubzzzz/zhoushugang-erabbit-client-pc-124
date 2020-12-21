<template>
  <Form ref="form" class="xtx-form" :validation-schema="schema" v-slot="{errors}" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field name="account" v-model="form.account" :class="{err:errors.account}" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div class="error" v-if="errors.account">{{errors.account}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field name="mobile" v-model="form.mobile" :class="{err:errors.mobile}" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field name="code" v-model="form.code" :class="{err:errors.code}" class="input" type="text" placeholder="请输入验证码" />
        <span @click="send()" class="code">
          {{duration===0?'发送验证码':`${duration}秒后发送`}}
        </span>
      </div>
      <div class="error" v-if="errors.code">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field name="password" v-model="form.password" :class="{err:errors.password}" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div class="error" v-if="errors.password">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field name="rePassword" v-model="form.rePassword" :class="{err:errors.rePassword}" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error" v-if="errors.rePassword">{{errors.rePassword}}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import veeSchema from '@/utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { qqPatchCode, qqPatch } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: ['openId'],
  data () {
    const { mobile, code, password, account, rePassword } = veeSchema
    return {
      schema: { mobile, code, password, account, rePassword },
      form: {
        account: '',
        mobile: '',
        code: '',
        password: '',
        rePassword: ''
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
          const data = await qqPatch({ openId: this.openId, ...this.form })
          this.setUser(data.result)
          this.$router.push(this.returnUrl)
          this.$message('完善信息成功', 'success')
        } catch (e) {
          this.$message('完善信息失败', 'error')
        }
      }
    },
    async send () {
      const valid = this.schema.mobile(this.form.mobile)
      if (valid === true) {
        if (this.duration > 0) return
        await qqPatchCode()
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
