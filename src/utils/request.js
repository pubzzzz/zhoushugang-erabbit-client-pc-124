import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 创建一个新的axios实例
const instance = axios.create({
  // baseURL: 'https://mock.boxuegu.com/mock/1175/',
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers['souce-client'] = 'pc'
  // 如果token存在在请求头携带
  const { token } = store.state.user.profile
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

// 响应拦截器
instance.interceptors.response.use(res => res.data, e => {
  // 在某一个页面，如果登录失效拦截到登录，且在地址栏携带返回页面的路径
  if (e.response && e.response.status === 401) {
    const targetUrl = router.currentRoute.fullPath
    router.push('/login', { query: { redirectUrl: encodeURIComponent(targetUrl) } })
  }
  return Promise.reject(e)
})

/**
 * 调用axios的工具函数
 * @param {String} url - 接口地址
 * @param {String} method - 请求方式
 * @param {Object} submitData - 提交给后台的数据
 */
const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export default request

export const myAxios = instance
