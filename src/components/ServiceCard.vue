<template>
  <div class="c-service-card">
    <span class="c-service-card--pro" v-if="list.status === 'pro'"></span>
    <div class="c-service-card_header">
      <p class="c-service-card_header-plan">
        {{ $t(list.title) }}
      </p>
      <span class="c-service-card_header-credits">
        {{ list.credits }}&nbsp;{{ $t('ourPlans.credits') }}
      </span>
    </div>
    <div class="c-service-card_body">
      <div
        v-for="item of list.plans"
        :key="item.id"
        class="c-service-card_body-item"
        :class="{'c-service-card_body-item--premium': item.premium, 'c-service-card_body-item--active': item.icon}"
      >
        <template v-if="item.icon">
          <div class="c-service-card_body-icon">
            <img :src="item.icon" :alt="$t('item.text')">
          </div>
          <p class="c-service-card_body-plan">{{ $t(item.text) }}</p>
        </template>
      </div>
    </div>
    <button v-if="!list.oldPrice" @click="openModal" class="c-service-card_button">
      {{ list.price }}
    </button>
    <Button @click="openModal" class="c-service-card_button--active" v-else>
      <template #default>
        <span class="c-service-card_button--removed">
          {{ list.oldPrice }}
        </span>
        <p>{{ list.price }}</p>
      </template>
    </Button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Button from "./Button";
export default {
  name: "ServiceCard",
  components: {Button},
  props: {
    list: Object
  },
  setup() {
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
.c-service-card {
  position: relative;
  padding: 16px;
  background: rgb(29, 29, 29);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 255px;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
  &--pro {
    position: absolute;
    //background-color: rgb(156, 31, 255);
    background-color: rgba(227, 130, 170, 0.7);
    filter: blur(64px);
    width: 315px;
    left: 0;
    z-index: 0;
    top: -140px;
    height: 161px;
  }
  &_header {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-plan {
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }
    &-credits {
      background: #ffffff1a;
      border-radius: 100px;
      border: 2px solid rgb(255,255,255);
      padding: 1.5px 6px;
      font-size: 14px;
      text-transform: lowercase;
    }
  }
  &_body {
    z-index: 1;
    padding-top: 20px;
    padding-bottom: 24px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      gap: 12px;
      border-radius: 12px;
      min-height: 36px;
      &--active {
        background-color: #ffffff05;
      }
      &--premium {
        background-image: url("../assets/bg-stars.png");
        background-size: 100%;
        background-position: right;
      }
    }
    &-icon {
      background-color: #ffffff05;
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-plan {
      font-size: 12px;
      font-weight: 700;
    }
  }
  &_button {
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    padding: 12px 24px;
    gap: 12px;
    border-radius: 100px;
    background-color: rgb(57, 57, 57);
    &--active {
      .btn-holder_item {
        background: linear-gradient(rgba(255, 112, 171, 1), rgba(255, 0, 105, 1) , rgba(255, 0, 105, 1));
        box-shadow: 0 4px 8px rgba(255, 112, 171, 1), 0 6px 20px rgba(255, 0, 105, 0.7);
        width: 100%;
        padding: 12px 24px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 14px;
        font-weight: bold;
      }
    }
    &--removed {
      opacity: .5;
      text-decoration-line: line-through;
      color: rgba(255, 255, 255, 1) !important;
    }
  }
}
</style>
