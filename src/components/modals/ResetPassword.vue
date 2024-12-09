<template>
  <ModalWrapper :model-name="modelName">
    <div class="m-reset-password">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('passwordReset.resetTitle') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="../../assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <p class="m-reset-password_title">{{ $t('passwordReset.instructions') }}</p>
      <form @submit.prevent="updatePassword" class="m-reset-password_body">
        <PasswordField
          class="c-registration_body_field"
          type="password"
          :is-required="true"
          v-model.trim="password"
          name="password"
          :placeholder="$t('passwordReset.newPasswordPlaceholder')"
        />
        <PasswordField
          class="c-registration_body_field"
          type="password"
          :is-required="true"
          name="repeat-password"
          v-model.trim="repeatPassword"
          :placeholder="$t('passwordReset.confirmPasswordPlaceholder')"
        />
        <span class="c-registration_body-field-error">
          {{ authErrorForHtml }}
        </span>
        <div class="c-registration_footer">
          <button
            type="submit"
            class="m-reset-password_submit"
            :disabled="disabledSubmit"
            :class="{'c-registration_footer-login-btn--disabled': disabledSubmit}"
          >
            {{ $t('modals.submit') }}
          </button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<style scoped lang="scss">

</style>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import TextField from "@/components/forms/TextField.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import PasswordField from "@/components/forms/PasswordField.vue";

export default {
  name: 'ResetPassword',
  components: {
    PasswordField,
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
    const password = ref('')
    const errors = ref({})
    const repeatPassword = ref('')

    const validateForm = () => {
      errors.value = {};

      if (!repeatPassword.value && password.value !== '' && repeatPassword.value !== '') {
        errors.value.repeatPassword = "Please repeat your password.";
      } else if (password.value.length < 8 && password.value) {
        errors.value.repeatPassword = "";
      } else if (password.value !== repeatPassword.value && password.value && repeatPassword.value) {
        errors.value.repeatPassword = "Passwords do not match.";
      }
    }

    const isFormValid = () => {
      return password.value && repeatPassword.value
    }

    const disabledSubmit = computed(() => {
      validateForm()
      return Object.keys(errors.value).length > 0 || !isFormValid()
    })

    const getPasswordResetToken = computed(() => {
      return store.getters.getResetToken
    })

    const updatePassword = async () => {
      validateForm()

      if (!disabledSubmit.value) {
        await store.dispatch('resetPassword', { new_password: password.value, token: getPasswordResetToken.value })
        window.history.replaceState(null, null, '/');
      }
    }

    const authErrorForHtml = computed(() => {
      const errorMessages = Object.values(errors.value).filter(Boolean);
      return errorMessages.length > 0 ? errorMessages[0] : null;
    })

    const onClose = () => {
      store.commit('removeModal')
    }

    return {
      updatePassword,
      authErrorForHtml,
      disabledSubmit,
      onClose,
      password,
      repeatPassword
    }
  }
}
</script>


<style lang="scss">
.m-reset-password {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 550px;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  overflow: auto;
  @media screen and (max-width: 550px) {
    width: 90%;
  }

  @media screen and (max-height: 400px) {
    overflow: auto;
    height: 90vh;
  }

  &_title {
    font-size: 16px;
    color: rgba(255, 255,255, .8);
    max-width: 95%;
    margin-bottom: 10px;
  }
  &_body {
    &-border {
      height: 1px;
      width: 100%;
      background: rgba(255,255,255, .4);
      margin: 30px 0 20px 0;
    }
  }
  &_submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
    padding: 10px 17px;
    border-radius: 200px;
    cursor: pointer;
    font-size: 16px;
    opacity: .8;
    background-color: #b4f12f;
    transition: all 0.4s;
    color: #000000;
    font-weight: 700;
    &:hover {
      opacity: 1;
    }
    &-btn {
      width: 100%;
      border: none;
      outline: none;
      &--disabled {
        cursor: no-drop;
        background: rgb(50, 50, 50);
        opacity: .85;
        color: #FFFFFF;
      }
    }
  }
}
</style>
