<template>
  <div class="c-guide-step">
    <div v-show="count <= currentStep" class="c-guide-step-image">
      <img
        src="@/assets/icons/guide-done.svg"
        draggable="false"
        alt="done step closed"
      >
    </div>
    <div v-show="count > currentStep" class="c-guide-step-opened-step">
      <p class="c-guide-step-opened-step_value">{{ percentage }}</p>
    </div>
    <p class="c-guide-step-title">{{ $t($props.title) }}</p>
  </div>
</template>
<script>
export default  {
  name: 'GuideStep',
  props: {
    percentage: String,
    title: String,
    currentStep: Number,
    count: Number
  },
  setup(props) {
    return {

    }
  }
}
</script>
<style lang="scss">
.c-guide-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &-image {
    width: 72px;
    height: 72px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-opened-step {
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    &_value {
      font-weight: 700;
      font-size: 20px;
    }
  }
  &-title {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
}

@media screen and (max-width: 750px) {
  .c-guide-step {
    justify-content: normal;
    &-image {
      width: 42px;
      height: 42px;
    }
    &-opened-step {
      width: 42px;
      height: 42px;
      &_value {
        font-weight: 700;
        font-size: 14px;
      }
      &_title {}
    }
  }
}

@media screen and (max-width: 440px) {
  .c-guide-step {
    &-title {
      font-size: 12px;
    }
  }
}

</style>
