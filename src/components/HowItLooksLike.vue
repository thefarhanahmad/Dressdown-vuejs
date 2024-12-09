<template>
  <div class="c-looks-like">
    <Container>
      <div class="c-looks-like_content">
        <div class="c-looks-like_content-text">
          <h3 class="c-looks-like_content-text_title">
            {{ $t('howItLooksLike.title') }}
            <br>
            {{ $t('howItLooksLike.titleNext') }}
          </h3>
          <p class="c-looks-like_content-text_description">
            {{ $t('howItLooksLike.description') }}
          </p>
          <Button @click="openModal" text="buttons.forFree"></Button>
<!--        </div>-->
<!--        <div class="c-looks-like_content-scan" v-for="girl of swiperList">-->
<!--          <div :style="`background-image: url(${girl.photoOutside})`" class="bottom-block"></div>-->
<!--          <div :style="`background-image: url(${girl.photosInside})`" class="top-block"></div>-->
<!--          <div class="c-looks-like_content-scan_top-corner">-->
<!--            <img src="../assets/icons/border-corner.svg" alt="corner border">-->
<!--            <img src="../assets/icons/border-corner.svg" alt="corner border">-->
<!--          </div>-->
<!--          <div class="c-looks-like_content-scan_bottom-corner">-->
<!--            <img src="../assets/icons/border-corner.svg" alt="corner border">-->
<!--            <img src="../assets/icons/border-corner.svg" alt="corner border">-->
<!--          </div>-->
<!--        </div>-->
        </div>
        <div class="c-looks-like_content-video">
          <video
            class="c-looks-like_content-video_item"
            autoplay
            loop
            muted
            playsinline=""
            preload="auto"
          >
            <source src="../assets/videos/scena_2.mp4" type="video/mp4">
          </video>
        </div>
      </div>
<!--        <Swiper :modules="modules" v-if="swiperList && swiperList.length">-->

<!--          <SwiperSlide v-for="(item, index) in swiperList" :key="index">-->
<!--            <slot-->
<!--              name="item"-->
<!--              :item="item"-->
<!--              :index="index"-->
<!--            >-->
<!--              {{ item.id }}-->
<!--            </slot>-->
<!--          </SwiperSlide>-->

<!--        </Swiper>-->
    </Container>
  </div>
</template>

<script>
import Container from "./layout-positions/Container";
import Button from "./Button";
import { useStore } from 'vuex'
import dressedWmn1 from '../assets/dressed-woman-1.jpg'
import dressedWmn2 from '../assets/dressed-woman-2.jpg'
import dressedWmn3 from '../assets/dressed-woman-3.jpg'
import unDressedWmn1 from '../assets/undressed-woman-1.jpg'
import unDressedWmn2 from '../assets/undressed-woman-2.jpg'
import unDressedWmn3 from '../assets/undressed-woman-3.jpg'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Pagination, Navigation } from 'swiper'


export default {
  name: "HowItLooksLike",
  components: {
    Button,
    Container,
    // Swiper,
    // SwiperSlide
  },
  setup () {
    const store = useStore()
    const swiperList = [
      { id: 1, photosInside: dressedWmn1, photoOutside: unDressedWmn1 },
      // { id: 2, photosInside: dressedWmn2, photoOutside: unDressedWmn2 },
      // { id: 3, photosInside: dressedWmn3, photoOutside: unDressedWmn3 }
    ]
    const openModal = () => {
      store.commit('addModal', 'SignUp')
    }

    return {
      // modules: [Autoplay, Pagination, Navigation],
      swiperList,
      openModal
    }
  }
}
</script>

<style lang="scss">
.c-looks-like {
  padding-top: 56px;
  padding-bottom: 26px;
  background: #000;
  @media screen and (max-width: 950px) {
    padding-top: 56px;
  }
  @media screen and (max-width: 520px) {
    padding-bottom: 0;
  }
  &_content {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    gap: 60px;
    @media screen and (max-width: 950px) {
      gap: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-video {
      width: 50%;
      @media screen and (max-width: 950px) {
        margin-top: 40px;
      }
      @media screen and (max-width: 650px) {
        margin-top: 60px;
        width: 40%;
      }
      @media screen and (max-width: 520px) {
        width: 65%;
      }
      @media screen and (max-width: 375px) {
        width: 90%;
      }
      &_item {
        width: 100%;
      }
    }
    &-text {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 50%;
      @media screen and (max-width: 950px) {
        gap: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      @media screen and (max-width: 550px) {
        margin-bottom: 20px;
      }
      &_title {
        font-size: 64px;
        font-weight: 700;
        line-height: .9;
        @media screen and (max-width: 950px) {
          font-size: 36px;
          text-align: center;
          br {
            display: none;
          }
        }
      }
      &_description {
        color: #fff9;
        font-size: 14px;
        max-width: 300px;
        line-height: 1.5;
        @media screen and (max-width: 950px) {
          text-align: center;
        }
      }
    }
    &-scan {
      position: relative;
      width: 700px;
      height: 700px;
      max-height: 700px;
      border-radius: 24px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
      transform: scale(0.8);
      background-color: #161616;

      @media screen and (max-width: 580px) {
        width: 100%;
        max-width: 100%;
        height: 200px;
        max-height: 100%;
        transform: scale(1);
      }

      .bottom-block {
        position: absolute;
        width: 100%;
        background-position: bottom;
        background-size: contain;
        background-repeat: no-repeat;
        height: 100%;
        border-left: 15px solid #161616;
        border-right: 15px solid #161616;
        border-bottom: 15px solid #161616;
      }

      .top-block {
        position: absolute;
        width: 100%;
        height: 75%;
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: cover;
        animation: resize 8s infinite ease-in-out;
        border-top: 4px solid rgba(235,113,0,1);
        border-left: 15px solid #161616;
        border-right: 15px solid #161616;
        border-bottom: 15px solid #161616;

        @media screen and (max-width: 580px) {
          width: 210px;
        }
      }
      &_bottom-corner {
        position: absolute;
        bottom: 0;
        padding: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        img {
          &:first-child {
            transform: rotate(180deg);
          }
          &:last-child {
            transform: rotate(90deg);
          }
        }
      }
      &_top-corner {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        padding: 20px;
        justify-content: space-between;
        img {
          &:first-child {
            transform: rotate(270deg);
          }
          &:last-child {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}

@keyframes resize {
  0% {
    height: 75%;
  }
  50% {
    height: 20%;
  }
  100% {
    height: 75%;
  }
}
</style>
