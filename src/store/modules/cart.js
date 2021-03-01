// 购物车状态
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  // 本地：id skuId name picture price count attrsText selected stock
  // 线上：比上面多 isCollect discount isEffective 三项信息
  mutations: {
    insertCart (state, goods) {
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
      if (sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(goods)
    }
  },
  actions: {
    insertCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          // 已登录 TODO

        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    }
  }
}
