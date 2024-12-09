<template>
  <ModalWrapper :model-name="modelName">
    <div class="c-registration-signup c-registration-login">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.promoCode.title') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <p>{{ $t('modals.promoCode.text') }}</p>
      <form @submit.prevent="handleSubmit" class="c-registration_body">
        <TextField
          class="c-registration_body_field c-registration_body_field c-registration_body_field-referral"
          v-model.trim="promoCode"
          name="Promo Code"
          :is-required="true"
          placeholder="Enter your promocode..."
        />
        <div class="c-registration_footer">
          <button
            type="submit"
            class="c-registration_footer-siging"
            style="margin-bottom: 15px"
          >
            {{ $t('modals.submit') }}
          </button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import TextField from "@/components/forms/TextField.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: 'PromoCode',
  components: {
    ModalWrapper,
    TextField,
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup () {
    const store = useStore()
    const promoCode = ref('')
    const handleSubmit = async () => {
      await store.dispatch('setPromoCode', { code: promoCode.value })
    }
    const onClose = () => {
      promoCode.value = ''
      store.commit('removeModal')
    }

    return {
      handleSubmit,
      onClose,
      promoCode,
    }
  }
}
</script>
