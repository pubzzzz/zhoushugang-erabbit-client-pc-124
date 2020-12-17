import request from '@/utils/request'

/**
 * 账号登录
 * @param {String} account - 账号/手机
 * @param {String} password - 密码
 */
export const accountLogin = (account, password) => {
  return request('/login', 'post', { account, password })
}
