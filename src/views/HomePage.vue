<template>
  <div>
    <main-content />
    <how-it-works id="how-it-works" />
    <how-it-looks-like id="how-it-looks-like" />
<!--    <safe id="safe" />-->
    <f-a-q id="faq" />
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import MainContent from "../components/MainContent";
import HowItWorks from "../components/HowItWorks";
import girl from '../assets/girl.jpg'
import HowItLooksLike from "../components/HowItLooksLike";
import Safe from "../components/Safe";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  components: {
    Footer,
    FAQ,
    Safe,
    HowItLooksLike,
    HowItWorks,
    MainContent
  },
  props: {
    isRegistration: Boolean,
    referralToken: String,
    token: String,
    isResetPassword: Boolean
  },
  setup(props) {
    const landmarks = []
    const { locale } = useI18n()
    const store = useStore()
    const router = useRouter()
    if (store.getters.isAuthorized) {
      router.push(`/${locale}/generate-girl`)
    }

    if (props.isRegistration) {
      store.commit('addModal', "SignUp")
      store.commit('setReferralLinkForRegister', props.referralToken)
    }

    if (props.isResetPassword) {
      store.commit('addModal', "ResetPassword")
      store.commit('setResetToken', props.token)
    }

    return {
      girl,
      landmarks
    }
  }
}
</script>

<style lang="scss">
.output_canvas {
  width: 100%;
  height: 100%;
}
body {

}
</style>
