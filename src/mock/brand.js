import Mock from 'mockjs'
export default {
  hot: config => {
    const body = JSON.parse(config.body)
    const limit = body.limit || 10
    const brands = []
    for (let index = 0; index < limit; index++) {
      brands.push(Mock.mock({
        id: '@id',
        name: '@ctitle(5,10)',
        desc: '@ctitle(20,40)',
        place: '@city',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_${index % 5 + 1}.jpg`
      }))
    }
    return {
      msg: '查询品牌成功',
      result: brands
    }
  }
}
