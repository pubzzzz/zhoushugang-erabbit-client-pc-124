import { checkAccount } from '@/api/user'
const schema = {
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号不正确'
    return true
  },
  code (value) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码6个数字'
    return true
  },
  password (value) {
    if (!value) return '请输入密码'
    if (value.length < 8 || value.length > 24) return '密码8-24个字符'
    return true
  },
  isAgree (value) {
    if (!value) return '需同意隐私条款和服务条款'
    return true
  },
  async account (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,20}$/.test(value)) return '字母开头的6-20个字符'
    const data = await checkAccount(value)
    if (data.result) return '用户名已存在'
    return true
  },
  rePassword (value, { form }) {
    if (!value) return '请确认密码'
    if (value.length < 8 || value.length > 24) return '密码8-24个字符'
    if (value !== form.password) return '两次密码需要一致'
    return true
  }
}

export default schema
