import Mock from 'mockjs'
import { defaultCategory } from '@/api/constans'

const list = defaultCategory.map(item => {
  const count = Mock.mock('@integer(5,10)')
  const children = []
  for (let index = 0; index < count; index++) {
    children.push(Mock.mock({
      id: '@id',
      name: '@ctitle(2,3)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(${Mock.mock('@integer(1,10)')}).png`
    }))
  }
  const goods = []
  for (let index = 0; index < 9; index++) {
    goods.push(Mock.mock({
      id: '@id',
      name: '@ctitle(15,20)',
      desc: '@ctitle(6,12)',
      price: '@float(10,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(${Mock.mock('@integer(1,10)')}).png`
    }))
  }
  return Mock.mock({
    id: '@id',
    name: item,
    children,
    goods
  })
})

export default {
  all: config => {
    return {
      msg: '获取全部分类成功',
      result: list
    }
  }
}
