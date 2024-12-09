
import { toast } from 'vue3-toastify'
export default {
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    handleToast ({ getters }, { text, type = 'DEFAULT' }) {
      toast(text, {
        autoClose: 3000,
        theme: 'dark',
        type: toast.TYPE[type],
        hideProgressBar: false,
        position: window.innerWidth < 550 ? toast.POSITION.TOP_RIGHT : toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: true
      })
    }
  }
}
