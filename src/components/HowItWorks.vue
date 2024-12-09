<template>
  <div class="c-how-works">
    <Container class="c-how-works-container">
      <div class="c-how-works_wrapper">
        <div class="c-how-works_wrapper-images">
<!--          <div class="c-how-works_wrapper-images_download">-->
<!--            <img src="../assets/icons/dowload.svg" alt="download undress image">-->
<!--          </div>-->
<!--          <div class="c-how-works_wrapper-images_girl">-->
<!--            <img src="../assets/card-image.jpg" alt="download girl">-->
<!--          </div>-->
            <video
              autoplay
              loop
              muted
              playsinline=""
              preload="auto"
              controls
              class="c-how-works_wrapper-images-item"
            >
              <source src="@/assets/videos/instrucation.mp4" type="video/mp4">
            </video>
        </div>
        <div class="c-how-works_wrapper-text">
          <h3 class="c-how-works_wrapper-text-headline-3">
            {{ $t('howItWorks.title') }}
          </h3>
          <p class="c-how-works_wrapper-text-description">
            {{ $t('howItWorks.description') }}
          </p>
          <div class="c-how-works_wrapper-list">
            <div
              v-for="(link, index) of links"
              :key="link.id"
              class="c-how-works_wrapper-list_item"
            >
              <div class="c-how-works_wrapper-list_num">
                {{ index + 1 }}
              </div>
              <div class="c-how-works_wrapper-list_title">
                {{ $t(link.label) }}
              </div>
            </div>
          </div>
          <Button @click="openModal" text="buttons.forFree"></Button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "./layout-positions/Container";
import Button from "./Button";
import { useStore } from 'vuex'
export default {
  name: "HowItWorks",
  components: {
    Button,
    Container
  },
  setup () {
    const store = useStore()
    const links = [
      { id: 0, label: 'howItWorks.link1' },
      { id: 1, label: 'howItWorks.link2' },
      { id: 2, label: 'howItWorks.link3' }
    ]

    const openModal = () => {
      store.commit('addModal', 'SignUp')
    }

    return {
      links,
      openModal
    }
  }
}
</script>

<style lang="scss">
.c-how-works {
  background-color: rgb(19, 19, 19);
  padding-top: 96px;
  padding-bottom: 96px;
  margin-top: 70px;
  overflow: hidden;
  @media screen and (max-width: 950px) {
    padding-bottom: 46px;
  }
  &_wrapper {
    display: flex;
    align-items: center;
    gap: 60px;
    padding-left: 20px;
    padding-right: 20px;
    @media screen and (max-width: 1100px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    };
    @media screen and (max-width: 950px) {
      display: flex;
      flex-direction: column-reverse;
    }
    &-images {
      //margin-right: 300px;
      width: 50%;
      position: relative;
      @media screen and (max-width: 1100px) {
        margin-right: 0;
        width: auto;
      }
      @media screen and (max-width: 950px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media screen and (max-width: 550px) {
        justify-content: flex-start;
      }

      &-item {
        position: absolute;
        left: -100px;
        top: -210px;
        width: 100%;
        border-radius: 20px;
        @media screen and (max-width: 1260px) {
          transform: scale(0.9);
          left: -10px;
        }
        @media screen and (max-width: 950px) {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(1);
          width: 70%;
          margin: 0 auto;
          left: 0;
          top: 0;
        }
      }

      &_download {
        background: #ffffff1f;
        width: 220px;
        max-width: 269px;
        height: 220px;
        max-height: 269px;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-15deg);
        img {
          transform: scale(1.5);
        }
      }
      &_girl {
        border-radius: 32px;
        width: 220px;
        max-width: 269px;
        height: 220px;
        max-height: 269px;
        border: 6px solid rgba(189, 244, 69, 1);
        overflow: hidden;
        transform: rotate(15deg);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 8rem;
        top: 3rem;
        box-shadow: 0 4px 8px rgba(173, 240, 28, 0.7), 0 6px 20px rgba(173, 240, 28, 0.4);

        @media screen and (max-width: 950px) {
          left: 50%;
        }

        @media screen and (max-width: 550px) {
          left: 20%;
        }

        img {
          transform: translate(0, -72px) rotate(0) skew(0) skewY(0) scaleX(1) scaleY(1);
          height: 400px;
          object-fit: cover;
          width: 100%;
        }
      }
    }
    &-text {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @media screen and (max-width: 550px) {
        align-items: center;
        text-align: center;
      }

      &-headline-3 {
        font-size: 48px;
        font-weight: 700;
      }
      &-description {
        color: #fff9;
        font-size: 16px;
        max-width: 300px;
        line-height: 1.5;
      }
    }
    &-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      @media screen and (max-width: 550px) {
        align-items: center;
        text-align: center;
      }
      &_item {
        display: flex;
        align-items: center;
        transform: translateX(-60px);
        gap: 24px;
        @media screen and (max-width: 950px) {
          transform: translateX(0);
        }
      }
      &_num {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff1f;
        font-size: 16px;
        @media screen and (max-width: 950px) {
          display: none;
        }
      }
      &_title {
        font-weight: 700;
      }
    }
  }
}
</style>
