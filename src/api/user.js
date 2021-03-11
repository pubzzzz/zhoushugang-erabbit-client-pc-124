import request from '@/utils/request'

/**
 * 账号登录
 * @param {String} account - 账号/手机
 * @param {String} password - 密码
 */
export const accountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 短信登录-验证码
 * @param {String} mobile - 手机号
 */
export const mobileLoginCode = (mobile) => {
  return request('login/code', 'get', { mobile })
}

/**
 * 短信登录
 * @param {String} mobile - 手机号
 */
export const mobileLogin = (mobile, code) => {
  return request('login/code', 'post', { mobile, code })
}

/**
 * 以openId进行登录
 * @param {String} unionId - QQ互联唯一标识
 * @param {*} source - 注册来源
 */
export const qqLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}

/**
 * QQ绑定账户的短信
 * @param {String} mobile - 手机号
 */
export const qqBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * QQ绑定账户登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} openId - QQ忽略唯一标识
 */
export const qqBind = ({ mobile, code, openId }) => {
  return request('/login/social/bind', 'post', { mobile, code, openId })
}

/**
 * 校验用户吗是否唯一
 * @param {String} account - 用户名
 */
export const checkAccount = (account) => {
  return request('/register/check', 'get', { account })
}

/**
 * QQ完善信息短信验证码
 * @param {String} mobile
 */
export const qqPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ完善信息登录
 * @param {String} form.openId - QQ忽略唯一标识
 * @param {String} form.account - 用户名
 * @param {String} form.mobile - 手机号
 * @param {String} form.code - 验证码
 * @param {String} form.password - 密码
 */
export const qqPatch = (form) => {
  return request(`/login/social/${form.openId}/complement`, 'post', form)
}
