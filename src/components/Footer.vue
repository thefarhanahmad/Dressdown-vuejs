<template>
  <footer id="footer" class="c-footer">
    <div class="c-footer-container">
      <div class="c-footer-head">
        <router-link :to="`/${locale}`" class="c-header-logo">
          <img width="120" src="@/assets/icons/updated-logo.svg" alt="logo icon">
        </router-link>
        <div class="c-footer-head_links">
          <router-link class="c-footer-head_links-item" :to="`/${locale}/about-us`">{{ $t('footer.links.link1') }}</router-link>
          <router-link class="c-footer-head_links-item" :to="`/${locale}/policy`">{{ $t('footer.links.link2') }}</router-link>
          <router-link class="c-footer-head_links-item" :to="`/${locale}/privacy`">{{ $t('footer.links.link3') }}</router-link>
          <router-link class="c-footer-head_links-item" :to="`/${locale}/terms`">{{ $t('footer.links.link4') }}</router-link>
        </div>
      </div>
      <div class="c-footer-body">
        <div class="c-footer-body-svg">
          DATATEH LTD, 20 Wenlock Road, London, England, N1 7GU
        </div>
        <div v-if="currentLang" @click="openLangModal" class="c-footer-body_current-language">
          <img
            v-if="currentLang && currentLang.icon"
            class="c-footer-body_current-language-flag"
            :src="currentLang.icon"
            alt="Eng language English"
          />
          <p>{{ currentLang.value }}</p>
        </div>
      </div>
      <div class="c-footer-down">
        <p>{{ $t('footer.data') }}</p>
        <p>DressDown.AI / 2024 / All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "Footer",
  setup() {
    const { locale } = useI18n()
    const store = useStore()
    const currentLang = computed(() => {
      return store.getters.getLang
    })
    const openLangModal = () => {
      store.commit('addModal', 'ChangeLangModal')
    }
    return {
      locale,
      currentLang,
      openLangModal
    }
  }
}
</script>

<style lang="scss">
  .c-footer {
    padding-top: 28px;
    padding-bottom: 28px;
    background: rgb(22,22,22);
    &-container {
      display: flex;
      flex-direction: column;
      gap: 25px;
      max-width: 95%;
      margin: 0 auto;
    }
    &-head {
      text-align: left;
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 650px) {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      &_links {
        display: flex;
        gap: 20px;
        align-items: center;
        @media screen and (max-width: 550px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        &-item {
          text-decoration: none;

          @media screen and (max-width: 550px) {
            font-size: 14px;
          }
        }
      }
    }
    &-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: 550px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 25px;
      }
      &-svg {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5019607843);
        //@media screen and (max-width: 550px) {
        //  transform: scale(.8) translateX(-50px);
        //}
      }
      &_current-language {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        &-flag {
          width: 28px;
          height: 28px;
        }
      }
    }
    &-down {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 550px) {
        flex-direction: column;
      }
      p {
        font-size: 14px;
        color: #ffffff80;
      }
    }
  }
</style>
