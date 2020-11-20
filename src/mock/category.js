import Mock from 'mockjs'

const preList = ['美食', '餐厨', '艺术', '电器', '居家', '洗护', '孕婴', '服装', '杂货']
const list = preList.map(item => {
  const count = Mock.mock('@integer(5,10)')
  const children = []
  for (let index = 0; index < count; index++) {
    children.push(Mock.mock({
      id: '@id',
      name: '@ctitle(2,3)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(${Mock.mock('@integer(1,10)')}).png`
    }))
  }
  return Mock.mock({
    id: '@id',
    name: item,
    children
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
