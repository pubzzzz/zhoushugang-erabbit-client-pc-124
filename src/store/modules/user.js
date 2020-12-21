// 用户状态
export default {
  namespaced: true,
  state: () => ({
    profile: {
      id: '',
      nickname: '',
      avatar: '',
      token: '',
      mobile: ''
    },
    returnUrl: '/'
  }),
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    setReturnUrl (state, payload) {
      state.returnUrl = payload
    }
  }
}
