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

/**
 * 以openId进行登录
 * @param {String} unionId - QQ互联唯一标识
 * @param {*} source - 注册来源
 */
export const qqLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}
