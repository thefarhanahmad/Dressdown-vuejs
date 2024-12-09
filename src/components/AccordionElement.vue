<template>
  <div class="c-accordion" @click="isActive = !isActive">
    <div class="c-accordion-head">
      <p class="c-accordion-head_title">{{ $t(item.title) }}</p>
      <svg :class="{'rotate-360': !isActive}" class="ml-8 shrink-0 fill-white" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <rect y="7" width="16" height="2" rx="1"
              class="origin-center transform transition duration-200 ease-out"
              :class="{'rotate-180': isActive}"></rect>
        <rect y="7" width="16" height="2" rx="1"
              class="origin-center rotate-90 transform transition duration-200 ease-out"
              :class="{'rotate-270': !isActive}"></rect>
      </svg>
    </div>
    <div class="c-accordion-body" :class="{'c-accordion-body--hide': isActive}">
      <p class="c-accordion-body_text" :class="{'c-accordion-body_text--hide': isActive}">
        {{ $t(item.desc) }}
      </p>
    </div>
    <span class="c-accordion-horizontal"></span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AccordionElement",
  props: {
    item: Object
  },
  setup() {
    const isActive = ref(true)
    return {
      isActive
    }
  }
}
</script>

<style lang="scss">
.c-accordion {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  cursor: pointer;

  .transition {
    transition: all 0.3s;
  }
  .rotate-180 {
    transform: rotate(90deg) translate(0px, -16px);
  }
  .rotate-360 {
    transform: rotate(180deg);
  }
  .rotate-270 {
    opacity: 0;
    transform: rotate(180deg) translate(-16px, -16px);
  }
  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 375px) {
      gap: 10px;
    }
    svg {
      transition: all 0.3s;
      fill: #fff;
    }
    &_title {
      font-size: 24px;
      font-weight: 700;
      @media screen and (max-width: 550px) {
        max-width: 80%;
      }
      @media screen and (max-width: 440px) {
        font-size: 16px;
      }
    }
  }
  &-horizontal {
    background-color: #ffffff1a;
    height: 1px;
    width: 100%;
  }
  &-body {
    transition: all .3s;
    &--hide {
      overflow: hidden;
    }
    &_text {
      color: #fff9;
      font-size: 16px;
      transition: all .3s;
      height: max-content;
      &--hide {
        height: 0;
      }
    }
  }
}
</style>
