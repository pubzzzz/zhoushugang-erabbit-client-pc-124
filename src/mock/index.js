import Mock from 'mockjs'
import category from './category'

Mock.setup({
  // 延时500ms-1000ms
  timeout: '500-1000'
})

// 拦截请求
Mock.mock(/\/category\.*/, 'get', category.all)
