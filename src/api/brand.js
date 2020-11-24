import request from '@/utils/request'

export const findHotBrand = (payload) => {
  return request('/brand/hot', 'get', payload)
}
