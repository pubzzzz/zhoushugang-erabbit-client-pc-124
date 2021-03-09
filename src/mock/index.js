import Mock from 'mockjs'
import category from './category'
import brand from './brand'

Mock.setup({
  // 延时500ms-1000ms
  timeout: '500-1000'
})

// 拦截请求
Mock.mock(/\/category\/head\.*/, 'get', category.all)
Mock.mock(/\/home\/brand\.*/, 'get', brand.hot)
