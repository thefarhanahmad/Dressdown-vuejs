<script>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";
export default {
  name: 'Timer',
  setup() {
    const totalTime = ref(20 * 60)
    const timer = ref(null)
    const savedTime = localStorage.getItem('remainingTime');
    if (savedTime) {
      const remainingTime = parseInt(savedTime);
      if (remainingTime > 0) {
        totalTime.value = remainingTime;
      }
    }

    const minutes = computed(() => {
      return Math.floor(totalTime.value / 60);
    })

    const seconds = computed(() => {
      return totalTime.value % 60;
    })

    const startTimer = () => {
      timer.value = setInterval(() => {
        if (totalTime.value > 0) {
          totalTime.value--;
          localStorage.setItem('remainingTime', totalTime.value);
        } else {
          localStorage.removeItem('remainingTime');
          clearInterval(timer.value);
        }
      }, 1000);
    }
    onMounted(() => {
      startTimer()
    })

    onBeforeUnmount(() => {
      clearInterval(timer.value);
    })

    return {
      minutes,
      seconds,
    }
  }
}
</script>

<template>
  <div class="add-cash-modal-promotion-timer">
    <h4 class="add-cash-modal-promotion-timer_item">{{ minutes }}:{{ seconds < 10 ? '0' : '' }}{{ seconds }}</h4>
  </div>
</template>

<style scoped lang="scss">

</style>
