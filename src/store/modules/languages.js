export default {
  state: {
    currentLang: {}
  },
  getters: {
    getLang(state) {
      return state.currentLang
    }
  },
  mutations: {
    setLang(state, payload) {
      state.currentLang = payload
    }
  }
}
