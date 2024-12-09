<template>
  <ModalWrapper :model-name="modelName">
    <div class="c-registration-signup c-registration-login">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.recoveryPass') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="c-registration_body">
        <EmailField
          class="c-registration_body_field"
          v-model.trim="email"
          :is-required="true"
          name="email"
          placeholder="Email@gmail.com"
        />
        <div class="c-registration_footer">
          <button
            type="submit"
            class="c-registration_footer-siging"
            style="margin-bottom: 15px"
          >
            <LoadAnimation v-if="isLoad" class="c-registration_footer-siging_loader" />
            <template v-else>{{ $t('modals.send') }}</template>
          </button>
          <div
            @click="toSignUp"
            class="c-registration_footer-login c-registration_footer-login-btn"
          >
            {{ $t('modals.signUp') }}
          </div>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import TextField from "@/components/forms/TextField.vue";
import EmailField from "@/components/forms/EmailField.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import LoadAnimation from "@/components/animations/LoadAnimation.vue";

export default {
  name: 'ForgotPassword',
  components: {
    LoadAnimation,
    ModalWrapper,
    TextField,
    EmailField,
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup () {
    const store = useStore()
    const email = ref('')
    const password = ref('')
    const isLoad = ref(false)

    const toSignUp = () => {
      store.commit('addModal', 'SignUp')
    }

    const handleSubmit = async () => {
      if (isLoad.value === true) {
        return
      }

      isLoad.value = true
      await store.dispatch('passwordRecovery', {
        email: email.value,
      }).finally(() => {
        isLoad.value = false
      })
    }
    const onClose = () => {
      email.value = ''
      password.value = ''
      store.commit('removeModal')
    }

    return {
      toSignUp,
      handleSubmit,
      onClose,
      isLoad,
      email,
      password
    }
  }
}
</script>
