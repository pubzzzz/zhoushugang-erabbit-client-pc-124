import { defaultCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 默认数据：[{name:'xxx'},...] 才能支持组件默认渲染
      list: defaultCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.list = payload
    },
    show (state, payload) {
      const item = state.list.find(item => item.id === payload.id)
      item.open = true
    },
    hide (state, payload) {
      const item = state.list.find(item => item.id === payload.id)
      item.open = false
    }
  },
  actions: {
    async getCategory (ctx) {
      const data = await findAllCategory()
      data.result.forEach(item => {
        item.open = false
      })
      ctx.commit('setCategory', data.result)
    }
  }
}
