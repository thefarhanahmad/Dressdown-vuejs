<template>
  <div class="c-safe">
    <Container>
      <div class="c-safe-wrapper">
        <div class="c-safe-wrapper_img">
          <img src="../assets/Image_4.png" alt="safe lock">
        </div>
        <div class="c-safe-wrapper_text">
          <h1 class="c-safe-wrapper_headline">
            {{ $t('safe.title1') }}
            <br />
            {{ $t('safe.title2') }}
            <br />
            {{ $t('safe.title3') }}
          </h1>
          <h2 class="c-safe-wrapper_subtitle">
            {{ $t('safe.text1') }}
            <br />
            {{ $t('safe.text2') }}
          </h2>
          <Button @click="openModal" text="buttons.forFree"></Button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Container from "./layout-positions/Container";
import Button from "./Button";
export default {
  name: "Safe",
  components: {Button, Container},
  setup () {
    const store = useStore()
    const openModal = () => {
      store.commit('addModal', 'SignUp')
    }

    return {
      openModal
    }
  }
}
</script>

<style lang="scss">
.c-safe {
  padding: 0 20px;
  @media screen and (max-width: 550px) {
    padding: 50px 20px 0 20px;
  }
  &-wrapper {
    display: flex;
    align-items: center;
    gap: 60px;
    justify-content: space-evenly;
    padding-bottom: 60px;
    @media screen and (max-width: 950px) {
      gap: 30px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      padding-top: 30px;
    }
    @media screen and (max-width: 550px) {
      gap: 0;
    }
    &_img {
      img {
        width: 100%;
        @media screen and (max-width: 550px) {
          width: 100%;
        }
      }
    }
    &_text {
      display: flex;
      flex-direction: column;
      gap: 48px;
      @media screen and (max-width: 550px) {
        align-items: center;
        gap: 24px;
      }
    }
    &_headline {
      font-size: 64px;
      line-height: 64px;
      @media screen and (max-width: 950px) {
        font-size: 44px;
        br {
          display: none;
        }
      }
      @media screen and (max-width: 550px) {
        font-size: 36px;
        text-align: center;
        max-width: 95%;
        line-height: 1;
      }
    }
    &_subtitle {
      line-height: 24px;
      font-size: 16px;
      color: #fff9;
      font-weight: 100;
      width: 300px;
      @media screen and (max-width: 550px) {
        text-align: center;
      }
    }
  }
}
</style>
