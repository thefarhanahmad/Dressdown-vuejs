<template>
  <ModalWrapper :model-name="modelName">
    <div class="support-modal">
      <div class="support-modal-head">
        <h2 class="support-modal-head-headline">
          {{ $t('modals.support') }}
        </h2>
        <div @click="onClose" class="add-cash-modal-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <div class="support-modal-body">
        <a
          v-for="link of supportLinks"
          class="support-modal-body_link"
          :href="link.href"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";

export default {
  name: 'Support',
  components: {
    ModalWrapper
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const supportLinks = [
      { id: 0, title: 'Email', href: '#' },
      { id: 1, title: 'Telegram', href: '#' },
      { id: 2, title: 'Messanger', href: '#' },
      { id: 3, title: 'Twitter', href: '#' }
    ]
    const onClose = () => {
      store.commit('removeAllModal')
      emit('closeModal')
    }
    return {
      supportLinks,
      onClose
    }
  }
}
</script>

<style lang="scss">
.support-modal {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 500px;
  min-height: 275px;
  @media screen and (max-width: 900px) {
    width: 95%;
  }
  @media screen and (max-height: 540px) {
    overflow: auto;
  }

  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    &-headline {
      font-size: 34px;
      text-align: center;
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 40px;

    &_link {
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      display: inline-flex;
      width: max-content;
      border-bottom: 2px solid transparent;
      &:hover {
        border-bottom: 2px solid #FFFFFF;
      }
    }
  }
}
</style>
