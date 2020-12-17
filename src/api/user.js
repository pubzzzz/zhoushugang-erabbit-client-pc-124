import request from '@/utils/request'

/**
 * 账号登录
 * @param {String} account - 账号/手机
 * @param {String} password - 密码
 */
export const accountLogin = (account, password) => {
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
