<template>
  <div class="c-main">
    <Container class="c-main-container">
      <div class="c-main_wrapper">
        <div class="c-main_wrapper-info">
          <h1 class="c-main_wrapper-info-headline-1">
            <span>{{ $t('main.capitalTitle') }}</span>{{ $t('main.secondLogoTitle') }}<span>{{ $t('main.capitalTitle') }}</span>{{ $t('main.firstLogoTitle') }}&nbsp;
            <br>
            {{ $t('main.title') }}
          </h1>
          <div class="c-main_wrapper-info_desc">
            <h2 class="c-main_wrapper-info_desc-headline-2">
              {{ $t('main.headDesc') }}
              <br />
              {{ $t('main.bodyDesc') }}
            </h2>
          </div>
          <Button
            class="c-main_wrapper-info_button"
            @click="openModal"
            text="buttons.main"
          />
        </div>
        <div class="c-main_wrapper-video w-50">
          <video
            autoplay
            loop
            muted
            playsinline=""
            preload="auto"
            class="c-main_wrapper-info_video"
          >
              <source src="../assets/videos/main-video.mp4" type="video/mp4">
          </video>
<!--          b4f12f-->
        </div>
      </div>
      <div class="c-main_card-wrapper">
        <div class="c-main_card-wrapper_item" v-for="image of images" :key="image.id">
          <AdvantageCard :main-title="image.title" :description="image.description">
            <img :src="image.src" alt="smile from advantages">
          </AdvantageCard>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./layout-positions/Container";
import Button from "./Button";
import AdvantageCard from "./AdvantageCard";
import dance from '../assets/icons/dance-smile.svg'
import starSmile from '../assets/icons/star-eyes.svg'
import verf from '../assets/icons/verified.svg'
import { useStore } from 'vuex'
export default {
  name: "MainContent",
  components: {
    AdvantageCard,
    Button,
    Container
  },
  setup () {
    const store = useStore()
    const images = [
      { id: 0, src: dance, title: 'advantages.title1', description: 'advantages.description1' },
      { id: 1, src: starSmile, title: 'advantages.title2', description: 'advantages.description2' },
      { id: 2, src: verf, title: 'advantages.title3', description: 'advantages.description3'  }
    ]

    const openModal = () => {
      store.commit('addModal', 'SignUp')
    }

    return {
      images,
      openModal
    }
  }
}
</script>

<style lang="scss">
  .c-main {
    overflow: hidden;
    &_wrapper {
      display: flex;
      align-items: flex-start;
      padding-left: 20px;
      padding-right: 20px;
      @media screen and (max-width: 1100px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      &-info {
        width: 50%;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        @media screen and (max-width: 1100px) {
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
        }
        @media screen and (max-width: 950px) {
          gap: 0;
        }
        &-headline-1 {
          font-size: 64px;
          line-height: 64px;
          font-weight: 600;
          span {
            color: #b4f12f;
          }
          @media screen and (max-width: 950px) {
            font-size: 36px;
          }
        }
        &_button {
          width: max-content;
        }
        &_desc {
          max-width: 340px;
          &-headline-2 {
            font-size: 20px;
            font-weight: 500;
            line-height: 32px;
            @media screen and (max-width: 950px) {
              font-size: 18px;
              margin-bottom: 15px;
            }
          }
        }
        &_video {
          max-width: 850px;
          position: absolute;
          top: -3rem;
          z-index: -1;
          right: -12rem;

          @media screen and (max-width: 1100px) {
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 100%;
            max-width: 100%;
            position: relative;
            display: flex;
            left: 0;
            top: 0;
          }
        }
      }
      &-video {
        position: relative;
        @media screen and (max-width: 1100px) {
          justify-content: center;
          align-items: center;
          text-align: center;
          max-width: 100%;
          height: auto;
          width: 100% !important;
          position: relative;
          display: flex;
          left: 0;
          top: 0;
        }
        @media screen and (max-width: 950px) {
          width: 80% !important;
          margin: 20px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 0;
        }
        @media screen and (max-width: 550px) {
          width: 100% !important;
        }
      }
    }
    &_card-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      @media screen and (max-width: 1100px) {
        gap: 20px;
        justify-content: center;
      }
      @media screen and (max-width: 825px) {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      &_item {
        backdrop-filter: blur(48px);
        &:nth-child(2) {
          margin: 0 20px;
        }
        @media screen and (max-width: 825px) {
          width: 90%;
        }
      }
    }
  }
</style>
