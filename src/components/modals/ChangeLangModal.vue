<template>
  <ModalWrapper :model-name="modelName">
    <div class="m-change-lang">
      <div class="add-cash-modal-head">
        <p class="add-cash-modal-head_title">
          {{ $t('modals.lang') }}
        </p>
        <div @click="onClose" class="add-cash-modal-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="m-change-lang-body">
        <div
          v-for="lang of languages"
          :key="lang.id"
          :class="{'m-change-lang_item--current-lang': lang.key === locale}"
          class="m-change-lang_item"
          @click="changeLocale(lang)"
        >
          <img
            class="m-change-lang_item-flag"
            :src="lang.icon"
            :alt="lang.key"
          />
          <p class="m-change-lang_item-title">
            {{ lang.value }}
          </p>
          <div class="m-change-lang_item-choice">
            <img
              v-show="lang.key === locale"
              class="m-change-lang_item-choice-icon"
              src="@/assets/icons/completed.svg"
              alt="completed, set, done"
            />
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";
import engFlag from '@/assets/icons/flags/eng.svg'
import jaFlag from '@/assets/icons/flags/japan-flag.svg'
import spainFlag from '@/assets/icons/flags/spain-flag.svg'
import trFlag from '@/assets/icons/flags/turkey-flag.svg'
import swFlag from '@/assets/icons/flags/sweeden-flag.svg'
import itFlag from '@/assets/icons/flags/italy-flag.svg'
import ptFlag from '@/assets/icons/flags/brazil-flag.svg'
import frFlag from '@/assets/icons/flags/france-flag.svg'
import rusFlag from '@/assets/icons/flags/russia-flag.svg'
import uaFlag from '@/assets/icons/flags/ukraine-flag.svg'
import aeFlag from '@/assets/icons/flags/united-arab-emirates-flag.svg'
import plFlag from '@/assets/icons/flags/poland-flag.svg'
import norwayFlag from '@/assets/icons/flags/norway-flag.svg'
import { useI18n } from "vue-i18n";
import { useCookies } from 'vue3-cookies'
import { useRouter } from "vue-router";


export default {
  name: 'ChangeLangModal',
  components: {
    ModalWrapper
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const { router } = useRouter()
    const { locale } = useI18n()
    const i18nRedirectedCookie = useCookies('i18n_redirected')
    const languages = [
      { id: 0, icon: engFlag, key: 'en', value: 'English' },
      { id: 1, icon: spainFlag, key: 'es', value: 'Español' },
      { id: 2, icon: jaFlag, key: 'ja', value: '日本語' },
      { id: 3, icon: trFlag, key: 'tr', value: 'Türkçe' },
      { id: 4, icon: norwayFlag, key: 'no', value: 'Norsk' },
      { id: 5, icon: swFlag, key: 'sv', value: 'Svenska' },
      { id: 6, icon: itFlag, key: 'it', value: 'Italiano' },
      { id: 7, icon: ptFlag, key: 'pt', value: 'Português' },
      { id: 8, icon: frFlag, key: 'fr', value: 'Français' },
      { id: 9, icon: uaFlag, key: 'ua', value: 'Українська' },
      { id: 10, icon: rusFlag, key: 'ru', value: 'Русский' },
      { id: 11, icon: aeFlag, key: 'ar', value: 'العربية' },
      { id: 12, icon: plFlag, key: 'pl', value: 'Polski' },
    ]
    const savedLocale = localStorage.getItem('nwLocale')
    const currentLocale = languages.find(lang => savedLocale === lang.key || lang.key === locale.value)
    if (locale.value !== 've' || currentLocale) {
      store.commit('setLang', currentLocale)
    } else {
      store.commit('setLang', { id: 0, icon: engFlag, key: 'en', value: 'English' })
    }

    const onClose = () => {
      store.commit('removeAllModal')
      emit('closeModal')
    }

    const changeLocale = (lang) => {
      store.commit('setLang', lang)
      locale.value = lang.key
      i18nRedirectedCookie.value = lang.key
      localStorage.setItem('nwLocale', lang.key)
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang.key}`) || `/${lang.key}${currentPath}`;
      window.history.replaceState({}, '', newPath);
      onClose()
    }

    return {
      changeLocale,
      onClose,
      locale,
      languages
    }
  }
}
</script>

<style lang="scss">
.m-change-lang {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 430px;
  @media screen and (max-width: 900px) {
    width: 95%;
  }

  @media screen and (max-height: 760px) {
    overflow: auto;
    height: 90vh;
  }

  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding: 20px 8px;
    margin-bottom: 10px;
    border: 1px solid;
    border-color: rgba(0,0,0, 0);
    border-radius: 8px;
    cursor: pointer;
    &-flag {
      width: 28px;
      height: 28px;
    }
    &-choice {
      width: 24px;
      height: 24px;
      &-icon {
        width: 100%;
        height: 100%;
      }
    }
    &--current-lang {
      border: 1px solid white;
      border-radius: 8px;
      background-color: rgb(22, 22, 22);
      box-shadow: 0 5px 8px rgb(129, 125, 125, 40%);
    }
  }
}
</style>
