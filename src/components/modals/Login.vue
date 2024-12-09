<template>
  <ModalWrapper :model-name="modelName">
    <div class="c-registration-signup c-registration-login">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.signIn') }}
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
        <PasswordField
          class="c-registration_body_field"
          type="password"
          :is-required="true"
          v-model.trim="password"
          name="password"
          placeholder="Password"
        />
        <div @click="toForgotPassword" class="c-registration_body-forgot">
          <span class="c-registration_body-forgot-title">
            {{ $t('modals.forgotPassword') }}
          </span>
        </div>
        <div class="c-registration-login-auth-by-services">
          <a
            class="c-registration-login-google-link"
            :href="`https://api.dressdown.ai/auth/google?referral_token=${getReferralForRegistry}`"
          >
            <GoogleIconButton />
          </a>
          <a
            class="c-registration-login-google-link"
            :href="`https://api.dressdown.ai/auth/discord?referral_token=${getReferralForRegistry}`"
          >
            <DiscordIconButton />
          </a>
        </div>
        <div class="c-registration_footer">
          <button
            type="submit"
            class="c-registration_footer-siging"
            style="margin-bottom: 15px"
          >
            {{ $t('modals.signIn') }}
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
import PasswordField from "@/components/forms/PasswordField.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useReCaptcha } from 'vue-recaptcha-v3';
import GoogleIconButton from "@/components/GoogleIconButton.vue";
import DiscordIconButton from "@/components/DiscordIconButton.vue";

export default {
  name: 'Login',
  components: {
    DiscordIconButton,
    GoogleIconButton,
    ModalWrapper,
    TextField,
    EmailField,
    PasswordField
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
    const router = useRouter()
    const route = useRoute()

    const { executeRecaptcha } = useReCaptcha();

    const { locale } = useI18n()
    const toForgotPassword = () => {
      store.commit('addModal', 'ForgotPassword')
    }
    const toSignUp = () => {
      store.commit('addModal', 'SignUp')
    }

    const clearData = () => {
      email.value = ''
      password.value = ''
    }

    const onSubmit = async () => {
      try {
        const token = await executeRecaptcha('form_submission');
      } catch (error) {
        console.error('Ошибка reCAPTCHA:', error);
      }
    };

    const getReferralForRegistry = computed(() => {
      return store.getters.getReferralLinkForRegistration
    })

    route.query.state = getReferralForRegistry.value

    const handleSubmit = async () => {
      store.commit('setEmail', email.value)
      const formData = new FormData()
      formData.append('email', email.value)
      formData.append('password', password.value)
      await onSubmit()
      await store.dispatch('login', formData)
      if (store.getters.isAuthorized) {
        clearData()
        await router.push(`/${locale.value}/generate-girl`).then(() => {
          store.commit('addModal', 'Guide')
        })
      }
    }
    const onClose = () => {
      email.value = ''
      password.value = ''
      store.commit('removeAllModal')
    }

    return {
      toForgotPassword,
      toSignUp,
      handleSubmit,
      onClose,
      getReferralForRegistry,
      email,
      password
    }
  }
}
</script>

<style lang="scss">
.c-registration-login {
  height: 100% !important;
  &-google-link {
    text-decoration: none;
    margin-top: 15px;
    height: 100%;
    width: max-content;
    display: inline-flex;
  }
  &-auth-by-services {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
