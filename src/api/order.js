import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = (address) => {
  return request('/member/address/' + address.id, 'put', address)
}

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderAll = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}

/**
 * 查看物流
 * @param {String} orderId - 订单ID
 * @returns
 */
export const findLogistics = (orderId) => {
  return request(`/member/order/${orderId}/logistics`, 'get')
}

/**
 * 取消订单
 * @param {String} id - 订单ID
 * @returns
 */
export const orderCancel = (id, cancelReason) => {
  return request(`/member/order/${id}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 订单ID集合
 * @returns
 */
export const orderDelete = (ids) => {
  return request('/member/order', 'delete', { ids })
}
