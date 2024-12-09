<template>
  <Header v-show="isShowFooter" />
  <router-view />
  <SignUp modelName="SignUp" />
  <AuthFormSignUp modelName="AuthSignUp" />
  <Login modelName="Login" />
  <AddCash modelName="Cash" />
  <ForgotPassword modelName="ForgotPassword" />
  <RedirectingModal modelName="RedirectModal" />
  <ZoomImage modelName="ZoomImage" />
  <Referral modelName="Referral" />
  <PromoCode modelName="Promocode" />
  <ChangeLangModal modelName="ChangeLangModal" />
  <UploadRecommendation modelName="UploadRecommendation" />
  <ResetPassword model-name="ResetPassword" />
  <InfoAboutPremiumContent model-name="InfoAboutPremiumContent" />
  <Support model-name="SupportModal" />
  <Guide model-name="Guide" />
  <VideoModal model-name="VideoModal" />
  <Footer v-show="isShowFooter" />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  scroll-behavior: smooth;
  color: white;
}

#app {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.Toastify .Toastify__toast-container .Toastify__toast-body  .toast-content {
  color: #000000 !important;
}

p {
  font-size: 16px;
}

body {
  background-color: rgb(0,0,0);
  user-select: none;
}
</style>
<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Header from "./components/layout-positions/Header";
import Footer from "./components/Footer";
import SignUp from "./components/modals/SignUp";
import AuthFormSignUp from "./components/modals/AuthFormSignUp";
import Login from "@/components/modals/Login.vue";
import ForgotPassword from "@/components/modals/ForgotPassword.vue";
import AddCash from "@/components/modals/AddCash.vue";
import RedirectingModal from "@/components/modals/RedirectingModal.vue";
import ZoomImage from "@/components/modals/ZoomImage.vue";
import Referral from "@/components/modals/Referral.vue";
import PromoCode from "@/components/modals/PromoCode.vue";
import ChangeLangModal from "@/components/modals/ChangeLangModal.vue";
import UploadRecommendation from "@/components/modals/UploadRecommendation.vue";
import { useI18n } from "vue-i18n";
import ResetPassword from "@/components/modals/ResetPassword.vue";
import InfoAboutPremiumContent from "@/components/modals/InfoAboutPremiumContent.vue";
import Support from "@/components/modals/Support.vue";
import Guide from "@/components/modals/Guide.vue";
import VideoModal from "@/components/modals/VideoModal.vue";
export default {
  components: {
    VideoModal,
    Guide,
    Support,
    InfoAboutPremiumContent,
    ResetPassword,
    ChangeLangModal,
    PromoCode,
    Referral,
    ZoomImage,
    RedirectingModal,
    AddCash,
    ForgotPassword,
    Login,
    AuthFormSignUp,
    UploadRecommendation,
    SignUp,
    Header,
    Footer
  },
  setup () {
    const route = useRoute();
    const store = useStore();
    const token = localStorage.getItem('token')
    const isInOrder = localStorage.getItem('order-id')
    const intervalStatus = ref(null)
    const { locale } = useI18n()
    const initialize = async () => {
      await store.commit('setToken', token)
      await store.dispatch('getMyRefLink')
      await store.dispatch('getUserProfile')
    }

    if (token) {
     initialize()
    }
    if (isInOrder) {
      intervalStatus.value = setInterval(async () => {
        const response = await store.dispatch('checkStatus');
        if (response && response.image_url) {
          clearInterval(intervalStatus.value);
          intervalStatus.value = null;
          store.commit('clearOrderId')
        }
      }, 15000);
      store.commit('setOrderId', isInOrder)
    }
    const isShowFooter = ref(true);

    const updateFooterVisibility = () => {
      isShowFooter.value = route.fullPath !== '/edit';
    };

    updateFooterVisibility();

    watch(route, () => {
      updateFooterVisibility();
    });

    const isHaveSomeModal = computed(() => {
      return !!store.getters.getModalList.length
    })

    watch(isHaveSomeModal, (newValue) => {
      if (newValue) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    })


    return {
      isShowFooter,
      intervalStatus
    }
  }
}
</script>

<style>
.grecaptcha-badge {
  display: none !important;
}
</style>
