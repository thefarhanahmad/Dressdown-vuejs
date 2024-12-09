<template>
  <ModalWrapper :model-name="modelName ">
    <div class="c-registration-signup c-registration-signup--overflow">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.signUp') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="../../assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <form @submit.prevent="handleSubmit" class="c-registration_body">
        <EmailField
          class="c-registration_body_field"
          v-model.trim="userEmail"
          :is-required="true"
          name="email"
          @update:invalidText="isInvalid"
          placeholder="Email@gmail.com"
        />
        <TextField
          class="c-registration_body_field"
          v-model.trim="username"
          name="username"
          :is-required="true"
          placeholder="Username"
        />
        <PasswordField
          class="c-registration_body_field"
          type="password"
          :is-required="true"
          v-model.trim="password"
          name="password"
          placeholder="Password"
        />
        <PasswordField
          class="c-registration_body_field"
          type="password"
          :is-required="true"
          name="repeat-password"
          v-model.trim="repeatPassword"
          placeholder="Repeat password"
        />
        <span class="c-registration_body-field-error">
          {{ authErrorForHtml }}
        </span>
        <div class="c-registration_footer">
          <button
            type="submit"
            :disabled="disabledSubmit"
            :class="{'c-registration_footer-login-btn--disabled': disabledSubmit}"
            class="c-registration_footer-login c-registration_footer-login-btn"
          >
            {{ $t('modals.signUp') }}
          </button>
          <div
            @click="toLogin"
            class="c-registration_footer-siging"
          >
            {{ $t('modals.signIn') }}
          </div>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue'
import ModalWrapper from "./ModalWrapper";
import EmailField from "../forms/EmailField";
import TextField from "../forms/TextField";
import PasswordField from "@/components/forms/PasswordField.vue";

export default {
  name: "AuthFormSignUp",
  components: {
    TextField,
    EmailField,
    PasswordField,
    ModalWrapper
  },
  props: {
    modelName: {
      type: String,
      required: true
    },
  },
  setup (props, { emit }) {
    const store = useStore()
    const userEmail = ref('')
    const username = ref('')
    const password = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const repeatPassword = ref('')
    const referralEmail = ref('')
    const isInvalidEmail = ref('')
    const errors = ref({})

    const isFormValid = () => {
      return username.value && userEmail.value && password.value && repeatPassword.value
    }

    const validateForm = () => {
      errors.value = {};

      if (isInvalidEmail.value !== '') {
        errors.value.userEmail = "Invalid email format.";
      }
      if (!repeatPassword.value && password.value !== '' && repeatPassword.value !== '') {
        errors.value.repeatPassword = "Please repeat your password.";
      } else if (password.value.length < 8 && password.value) {
        errors.value.repeatPassword = "Password should be more than 8 symbols";
      } else if (password.value !== repeatPassword.value && password.value && repeatPassword.value) {
        errors.value.repeatPassword = "Passwords do not match.";
      }
    }

    const disabledSubmit = computed(() => {
      validateForm()
      return Object.keys(errors.value).length > 0 || !isFormValid()
    })

    const authErrorForHtml = computed(() => {
      const errorMessages = Object.values(errors.value).filter(Boolean);
      return errorMessages.length > 0 ? errorMessages[0] : null;
    })
    const getReferralLinkForRegistration = computed(() => {
      return store.getters.getReferralLinkForRegistration
    })

    const clearData = () => {
      username.value = ''
      userEmail.value = ''
      password.value = ''
      referralEmail.value = ''
    }

    const onClose = () => {
      clearData()
      store.commit('removeAllModal')
      emit('closeModal')
    }
    const isInvalid = (value) => {
      return isInvalidEmail.value = value
    }

    const handleSubmit = () => {
      validateForm()

      if (!disabledSubmit.value) {
        const formData = new FormData()
        formData.append('email', userEmail.value)
        formData.append('password', password.value)
        formData.append('referral_token', getReferralLinkForRegistration.value)
        store.dispatch('registration', formData)
        const img = new Image();
        img.src = "//tsyndicate.com/api/v2/cpa/192272/pixel.gif";
        img.onload = () => {
          console.log("Registration tracking pixel sent.");
        };
      }
    }

    onMounted(() => {
      errors.value = {};
    })

    const toLogin = () => {
      store.commit('addModal', 'Login')
    }

    return {
      toLogin,
      handleSubmit,
      isInvalid,
      validateForm,
      onClose,
      authErrorForHtml,
      firstName,
      lastName,
      userEmail,
      username,
      password,
      repeatPassword,
      referralEmail,
      disabledSubmit
    }
  }
}
</script>

<style lang="scss">
.c-registration_body-field-error {
  font-size: 12px;
  line-height: 1.333;
  color: red;
  display: block;
  margin-bottom: 10px;
}
</style>
