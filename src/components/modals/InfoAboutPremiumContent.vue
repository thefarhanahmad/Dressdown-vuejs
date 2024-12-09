<template>
  <ModalWrapper :model-name="modelName">
    <div class="m-about-premium">
      <div class="add-cash-modal-head">
        <p class="add-cash-modal-head_title">
          {{ $t('modals.premiumInfo') }}
        </p>
        <div @click="onClose" class="add-cash-modal-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="m-about-premium-body">
        {{ $t('modals.premiumInfoText') }}
      </div>
      <div class="c-registration_footer">
        <button
          @click="handleAddBalance"
          type="submit"
          class="c-registration_footer-siging"
        >
          {{ $t('modals.addCash') }}
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";

export default {
  name: 'InfoAboutPremiumContent',
  components: {
    ModalWrapper
  },
  props: {
    modelName: {
      type: String
    },
  },
  setup(_, { emit }) {
    const store = useStore()
    const onClose = () => {
      store.commit('removeAllModal')
      emit('closeModal')
      store.dispatch('getUserProfile')
    }
    const handleAddBalance = () => {
      store.commit('removeAllModal')
      store.commit('addModal', 'Cash')
    }
    return {
      handleAddBalance,
      onClose,
    }
  }
}
</script>

<style lang="scss">
.m-about-premium {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 500px;
  min-height: 180px;
  @media screen and (max-width: 900px) {
    width: 95%;
  }
  @media screen and (max-height: 540px) {
    overflow: auto;
    height: 90vh;
  }
  &-body  {
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    padding-top: 20px;
    opacity: 0.75;
    font-size: 18px;
    line-height: 27px;
  }
}
</style>
