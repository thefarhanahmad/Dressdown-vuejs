<template>
  <ModalWrapper :model-name="modelName">
    <div class="m-guide">
      <div class="m-guide-head">
        <div class="m-guide-head-holder">
          <p class="m-guide-head_title">
            <span class="m-guide-head-green-word">{{
              $t("guide.mainWord")
            }}</span>
            {{ $t("guide.title") }}
          </p>
        </div>
        <div @click="onClose" class="m-guide-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove" />
        </div>
      </div>
      <div class="m-guide-steps">
        <GuideStep
          v-for="step of steps"
          :key="step.id"
          :title="step.title"
          :percentage="step.value"
          :count="step.id"
          :currentStep="activeStep"
        />
      </div>
      <div class="m-guide-view">
        <Swiper
          ref="mySwiper"
          class="m-guide-swiper-holder"
          v-show="activeStep === 200"
          :modules="modules"
          :loop="false"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :navigation="{
            nextEl: '.button-next',
            prevEl: '.recommendation-button-prev',
          }"
          :speed="600"
          space-between="15"
          @slideChange="onSlideChange"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              autoHeight: true,
            },
            750: {
              slidesPerView: 3,
              autoHeight: false,
            },
          }"
        >
          <SwiperSlide
            @click="handleClick(girl.value)"
            v-for="(girl, index) of girlsList"
            :key="girl.id"
          >
            <div
              class="m-guide-first-step-slide"
              :class="{
                'm-guide-first-step-slide--active': activeGirl === girl.value,
              }"
            >
              <img :src="girl.image" draggable="false" alt="girl for guide" />
              <div class="m-guide-swiper-holder_index">
                {{ index + 1 }}/{{ girlsList.length }}
              </div>
            </div>
          </SwiperSlide>
          <div v-show="currentSlide !== 2" class="button-next">
            <img src="@/assets/icons/right-arrow.svg" alt="next slide arrow" />
          </div>
          <div class="swiper-pagination"></div>
        </Swiper>
        <Swiper
          v-show="activeStep === 300"
          class="m-guide-swiper-holder"
          :modules="modules"
          :speed="600"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :navigation="{
            nextEl: '.button-next',
            prevEl: '.recommendation-button-prev',
          }"
          :slidesPerView="3"
          spaceBetween="15"
          @slideChange="onSlideChange"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              autoHeight: true,
            },
            750: {
              slidesPerView: 3,
              autoHeight: false,
            },
          }"
        >
          <SwiperSlide
            v-for="(format, index) of formatOfUndress"
            :key="format.id"
            @click.stop="activeFormat = format.value"
          >
            <div
              class="m-guide-first-step-slide"
              :class="{
                'm-guide-first-step-slide--active':
                  activeFormat === format.value,
              }"
            >
              <img draggable="false" :src="format.image" alt="girl for guide" />
              <div class="m-guide-swiper-holder_index">
                {{ index + 1 }}/{{ formatOfUndress.length }}
              </div>
            </div>
          </SwiperSlide>
          <div v-show="currentSlide !== 2" class="button-next">
            <img src="@/assets/icons/right-arrow.svg" alt="next slide arrow" />
          </div>
          <div class="swiper-pagination"></div>
        </Swiper>
        <div class="m-guide-view_finish" v-show="activeStep === 400">
          <img
            class="m-guide-view_image"
            :src="returnFinishResult"
            alt="finish result guid"
            draggable="false"
          />
        </div>
      </div>
      <button
        v-show="activeStep !== 400"
        @click="activeStep += 100"
        class="m-guide_button"
      >
        Next Step
      </button>
      <button
        v-show="activeStep === 400"
        @click="onClose"
        class="m-guide_button"
      >
        Let's create your first image
      </button>
    </div>
  </ModalWrapper>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Thumbs, Pagination, Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import guidePreview from "@/assets/guide-preview.png";
import guideDone from "@/assets/icons/guide-done.svg";
/* Girls for First Slide */
import girl1FirstSlide from "@/assets/guide/girlForCheck1.jpg";
import girl2FirstSlide from "@/assets/guide/girlForCheck2.jpg";
import girl3FirstSlide from "@/assets/guide/girlForCheck3.jpg";
/* Girls for Second Slide */
import girlSecondSlide1 from "@/assets/guide/girlSecondSlide1.png";
import girlSecondSlide2 from "@/assets/guide/girlSecondSlide2.png";
import girlSecondSlide3 from "@/assets/guide/girlSecondSlide3.png";
/* First Girl Finish */
import firstGirlResult1 from "@/assets/guide/allTypesOfFirstGirl/underwear.png";
import firstGirlResult2 from "@/assets/guide/allTypesOfFirstGirl/dickpic.png";
import firstGirlResult3 from "@/assets/guide/allTypesOfFirstGirl/undress.png";
/* Second Girl Finish */
import secondGirlResult1 from "@/assets/guide/allTypesOfSecondGirl/underwear.png";
import secondGirlResult2 from "@/assets/guide/allTypesOfSecondGirl/dickpic.png";
import secondGirlResult3 from "@/assets/guide/allTypesOfSecondGirl/undress.jpg";
/* Third Girl Finish */
import thirdGirlResult1 from "@/assets/guide/allTypesOfThirdGirl/underwear.png";
import thirdGirlResult2 from "@/assets/guide/allTypesOfThirdGirl/dickpic.png";
import thirdGirlResult3 from "@/assets/guide/allTypesOfThirdGirl/undress.png";
import "swiper/swiper-bundle.css";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import GuideStep from "@/components/childs/GuideStep.vue";
export default {
  name: "Guide",
  components: {
    Swiper,
    SwiperSlide,
    GuideStep,
    ModalWrapper,
  },
  props: {
    modelName: {
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const steps = ref([
      { id: 200, title: "guide.steps.step1.circleTitle", value: "0%" },
      { id: 300, title: "guide.steps.step2.circleTitle", value: "50%" },
      { id: 400, title: "guide.steps.step3.circleTitle", value: "100%" },
    ]);
    const titles = [
      { id: "title1", title: "guide.steps.step1.title", value: 200 },
      { id: "title1", title: "guide.steps.step2.title", value: 300 },
      { id: "title1", title: "guide.steps.step3.title", value: 400 },
    ];
    const activeStep = ref(200);
    const activeGirl = ref(10);
    const activeFormat = ref(10);
    const onClose = () => {
      currentSlide.value = 0;
      store.commit("removeModal");
    };
    const subTitle = computed(() => {
      return titles.find((item) => item.value === activeStep.value).title;
    });
    /* Girls Data */
    const girlsList = [
      { id: "girl-1", name: "", image: girl1FirstSlide, value: 10 },
      { id: "girl-1", name: "", image: girl2FirstSlide, value: 20 },
      { id: "girl-1", name: "", image: girl3FirstSlide, value: 30 },
    ];
    const girlsModel = {
      10: "first-girl-",
      20: "second-girl-",
      30: "third-girl-",
    };
    const formatOfUndress = [
      { id: "format-1", name: "", image: girlSecondSlide1, value: 10 },
      { id: "format-2", name: "", image: girlSecondSlide2, value: 20 },
      { id: "format-3", name: "", image: girlSecondSlide3, value: 30 },
    ];
    const formatModel = {
      10: "undress",
      20: "underwear",
      30: "dickpic",
    };
    const resultPhotoModel = {
      "first-girl-undress": firstGirlResult3,
      "first-girl-underwear": firstGirlResult1,
      "first-girl-dickpic": firstGirlResult2,
      "second-girl-undress": secondGirlResult3,
      "second-girl-underwear": secondGirlResult1,
      "second-girl-dickpic": secondGirlResult2,
      "third-girl-undress": thirdGirlResult3,
      "third-girl-underwear": thirdGirlResult1,
      "third-girl-dickpic": thirdGirlResult2,
    };
    /* Finish First Girl */
    const returnFinishResult = computed(() => {
      return resultPhotoModel[
        `${girlsModel[activeGirl.value]}${formatModel[activeFormat.value]}`
      ];
    });
    /* SWIPER */
    const currentSlide = ref(0);
    const onSlideChange = (swiper) => {
      currentSlide.value = swiper.activeIndex;
    };
    const handleClick = (girl) => {
      activeGirl.value = girl;
    };
    return {
      returnFinishResult,
      subTitle,
      activeGirl,
      girlsList,
      activeStep,
      steps,
      activeFormat,
      currentSlide,
      formatOfUndress,
      guidePreview,
      guideDone,
      handleClick,
      onSlideChange,
      onClose,
      modules: [Thumbs, Pagination, Navigation],
    };
  },
};
</script>

<style lang="scss">
.m-guide {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 700px;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  overflow: auto;

  @media screen and (max-width: 550px) {
    width: 90%;
  }

  @media screen and (max-height: 670px) and (min-width: 750px) {
    overflow: auto;
    height: 90vh;
  }

  &-head {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
    &-holder {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-green-word {
      color: #b4f12f;
      font-weight: 700;
      font-size: 28px;
      margin-right: 5px;
    }
    &_title {
      font-weight: 700;
      font-size: 26px;
    }
    &_close {
      cursor: pointer;
      width: 40px;
      height: 40px;
      position: absolute;
      right: -15px;
      top: -10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-steps {
    background-color: #000000;
    padding: 12px 20px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 30px;
  }

  &-view {
    &_image {
      width: 100%;
      height: 100%;
    }
    &_finish {
      width: 300px;
      height: auto;
      margin: 10px auto;
    }
  }
  &-first-step {
    &-slide {
      border: 2px solid transparent;
      height: 270px;
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      z-index: 100;
      img {
        width: 100%;
        height: 100%;
      }
      &--active {
        border: 3px solid #b4f12f;
        @media screen and (max-width: 750px) {
          border: 3px solid #b4f12f !important;
        }
      }
      @media screen and (max-width: 750px) {
        border: 3px solid transparent;
        height: 270px;
        width: 70%;
        border-radius: 20px;
        margin: 0 auto;
      }
    }
  }
  &_button {
    border: none;
    background-color: rgba(180, 241, 47, 1);
    height: 45px;
    font-size: 22px;
    min-width: 85%;
    border-radius: 8px;
    //box-shadow: 1px 2px 10px #67eb00;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 700;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 1px 2px 10px #67eb00;
      color: rgba(0, 0, 0, 1);
    }
    &--disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    @media screen and (max-width: 550px) {
      width: 100%;
      height: 40px;
    }
  }
  &-swiper-holder {
    position: relative;
    &_index {
      display: none;
      position: absolute;
      z-index: 100;
      bottom: 4px;
      font-size: 33px;
      color: black;
      font-weight: 700;
      right: 16px;
      @media screen and (max-width: 750px) {
        display: block;
      }
    }
  }
  .button-next {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    z-index: 100;
  }

  .swiper-wrapper {
    @media screen and (max-width: 750px) {
      min-height: 300px;
    }
  }
  .swiper-pagination {
    margin-bottom: -7px;
    display: none;
    @media screen and (max-width: 750px) {
      display: block;
    }
  }
  .swiper-pagination-bullet {
    width: 19px;
    height: 10px;
    border-radius: 10px;
    background: rgba(138, 138, 138, 1);
    opacity: 1;
  }
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #b4f12f;
    width: 33px;
    height: 10px;
  }
}

@media screen and (max-width: 750px) {
  .m-guide {
    width: 420px;
    height: auto;
    &-head {
      &-green-word {
        font-size: 20px;
      }
      &_title {
        font-size: 20px;
        text-align: center;
      }
      &_close {
        width: 25px;
        height: 25px;
      }
    }
  }
}
@media screen and (max-width: 440px) {
  .m-guide {
    width: 93vw;
    height: auto;
    padding: 20px 10px;
    &-head {
      &-green-word {
        font-size: 18px;
      }
      &_title {
        font-size: 18px;
      }
      &_close {
        right: -5px;
      }
    }
    &-steps {
      padding: 12px 0;
    }
    &-subtitle {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 400px) {
  .m-guide-head-holder {
    margin-top: 15px;
  }
}
</style>
