<template>
  <ModalWrapper :model-name="modelName">
    <div class="m-video-guide">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.instruction') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="m-video-guide-video-wrapper">
        <video
          autoplay
          loop
          muted
          playsinline=""
          preload="auto"
          controls
          class="m-video-guide-video-wrapper_item"
        >
          <source src="@/assets/videos/modal-guide.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";
export default {
  name:'VideoModal',
  components: {
    ModalWrapper
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup() {
    const store = useStore()
    const onClose = () => {
      store.commit('removeModal')
    }
    return {
      onClose
    }
  }
}
</script>

<style lang="scss">
.m-video-guide {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 800px;
  @media screen and (max-width: 900px) {
    width: 95%;
  }
  @media screen and (max-height: 840px) {
    overflow: auto;
    height: 90vh;
  }
  &-video-wrapper {
    &_item {
      width: 100%;
      padding: 10px;
      border-radius: 20px;
    }
  }
}
</style>
