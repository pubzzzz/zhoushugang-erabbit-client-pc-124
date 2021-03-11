import Mock from 'mockjs'
import category from './category'
import home from './home'
import goods from './goods'

Mock.setup({
  // 延时500ms-1000ms
  timeout: '500-1000'
})

// 拦截请求
Mock.mock(/\/category\/head$/, 'get', category.headCategory)
Mock.mock(/\/category\?/, 'get', category.category)
Mock.mock(/\/category\/sub\/filter/, 'get', category.filter)
Mock.mock(/\/category\/goods/, 'post', category.goods)

Mock.mock(/\/home\/banner/, 'get', home.banner)
Mock.mock(/\/home\/new/, 'get', home.new)
Mock.mock(/\/home\/hot/, 'get', home.hot)
Mock.mock(/\/home\/brand/, 'get', home.brand)
Mock.mock(/\/home\/goods/, 'get', home.goods)
Mock.mock(/\/home\/special/, 'get', home.special)

Mock.mock(/\/goods\/relevant/, 'get', goods.relevant)
Mock.mock(/\/goods\/hot/, 'get', goods.hot)
