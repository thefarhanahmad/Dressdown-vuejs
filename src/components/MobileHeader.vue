<template>
  <div class="c-header-mobile">
    <nav class="c-header-mobile-navigation">
      <template v-if="!isAuth">
        <a
          v-for="link of links"
          :key="link.id"
          @click="closeMenu"
          class="c-header-navigation_link"
          :class="{ 'c-header-navigation_link--mobile': link.isMobileOnly }"
        >
          {{ $t(link.text) }}
        </a>
      </template>
      <router-link
        @click="closeMenu"
        class="c-header-navigation_link c-header-navigation_link--generate"
        :to="`/generate-girl`"
      >
        <span class="c-header-navigation_link--sublink">Un</span>dress Girl
      </router-link>
      <div
        v-if="isAuth"
        @click="invokePromocodeModal"
        class="c-header-navigation_link c-header-navigation_link"
      >
        <span>{{ $t("header.activatePromocode") }}</span>
      </div>
      <div
        @click="invokeVideoModal"
        class="c-header-navigation_link c-header-navigation_link-bordered"
        style="cursor: pointer"
      >
        <span class="c-header-navigation_link--desktop">{{
          $t("modals.instruction")
        }}</span>
        <span class="c-header-navigation_link--mobile">{{
          $t("modals.instructionMob")
        }}</span>
      </div>
      <div
        v-if="isAuth"
        @click="invokeRecommendation"
        class="c-header-navigation_link c-header-navigation_link c-header-navigation_link-referral"
      >
        <span>{{ $t("header.recommendation") }}</span>
      </div>
      <div
        v-if="isAuth"
        @click="invokeReferralModal"
        class="c-header-navigation_link c-header-navigation_link c-header-navigation_link-referral"
      >
        <span>{{ $t("header.referral") }}</span>
      </div>
      <div
        @click="invokeSupportModal"
        class="c-header-navigation_link c-header-navigation_link c-header-navigation_link-referral"
      >
        <span>{{ $t("header.support") }}</span>
      </div>
      <div @click="closeMenu" class="c-header-mobile_close">
        <img src="@/assets/icons/close.svg" alt="close close-menu ui-kit" />
      </div>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ProfileMini from "@/components/profile/ProfileMini.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "MobileHeader",
  components: {
    ProfileMini,
  },
  props: {
    links: Array,
  },
  setup(_, { emit }) {
    const store = useStore();
    const { locale } = useI18n();
    const isAuth = computed(() => {
      return store.getters.isAuthorized;
    });
    const invokeRegister = () => {
      store.commit("addModal", "SignUp");
      closeMenu();
    };
    const invokeLogin = () => {
      store.commit("addModal", "Login");
      closeMenu();
    };
    const invokeReferralModal = () => {
      store.commit("addModal", "Referral");
      closeMenu();
    };
    const invokeSupportModal = () => {
      store.commit("addModal", "SupportModal");
      closeMenu();
    };
    const invokePromocodeModal = () => {
      store.commit("addModal", "Promocode");
      closeMenu();
    };
    const invokeRecommendation = () => {
      store.commit("addModal", "UploadRecommendation");
      closeMenu();
    };

    const closeMenu = () => {
      emit("closeMobileMenu");
    };
    return {
      invokePromocodeModal,
      invokeSupportModal,
      invokeRecommendation,
      invokeReferralModal,
      isAuth,
      locale,
      closeMenu,
      invokeRegister,
      invokeLogin,
    };
  },
};
</script>

<style scoped lang="scss"></style>
