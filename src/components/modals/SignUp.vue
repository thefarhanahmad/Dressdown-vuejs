<template>
  <ModalWrapper :model-name="modelName ">
    <div class="c-registration">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.signIn') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="c-registration_body">
        <div
          class="c-registration_body-card"
          v-for="item of requirements" :key="item.id"s
        >
          <div class="c-registration_body-card-img">
            <img :src="item.img" :alt="$t(item.text)">
          </div>
          <div class="c-registration_body-card-text">
            {{ $t(item.text) }}
          </div>
        </div>
      </div>
      <p class="c-registration-links">
        By authorizing, you agree to the rules above.
        <router-link
          class="c-registration-links_link"
          :to="`/${locale}/terms`"
          @click="onClose"
        >
          TOS
        </router-link>,
        <router-link
          class="c-registration-links_link"
          :to="`/${locale}/policy`"
          @click="onClose"
        >
          Use Policy
        </router-link>
        &
        <router-link
          class="c-registration-links_link"
          :to="`/${locale}/privacy`"
          @click="onClose"
        >
          Privacy Policy
        </router-link>
      </p>
      <div class="c-registration_footer">
        <div class="c-registration_footer-login" @click="openSignUpModal">
          <img src="../../assets/icons/mail.svg" alt="mail email">
          <span class="c-registration_footer-login_text">
            Email
          </span>
        </div>
        <div>
          <a
            class="c-registration_footer-google-link"
            :href="`https://api.dressdown.ai/auth/google?referral_token=${getReferralForRegistry}`"
          >
            <GoogleButton />
          </a>
          <a
            class="c-registration_footer-google-link"
            :href="`https://api.dressdown.ai/auth/discord?referral_token=${getReferralForRegistry}`"
          >
            <DiscordButton />
          </a>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import { useStore } from 'vuex';
import ModalWrapper from "./ModalWrapper";
import adoult from '../../assets/icons/adoult.svg';
import response from '../../assets/icons/response.svg';
import point from '../../assets/icons/point.svg';
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useRoute } from "vue-router";
import GoogleButton from "@/components/GoogleButton.vue";
import DiscordButton from "@/components/DiscordButton.vue";

export default {
  name: "SignUp",
  components: {
    DiscordButton,
    GoogleButton,
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
    const { locale } = useI18n()
    const route = useRoute()
    const requirements = [
      { id: 1, img: adoult, text: 'registration.requirements1' },
      { id: 2, img: point, text: 'registration.requirements2' },
      { id: 3, img: response, text: 'registration.requirements3' }
    ]

    const onClose = () => {
      store.commit('removeAllModal')
      emit('closeModal')
    }

    const getReferralForRegistry = computed(() => {
      return store.getters.getReferralLinkForRegistration
    })

    route.query.state = getReferralForRegistry.value

    const signInWithGoogle = async () => {
      await store.dispatch('authByGoogle')
    }
    const signInWithDiscord = () => {
      const clientId = "YOUR_DISCORD_CLIENT_ID";
      const redirectUri = "YOUR_REDIRECT_URI";
      const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify email`;
      window.location.href = discordAuthUrl;
    }

    const openSignUpModal = () => {
      store.commit('addModal', 'AuthSignUp')
    }
    return {
      locale,
      getReferralForRegistry,
      requirements,
      signInWithDiscord,
      openSignUpModal,
      signInWithGoogle,
      onClose
    }
  }
}
</script>

<style lang="scss">
.c-registration {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 350px;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  overflow: auto;
  @media screen and (max-width: 550px) {
    width: 90%;
  }
  &-signup {
    background-color: rgb(22, 22, 22);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    margin: 0 auto;
    padding: 20px 30px;
    border-radius: 15px;
    width: 650px;
    overflow: auto;
    @media screen and (max-width: 550px) {
      width: 90%;
      height: 90vh;
      max-height: 500px;
    }
    &--overflow {
      overflow: auto;
    }
  }
  @media screen and (max-width: 700px) {
    width: 90%;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &_title {
      font-weight: 700;
      font-size: 18px;
    }
    &_close {
      cursor: pointer;
    }
  }
  &_body {
    &-card {
      margin-bottom: 10px;
      background: rgb(27,27,27);
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;
      border-radius: 12px;
    }
    &_field {
      margin-bottom: 15px !important;

      &-referral {
        cursor: pointer;
      }
    }
    &-forgot {
      cursor: pointer;
      &-title {
        padding-bottom: 2px;
        transition: all 0.3s;
        border-bottom: 1px solid;
        border-color: rgba(0,0,0, 0);
        font-size: 12px;
        &:hover {
          border-color: #b4f12f;
        }
      }
    }
  }
  &-links {
    font-weight: 400;
    text-align: center;
    margin: 30px 0;
    &_link {
      color: rgb(255, 122, 0);
      font-weight: 400;
      font-size: 14px;
    }
  }
  &_footer {
    &-login {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 38px;
      padding: 10px 17px;
      border-radius: 200px;
      cursor: pointer;
      font-size: 16px;
      color: #000000;
      font-weight: 700;
      opacity: .8;
      background-color: rgb(255, 122, 0);
      transition: all 0.4s;
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
      &_text {
        font-size: 16px;
        color: #000000;
        font-weight: 700;
        margin-top: 4px;
      }
    }
    &-siging {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding:10px 17px;
      font-weight: 700;
      font-size: 16px;
      border-radius: 200px;
      cursor: pointer;
      opacity: .8;
      transition: all 0.4s;
      margin-top: 15px;
      color: #000000;
      width: 100%;
      border: none;
      outline: none;
      background-color: #b4f12f;
      max-height: 38px;
      &:hover {
        opacity: 1;
      }
      &_loader.lds-spinner {
        transform: scale(0.6);
        div:after {
          top: 13.2px;
          left: 36.8px;
          width: 4.4px;
          height: 14.6px;
          background: #000000;
        }
      }
    }
    &-google-link {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      text-decoration: none;
      width: 100%;
    }
  }
}
</style>
