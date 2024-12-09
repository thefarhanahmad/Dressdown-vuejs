export default {
  state: {
    modalList: [],
    existingModals: {
      SignUp: 'SignUp',
      AuthSignUp: 'AuthSignUp',
      Login: 'Login',
      ForgotPassword: 'ForgotPassword',
      Cash: 'Cash',
      RedirectModal: 'RedirectModal',
      ZoomImage: 'ZoomImage',
      Referral: 'Referral',
      Promocode: 'Promocode',
      ChangeLangModal: 'ChangeLangModal',
      UploadRecommendation: 'UploadRecommendation',
      InfoAboutPremiumContent: 'InfoAboutPremiumContent',
      ResetPassword: 'ResetPassword',
      SupportModal: 'SupportModal',
      VideoModal: 'VideoModal',
      Guide: 'Guide'
    },
  },
  getters: {
    isOpenModal (state) {
      return !!state.modalList.length
    },
    getModalList (state) {
      return state.modalList
    },
    getCurrentModal (state) {
      if (state.modalList.length) {
        return state.modalList[state.modalList.length - 1]
      }

      return null
    }
  },
  mutations: {
    addModal (state, modalName) {
      if (state.existingModals[modalName]) {
        state.modalList.push(modalName)
      }
    },
    removeModal (state) {
      if (state.modalList.length) {
        state.modalList.pop()
      }
    },
    removeAllModal (state) {
      state.modalList = []
    }
  }
}
