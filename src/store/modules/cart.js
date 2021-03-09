// 购物车状态
import { checkCart, deleteCart, findCart, insertCart, mergeCart, updateCart } from '@/api/cart'
import { findGoodsNewInfo } from '@/api/goods'
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, n) => p + n.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, n) => p + n.nowPrice * 100 * n.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(item => !item.stock || !item.isEffective)
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, n) => p + n.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, n) => p + n.nowPrice * 100 * n.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.selectedList.length === getters.validList.length
    }
  },
  // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
  // 线上：比上面多 isCollect 有用 discount 无用 两项项信息
  mutations: {
    insertCart (state, goods) {
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
      if (sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(goods)
    },
    deleteCart (state, skuId) {
      const sameIndex = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(sameIndex, 1)
    },
    updateCart (state, goods) {
      const oldGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        oldGoods[key] = goods[key]
      }
    },
    // 选中与取消选中
    checkCart (state, { skuIds, selected }) {
      // skuIds需要做选中处理的ID集合，selected修改成什么状态。
      skuIds.forEach(skuId => {
        const goods = state.list.find(item => item.skuId === skuId)
        goods.selected = selected
      })
    },
    // 设置购物车
    setCart (state, list) {
      state.list = list
    }
  },
  actions: {
    // 合并购物车
    async mergeCart (ctx) {
      const cartList = ctx.state.list.map(({ skuId, selected, count }) => ({ skuId, selected, count }))
      await mergeCart(cartList)
      ctx.commit('setCart', [])
    },
    // 查询购物车信息
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          findCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 根据本地购物车查询商品最新信息，更新本地购物车
          const promiseArr = ctx.state.list.map(item => {
            return findGoodsNewInfo(item.skuId)
          })
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          })
        }
      })
    },
    insertCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart({ skuId: goods.skuId, count: goods.count }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    },
    deleteCart (ctx, skuIds) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录 TODO
          deleteCart(skuIds).then(() => {
          //   return findCart()
          // }).then(data => {
          // 减少一次请求
            skuIds.forEach(skuId => {
              ctx.commit('deleteCart', skuId)
            })
            resolve()
          })
        } else {
          // 未登录
          skuIds.forEach(skuId => {
            ctx.commit('deleteCart', skuId)
          })
          resolve()
        }
      })
    },
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录 TODO
          updateCart(goods).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 单选操作，全选操作。 payload === {skuIds,selected}
    checkCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录 TODO
          checkCart(payload).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('checkCart', payload)
          resolve()
        }
      })
    }
  }
}
