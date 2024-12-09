<template>
  <ModalWrapper :model-name="modelName">
    <div class="c-registration-signup m-upload-recommendation">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.recommendation.title') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="m-upload-recommendation_slider">
        <Swiper
          :modules="modules"
          :autoHeight="true"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :navigation="{ nextEl: '.recommendation-button-next', prevEl: '.recommendation-button-prev' }"
          :slidesPerView="1"
          space-between="15"
          @slideChange="onSlideChange"
        >
          <SwiperSlide v-for="(item, index) in cars" :key="index">
            <div class="m-upload-recommendation_slider-slide">
              <div class="m-upload-recommendation_slider-slide-photos">
                <div class="m-upload-recommendation_slider-slide-photos_image">
                  <img :src="item.imgGood" alt="good recommended image">
                  <div class="m-upload-recommendation_slider-slide-photos_image-type good">{{ $t('modals.recommendation.good') }}</div>
                </div>
                <div class="m-upload-recommendation_slider-slide-photos_image">
                  <img :src="item.imgBad" alt="good recommended image">
                  <div class="m-upload-recommendation_slider-slide-photos_image-type bad">{{ $t('modals.recommendation.bad') }}</div>
                </div>
              </div>
              <div class="m-upload-recommendation_slider-slide-text">
               {{ item.title }}
              </div>
              <Checkbox
                v-model="isSHowAgain"
                v-show="item.isShowCheckBox"
                @change="dontShowAgain"
                class="m-upload-recommendation_slider-checkbox"
                id="dontShow"
                label="recommendationPopup.dontShow"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination"></div>
      </div>
      <div class="recommendation-buttons-wrapper">
        <button class="recommendation-button-prev recommendation-button">{{ $t('navigation.prev') }}</button>
        <button v-show="currentSlide !== 2" class="recommendation-button-next recommendation-button">{{ $t('navigation.next') }}</button>
        <button
          @click="onClose"
          v-show="currentSlide === 2"
          class="recommendation-button-next-close recommendation-button"
        >
          {{ $t('buttons.close') }}
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import TextField from "@/components/forms/TextField.vue";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Thumbs, Pagination, Navigation, EffectFade } from "swiper";
import 'swiper/swiper-bundle.css';
import Checkbox from "@/components/forms/Checkbox.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import recomendation1Good from '@/assets/recomendationPhoto/1/1.png'
import recomendation1Bad from '@/assets/recomendationPhoto/1/2.png'

import recomendation2Good from '@/assets/recomendationPhoto/2/1.png'
import recomendation2Bad from '@/assets/recomendationPhoto/2/2.png'

import recomendation3Good from '@/assets/recomendationPhoto/3/1.png'
import recomendation3Bad from '@/assets/recomendationPhoto/3/2.png'

export default {
  name: 'UploadRecommendation',
  components: {
    Checkbox,
    ModalWrapper,
    TextField,
    Swiper,
    SwiperSlide
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup () {
    const store = useStore()
    const { t } = useI18n()
    const isSHowAgain = ref(false)
    const onClose = () => {
      currentSlide.value = 0
      store.commit('removeModal')
    }

    const dontShowAgain = (event) => {
      const value = event.target.checked
      if (value) {
        localStorage.setItem('isShowRecommendationPopup', value)
      } else {
        localStorage.removeItem('isShowRecommendationPopup')
      }
    }

    const currentSlide = ref(0);

    const onSlideChange = (swiper) => {
      currentSlide.value = swiper.activeIndex;
    };

    const cars = [
      { id: 0, title: t('recommendationPopup.popup1'), imgGood: recomendation1Good, imgBad: recomendation1Bad, isShowCheckBox: false  },
      { id: 1, title: t('recommendationPopup.popup2'), imgGood: recomendation2Good, imgBad: recomendation2Bad, isShowCheckBox: false  },
      { id: 2, title: t('recommendationPopup.popup3'), imgGood: recomendation3Good, imgBad: recomendation3Bad, isShowCheckBox: true  }
    ]

    return {
      isSHowAgain,
      cars,
      currentSlide,
      onClose,
      onSlideChange,
      dontShowAgain,
      modules: [EffectFade, Thumbs, Pagination, Navigation],
    }
  }
}
</script>

<style lang="scss">
.m-upload-recommendation {
  height: 100%;
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 550px) {
    min-height: 550px;
  }

  @media screen and (max-width: 670px) {
    width: 450px;
  }
  @media screen and (max-width: 480px) {
    width: 95vw;
    padding: 20px 15px;
  }

  @media screen and (max-height: 560px) {
    overflow: auto;
    height: 90vh;
    min-height: auto;
  }

  &_slider {
    position: relative;
    cursor: grab;
    transition: all .5s;
    &-checkbox {
      margin: 10px 0;
      padding-left: 5px;
      &-removed {
        height: 35px;
        width: 100%;
      }
    }
    &-slide {
      display: flex;
      flex-direction: column;
      min-height: 345px;

      &-photos {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 15px;

        &_image {
          position: relative;
          height: 310px;
          width: 100%;
          background-color: #333333;
          @media screen and (max-width: 550px) {
            height: 260px;
          }
          @media screen and (max-width: 350px) {
            height: 240px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &-type {
            position: absolute;
            background: rgba(0,0,0, .4);
            left: 50%;
            top: 80%;
            width: 60%;
            height: 35px;
            display: flex;
            align-items: center;
            border-radius: 8px;
            justify-content: center;
            padding: 10px 0;
            transform: translateX(-50%);
            font-weight: 600;
            &.good {
              color: #b4f12f;
            }
            &.bad {
              color: #d32d2d;
            }
          }
        }
      }
      &-text {
        max-width: 98%;
        margin: 0 auto;
        opacity: .66;
      }
    }
  }
  .recommendation-buttons-wrapper {
    display: flex;
    width: 100%;
    gap: 25px;
  }
  .recommendation-button {
    width: 50%;
    border: none;
    outline: none;
    color: black;
    height: 30px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    text-transform: capitalize;
    &-prev {
      background: #d32d2d;
      color: #FFFFFF;
    }
    &-next {
      background: #b4f12f;
      &-close {
        background: #b4f12f;
      }
    }
  }

  .swiper-pagination {
    text-align: center;
    position: relative;
    margin: 15px auto;
  }
  .swiper-pagination-bullet {
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #b4f12f;
  }
}
</style>
