import { apiInstance } from '@/core/axios';
import i18n from "@/i18n";
export default {
  state: {
    profileData: {
    },
    idOrder: '',
    generatedImage: ''
  },
  getters: {
    isInOrder(state) {
      return !!(!!state.idOrder || localStorage.getItem('order-id'));
    },
    getGeneratedImage (state) {
      if (state.generatedImage !== '') {
        return state.generatedImage
      }

      return ''
    }
  },
  mutations: {
    setOrderId(state, idOrder) {
      state.idOrder = idOrder;
      localStorage.setItem('order-id', idOrder);
    },
    setOrder(state, idOrder) {
      state.idOrder = idOrder;
    },
    clearOrderId(state) {
      state.idOrder = ''
      localStorage.removeItem('order-id')
    },
    setGeneratedImage(state, payload) {
      state.generatedImage = payload
    }
  },
  actions: {
    async generateGirl({ rootState, commit }, formData) {
      try {
        const response = await apiInstance.post('/api/image-generation/upload', formData, {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        commit('setOrderId', response.data.id)
        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async generateInPaintGirl({ rootState, commit }, formData) {
      try {
        const response = await apiInstance.post('/api/image-generation-inpaint/upload', formData, {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        commit('setOrderId', response.data.id)
        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async generatePosesGirl({ rootState, commit }, formData) {
      try {
        const response = await apiInstance.post('/api/image-generation-pose/upload', formData, {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        commit('setOrderId', response.data.id)
        return response
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async checkStatus({ rootState, dispatch, state, commit }) {
        return await apiInstance.get(`/api/image-generation/upload/status/${state.idOrder}`, {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          commit('setGeneratedImage', response.data.image_url)
          if (response.data && response.data.status) {
            if (response.status === 'Processing. Check back later.') {
              dispatch('handleToast', {
                text: 'Your image in a queue, please wait.',
                type: 'WARNING'
              })
            }
          }
          if (response.data && response.data.hasOwnProperty('image_url')) {
            dispatch('handleToast', {
              text: `${rootState.payments.balance === 0 ? 0 : rootState.payments.balance} ${i18n.global.t('generation.title1')} ${i18n.global.t('generation.title2')}` ,
              type: 'SUCCESS'
            })
          }
          return response.data
        })
        .catch(error => {
          if (error.status === 400) {
            dispatch('handleToast', {
              text: 'Sorry, something went wrong, please try again after reload your funds will back soon!',
              type: 'ERROR'
            })
          }
          localStorage.removeItem('order-id')
          window.location.reload()
          throw error
        })
    }
  }
}
