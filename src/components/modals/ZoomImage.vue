<template>
  <ModalWrapper :model-name="modelName">
    <div class="zoom-image">
      <div class="zoom-image-head">
        <p class="zoom-image-head_title">
          {{ $t('modals.zoom') }}
        </p>
        <div @click="onClose" class="zoom-image-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="zoom-image-body">
        <img :src="generatedImage" alt="generated image">
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: 'ZoomImage',
  components: {
    ModalWrapper,
  },
  props: {
    modelName: {
      type: String,
      required: true
    },
  },
  setup(_, { emit }) {
    const store = useStore()
    const onClose = () => {
      store.commit('removeAllModal')
      emit('closeModal')
    }

    const generatedImage = computed(() => {
      return store.getters.getGeneratedImage
    })

    return {
      onClose,
      generatedImage
    }
  }
}
</script>

<style lang="scss">
.zoom-image {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 700px;
  height: 800px;
  overflow: auto;
  @media screen and (max-width: 775px) {
    width: 90%;
    height: 460px;
  }
  @media screen and (max-height: 500px) {
    height: 90vh;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &_title {
      font-weight: 700;
      font-size: 18px;
    }
    &_close {
      cursor: pointer;
    }
  }
  &-body {
    img  {
      width: 100%;
      object-fit: cover;
      height: 100%;
      max-height: 700px;
    }
  }
}
</style>
