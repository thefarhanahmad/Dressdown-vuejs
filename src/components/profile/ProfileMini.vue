<template>
  <div @click="addCash" class="c-profile-mini">
    <div class="c-profile-mini_wrapper">
      <img
        src="@/assets/small-logo.png"
        width="28"
        height="28"
        alt="profile user icon"
      />
    </div>
    <div class="c-profile-mini_balanced">
      <div class="c-profile-mini_balanced-add">
        <img
          src="@/assets/icons/plus.svg"
          width="32"
          height="32"
          alt="plus add icon"
        />
      </div>
      <!-- <span class="c-profile-mini_balanced-count-item">{{ myBalance }}</span> -->
      <div class="c-profile-mini_balanced-count">
        <span class="c-profile-mini_balanced-count-title">{{
          $t("modals.addCashBtn")
        }}</span>
      </div>
    </div>
    <!--    <div v-show="isOpen" class="c-profile-mini_popup">-->
    <!--      <div @click="invokeModal('Promocode')" class="c-profile-mini_popup-item">-->
    <!--        {{ $t('header.activatePromocode') }}-->
    <!--      </div>-->
    <!--      <div @click="invokeModal('UploadRecommendation')" class="c-profile-mini_popup-item">-->
    <!--        {{ $t('header.recommendation') }}-->
    <!--      </div>-->
    <!--      <div @click="invokeModal('Referral')" class="c-profile-mini_popup-item">-->
    <!--        {{ $t('header.referral') }}-->
    <!--      </div>-->
    <!--      <div @click="invokeModal('SupportModal')" class="c-profile-mini_popup-item">-->
    <!--        {{ $t('header.support') }}-->
    <!--      </div>-->
    <!--      <div @click="handleLogout" class="c-profile-mini_popup-item c-profile-mini_popup-item&#45;&#45;logout">-->
    <!--        Logout-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "ProfileMini",
  setup() {
    const store = useStore();
    const isOpen = ref(false);
    const openPopup = () => {
      isOpen.value = !isOpen.value;
    };
    const closePopup = () => {
      isOpen.value = false;
    };
    const addCash = () => {
      store.commit("addModal", "Cash");
    };

    const handleLogout = () => {
      store.dispatch("logout");
    };

    const myBalance = computed(() => {
      return store.getters.getMyBalance;
    });

    const invokeModal = (modalName) => {
      store.commit("addModal", modalName);
      isOpen.value = false;
    };

    return {
      invokeModal,
      closePopup,
      handleLogout,
      addCash,
      openPopup,
      myBalance,
      isOpen,
    };
  },
};
</script>

<style lang="scss">
.c-profile-mini {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 32px;
  border-radius: 8px;
  border: 1px solid #ffffff;
  cursor: pointer;
  overflow: visible;

  @media screen and (max-width: 550px) {
    padding: 5px 8px;
  }
  @media screen and (max-width: 450px) {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding: 0px 16px;
  }

  &:hover {
    border-color: #b4f12f;
  }

  &_wrapper {
    display: none;
    img {
      margin-bottom: -5px;
    }
    @media screen and (max-width: 450px) {
      //display: none;
    }
    &-profile {
      cursor: pointer;
      margin-left: 8px;
      width: 50px;
      border: 1px solid;
      height: 44px;
      padding: 5px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.3s;
      &:hover {
        opacity: 0.75;
      }
      img {
        width: 100%;
        height: 100%;
      }
      @media screen and (max-width: 450px) {
        display: flex;
        justify-content: flex-end;
        padding: 0 8px;
        width: 44px;
        height: 34px;
      }
    }
  }

  &_balanced {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 18px;
    @media screen and (max-width: 450px) {
      justify-content: center;
      width: auto;
      gap: 2px;
    }
    &-count {
      &-title {
        //text-transform: uppercase;
        @media screen and (max-width: 550px) {
        }
      }
      &-item {
        margin-left: 5px;
        @media screen and (max-width: 550px) {
          margin-left: 0;
        }
      }
    }
    &-add {
      @media screen and (max-width: 450px) {
        width: 32px;
        height: 32px;
        transform: scale(0.8);
      }
      img {
        display: block;
        transform: scale(0.9);
        @media screen and (max-width: 450px) {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &_popup {
    position: absolute;
    right: 0;
    top: 55px;
    width: 230px;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    @media screen and (max-width: 550px) {
    }
    @media screen and (max-width: 450px) {
      left: auto;
    }
    &-item {
      color: #ffffff;
      padding: 8px 15px;

      &:hover {
        background-color: #b4f12f;
        color: #000000;
      }

      &--logout {
        color: red;
      }
    }
  }
}
</style>
