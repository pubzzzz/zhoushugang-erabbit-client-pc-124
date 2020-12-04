import request from '@/utils/request'

/**
 * 获取所有分类
 */
export const findAllCategory = () => {
  return request('/category/all', 'get')
}

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
