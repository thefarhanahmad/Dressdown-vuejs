<template>
  <div v-if="isOpenModal" class="c-modal-wrapper">
    <transition name="modal">
      <div class="c-modal-wrapper_mask">
        <div class="c-modal-wrapper_holder">
          <div class="c-modal-wrapper-container">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "ModalWrapper",
  props: {
    modelName: {
      type: String,
      required: true
    },
  },
  setup (props, { emit }) {
    const store = useStore()
    const isOpenModal = ref(computed(() => store.getters.getCurrentModal === props.modelName))
    const onClose = () => {
      store.commit('removeModal')
      emit('closeModal')
    }

    return {
      isOpenModal,
      onClose
    }
  }
}
</script>

<style lang="scss">
.c-modal-wrapper {
  &_mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(4px);
  }

  &_holder {
    display: table-cell;
    vertical-align: middle;
  }

  &-container {
    margin: 0 auto;
    transition: all 0.3s ease;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
