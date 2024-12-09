<template>
  <div class="c-header">
    <Container class="c-header-container">
      <div class="c-header_wrapper">
        <router-link :to="`/${locale}`" class="c-header-logo">
          <img
            width="120"
            src="@/assets/icons/updated-logo.svg"
            alt="logo icon"
          />
        </router-link>
        <nav class="c-header-navigation">
          <template v-if="!isAuth">
            <a
              v-for="link of links"
              :key="link.id"
              class="c-header-navigation_link c-header-navigation_link"
              :class="{ 'c-header-navigation_link--mobile': link.isMobileOnly }"
              :href="link.href"
              >{{ $t(link.text) }}</a
            >
          </template>
          <router-link
            v-if="!isAuth"
            class="c-header-navigation_link c-header-navigation_link--generate"
            :to="`/${locale}/generate-girl`"
          >
            <span class="c-header-navigation_link--sublink">Un</span>dress Girl
          </router-link>
          <template v-if="!isAuth">
            <div
              @click="invokeVideoModal"
              class="c-header-navigation_link c-header-navigation_link"
              style="cursor: pointer"
            >
              <span class="c-header-navigation_link--desktop">{{
                $t("modals.instruction")
              }}</span>
              <span class="c-header-navigation_link--mobile">{{
                $t("modals.instructionMob")
              }}</span>
            </div>
            <div class="c-header-navigation_register" @click="invokeRegister">
              {{ $t("modals.signUp") }}
            </div>
            <div class="c-header-navigation_login" @click="invokeLogin">
              {{ $t("modals.signIn") }}
            </div>
          </template>
          <template v-else>
            <div class="c-header-navigation_register-autorized">
              <!--              <div @click="invokeRecommendation" class="c-header-navigation_link c-header-navigation_link c-header-navigation_link-recommendation" style="cursor: pointer">-->
              <!--                <span>{{ $t('header.recommendation') }}</span>-->
              <!--              </div>-->
              <!--              <div @click="invokeReferralModal" class="c-header-navigation_link c-header-navigation_link c-header-navigation_link-referral">-->
              <!--                <span>{{ $t('header.referral') }}</span>-->
              <!--              </div>-->
              <ProfileMini />
              <div
                v-click-outside="closePopup"
                @click="openPopup"
                class="c-profile-mini_wrapper-profile"
              >
                <img
                  src="@/assets/icons/profile.svg"
                  width="28"
                  height="28"
                  alt="profile user"
                />
              </div>
              <div v-show="isOpen" class="c-profile-mini_popup">
                <div
                  @click="invokeModal('Promocode')"
                  class="c-profile-mini_popup-item"
                >
                  {{ $t("header.activatePromocode") }}
                </div>
                <div
                  @click="invokeVideoModal"
                  class="c-profile-mini_popup-item"
                  style="cursor: pointer"
                >
                  {{ $t("modals.instruction") }}
                </div>
                <div
                  @click="invokeModal('UploadRecommendation')"
                  class="c-profile-mini_popup-item"
                >
                  {{ $t("header.recommendation") }}
                </div>
                <div
                  @click="invokeModal('Referral')"
                  class="c-profile-mini_popup-item"
                >
                  {{ $t("header.referral") }}
                </div>
                <div
                  @click="invokeModal('SupportModal')"
                  class="c-profile-mini_popup-item"
                >
                  {{ $t("header.support") }}
                </div>
                <div
                  @click="handleLogout"
                  class="c-profile-mini_popup-item c-profile-mini_popup-item--logout"
                >
                  Logout
                </div>
              </div>
            </div>
          </template>
        </nav>
        <div class="c-header-mobile_mobile-wrapper">
          <div class="c-header-mobile_options">
            <template v-if="!isAuth">
              <div
                class="c-header-navigation_register"
                :class="{
                  'c-header-navigation_register--small': locale === 'pl',
                }"
                @click="invokeRegister"
              >
                {{ $t("modals.signUp") }}
              </div>
              <div
                class="c-header-navigation_login"
                :class="{
                  'c-header-navigation_register--small': locale === 'pl',
                }"
                @click="invokeLogin"
              >
                {{ $t("modals.signIn") }}
              </div>
            </template>
            <template v-else>
              <div class="c-header-navigation_register-autorized">
                <ProfileMini />
                <div @click="openPopup" class="c-profile-mini_wrapper-profile">
                  <img
                    src="@/assets/icons/profile.svg"
                    width="28"
                    height="28"
                    alt="profile user"
                  />
                </div>
                <div v-show="isOpen" class="c-profile-mini_popup">
                  <div
                    @click="invokeModal('Promocode')"
                    class="c-profile-mini_popup-item"
                  >
                    {{ $t("header.activatePromocode") }}
                  </div>

                  <div
                    @click="invokeVideoModal"
                    class="c-profile-mini_popup-item"
                    style="cursor: pointer"
                  >
                    {{ $t("modals.instruction") }}
                  </div>

                  <div
                    @click="invokeModal('UploadRecommendation')"
                    class="c-profile-mini_popup-item"
                  >
                    {{ $t("header.recommendation") }}
                  </div>
                  <div
                    @click="invokeModal('Referral')"
                    class="c-profile-mini_popup-item"
                  >
                    {{ $t("header.referral") }}
                  </div>
                  <div
                    @click="invokeModal('SupportModal')"
                    class="c-profile-mini_popup-item"
                  >
                    {{ $t("header.support") }}
                  </div>
                  <div
                    @click="handleLogout"
                    class="c-profile-mini_popup-item c-profile-mini_popup-item--logout"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!--          <div @click="isOpenMobileMenu = !isOpenMobileMenu" class="c-header-mobile_burger">-->
          <!--            <img src="@/assets/icons/burger.svg" alt="burger mobile menu nav-menu">-->
          <!--          </div>-->
        </div>
        <!--        <MobileHeader-->
        <!--          v-show="isOpenMobileMenu"-->
        <!--          :links="links"-->
        <!--          @closeMobileMenu="closeMobileMenu"-->
        <!--        />-->
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./Container";
import ProfileMini from "@/components/profile/ProfileMini.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import MobileHeader from "@/components/MobileHeader.vue";
import router from "@/router";
import { useI18n } from "vue-i18n";
export default {
  name: "Header",
  components: {
    MobileHeader,
    Container,
    ProfileMini,
  },
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const route = useRoute();
    const isOpen = ref(false);
    const isAuth = computed(() => {
      return store.getters.isAuthorized;
    });
    const isOpenMobileMenu = ref(false);
    const links = [
      {
        id: 1,
        isMobileOnly: false,
        text: "header.headerNav.link1",
        href: "#how-it-works",
      },
      // { id: 2, isMobileOnly: false, text: 'header.headerNav.link2', href: '' },
      // { id: 3, isMobileOnly: true, text: 'header.headerNav.link3', href: '' },
      {
        id: 4,
        isMobileOnly: false,
        text: "header.headerNav.link4",
        href: "#faq",
      },
      {
        id: 5,
        isMobileOnly: false,
        text: "header.headerNav.link5",
        href: "#footer",
      },
    ];

    const invokeRegister = () => {
      store.commit("addModal", "SignUp");
    };
    const invokeLogin = () => {
      store.commit("addModal", "Login");
    };
    const invokeReferralModal = () => {
      store.commit("addModal", "Referral");
    };
    const invokePromocodeModal = () => {
      store.commit("addModal", "Promocode");
    };

    const invokeRecommendation = () => {
      store.commit("addModal", "UploadRecommendation");
    };
    const closeMobileMenu = () => {
      isOpenMobileMenu.value = false;
    };

    const signOut = () => {
      store.dispatch("logout");
      router.push("/");
    };

    watch(isOpenMobileMenu, (newValue) => {
      if (newValue) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    });

    const openPopup = () => {
      isOpen.value = !isOpen.value;
    };

    const closePopup = () => {
      if (window.innerWidth < 550) {
        return;
      }

      isOpen.value = false;
    };

    const invokeModal = (modalName) => {
      store.commit("addModal", modalName);
      isOpen.value = false;
    };

    const handleLogout = () => {
      store.dispatch("logout");
      isOpen.value = false;
      router.push("/");
    };

    const invokeVideoModal = () => {
      store.commit("addModal", "VideoModal");
    };

    return {
      isOpen,
      links,
      locale,
      isOpenMobileMenu,
      invokeModal,
      invokeVideoModal,
      closePopup,
      invokePromocodeModal,
      handleLogout,
      openPopup,
      invokeRecommendation,
      invokeReferralModal,
      closeMobileMenu,
      invokeRegister,
      invokeLogin,
      signOut,
      isAuth,
      route,
    };
  },
};
</script>

<style lang="scss">
.c-header {
  min-height: 88px;
  display: flex;
  align-items: center;
  position: relative;
  &-container {
    max-width: 95%;
    padding: 24px 24px 24px 40px;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding: 10px 15px;
    }
    @media screen and (max-width: 440px) {
      padding: 10px 0;
    }
    @media screen and (max-width: 350px) {
      max-width: 97%;
    }
  }
  &_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 15px;
    @media screen and (max-width: 450px) {
      width: 90px;
    }
  }
  &-mobile {
    width: 0;
    height: 0;
    transition: all 2.5s;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 400;
    @media screen and (max-width: 1120px) {
      background-color: rgba(0, 0, 0, 0.9);
      min-height: 100vh;
      display: flex;
      height: 100%;
      width: 100%;
    }

    &_mobile-wrapper {
      display: none;
      @media screen and (max-width: 1120px) {
        display: flex;
        align-items: center;
      }
      @media screen and (max-width: 550px) {
        gap: 0;
      }
    }

    &_options {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
    }

    &_burger {
      display: block;
      width: 50px;
      transform: rotate(180deg);
      height: 50px;

      @media screen and (max-width: 350px) {
        width: 35px;
        height: 35px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-navigation {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      gap: 20px;
      position: relative;
    }
    &_close {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
  &-navigation {
    display: flex;
    align-items: center;
    gap: 45px;
    @media screen and (max-width: 1320px) {
      gap: 15px;
    }
    @media screen and (max-width: 1120px) {
      display: none;
    }
    &_link {
      text-decoration: none;
      color: rgb(255, 255, 255);
      font-weight: 600;
      &-bordered {
        cursor: pointer;
        margin-right: 8px;
        border: 1px solid;
        height: 44px;
        padding: 5px 8px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s;
      }
      @media screen and (max-width: 450px) {
        display: flex;
        justify-content: flex-end;
        padding: 0 8px;
        height: 34px;
      }
      @media screen and (max-width: 350px) {
        font-size: 14px;
      }
      @media screen and (max-width: 325px) {
        font-size: 13px;
      }
      &--mobile {
        display: none;
        @media screen and (max-width: 650px) {
          display: block;
        }
      }
      &--desktop {
        @media screen and (max-width: 650px) {
          display: none;
        }
      }
      &:hover {
        opacity: 0.75;
      }
      &--sublink {
        color: #b4f12f;
        border-bottom: 1px solid #ffffff;
      }
      &--generate {
        transition: all 0.3s;
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        &:hover {
          border-bottom: 2px solid #ffffff;
          .c-header-navigation_link--sublink {
            border: none;
          }
        }
      }
      &:hover {
        opacity: 0.75;
      }
      &-recommendation {
        margin-left: 45px;
        @media screen and (max-width: 1320px) {
          margin-left: 15px;
        }
      }
      &-referral {
        cursor: pointer;
        margin: 0 45px;
        @media screen and (max-width: 1320px) {
          margin: 0 15px;
        }
      }
    }
    &_register {
      height: 35px;
      background-color: rgba(235, 113, 0, 1);
      color: #000000;
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 5px 15px;
      cursor: pointer;
      transition: opacity 0.3s;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      @media screen and (max-width: 390px) {
        height: 30px;
        padding: 3px 8px;
        font-size: 14px;
      }
      &-autorized {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: flex-end;
        margin-right: 5px;
        &-icon {
          width: 35px;
          height: 35px;
          margin-left: 16px;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 0.3s;
          @media screen and (max-width: 370px) {
            margin-left: 8px;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
      &--small {
        @media screen and (max-width: 380px) {
          font-size: 13px !important;
        }
      }
    }
    &_login {
      height: 35px;
      background-color: #b4f12f;
      color: #000000;
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 5px 15px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
      }
      @media screen and (max-width: 390px) {
        height: 30px;
        padding: 3px 8px;
        font-size: 14px;
      }
    }
  }
  &-subtitle {
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    span {
      color: #b4f12f;
    }
  }
  &-title {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
