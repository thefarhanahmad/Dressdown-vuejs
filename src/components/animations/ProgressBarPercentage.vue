<template>
  <div class="c-progress-bar">
    <div class="c-progress-bar_wrapper">
      <div class="c-progress-bar_wrapper-value" :style="`width: ${dynamicPercentage}%`">
      </div>
      <span
        class="c-progress-bar_wrapper-percent"
        :class="{'c-progress-bar_wrapper-percent--active': dynamicPercentage >= 50}"
      >
          {{ dynamicPercentage }}&nbsp;%
        </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: 'ProgressBarPercentage',
  props: {
    percentage: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup(props) {
    const dynamicPercentage = computed(() => {
      if (props.percentage < 0) {
        return 0
      }
      if (props.percentage >= 100) {
        return 100
      }

      return props.percentage
    })
    return {
      dynamicPercentage
    }
  }
}
</script>

<style lang="scss">
.w3-light-grey, .w3-hover-light-grey:hover, .w3-light-gray, .w3-hover-light-gray:hover {
  color: #000 !important;
  background-color: #34b93d !important
}

.c-progress-bar {
  margin-top: -40px;
  width: 100%;
  height: 25px;
  position: relative;
  border: 1px solid #e1e1e1;
  border-radius: 7px;
  overflow: hidden;

  &_wrapper {
    width: 100%;
    height: 100%;
    &-value {
      height: 100%;
      background: #b4f12f;
    }
    &-percent {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-weight: 700;
      &--active {
        color: #000000;
      }
    }
  }
}
</style>
