<template>
  <div class="verify-profile">
    <h2 class="verify-profile_title">
      {{ $t('verifyEmail.title') }}
      <img
        width="32"
        height="32"
        class="verify-profile_title-icon"
        src="@/assets/icons/done.svg"
        alt="done success"
      />
    </h2>
    <img src="//tsyndicate.com/api/v2/cpa/192272/pixel.gif" />
    <p class="verify-profile_description">{{ $t('verifyEmail.description') }}</p>
    <router-link :to="`/${locale}`" class="verify-profile_button">
      {{ $t('buttons.backHome') }}
    </router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  name: 'VerifyProfile',props: {
    id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const { locale } = useI18n()
    store.dispatch('verifyEmail', { token: props.token })
    return {
      token: props.token,
      locale
    };
  },
}
</script>

<style lang="scss">
.verify-profile {
  text-align: center;
  margin-top: -30px;
  &_title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    &-icon {

    }
  }
  &_description {
    margin-top: 15px;
  }
  &_button {
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: rgba(235,113,0,1);
    height: 35px;
    min-width: 140px;
    margin-top: 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 10px rgba(235,113,0,1);
    cursor: pointer;
    outline: none;
    transition: all .3s;
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    &:hover {
      box-shadow: 1px 2px 25px rgba(235,113,0,1);
    }
  }
}
</style>
