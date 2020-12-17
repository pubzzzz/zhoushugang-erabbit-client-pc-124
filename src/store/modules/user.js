// 用户状态
export default {
  namespaced: true,
  state: () => ({
    id: '',
    nickname: '',
    avatar: '',
    token: '',
    mobile: ''
  }),
  mutations: {
    setUser (state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  }
}
