import request from '@/utils/request'

/**
 * 合并购物车
 * @param {Array<object>} cartList - 购物车列表
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 购物车列表
 * @param {Array<object>} cartList - 购物车列表
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Number} count - 商品数量
 */
export const insertCart = (skuId, count) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车
 * @param {Array<String>} skuIds - 商品SKUID集合
 */
export const deleteCart = (skuIds) => {
  return request('/member/cart', 'delete', { ids: skuIds })
}

/**
 * 选中购物车商品
 * @param {Array<String>} skuIds - 商品skuId集合
 * @param {Boolean} selected - 是否选中
 */
export const checkCart = (skuIds, selected) => {
  return request('/member/cart/selected', 'put', { ids: skuIds, selected })
}

/**
 * 修改商品
 * @param {Object} goods - 购物车商品对象(支持selected count)
 */
export const updateCart = (goods) => {
  return request(`member/cart/${goods.skuId}`, 'put', goods)
}
