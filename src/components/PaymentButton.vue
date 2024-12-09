<template>
  <Transition name="fade">
    <a
      target="_blank"
      :href="payment.link"
      class="c-payment-button"
    >
      <img
        class="c-payment-button_icon"
        :src="payment.icon"
        :alt="payment.label"
        loading="lazy"
      />
    </a>
  </Transition>
</template>

<script>
export default {
  name: 'PaymentButton',
  props: {
    payment: {},
  },
  setup() {
    return {

    }
  },
}
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.c-payment-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgba(33,33,33, .95);
  min-width: 166px;
  padding: 35px;
  min-height: 211px;
  border-radius: 8px;
  &:hover {
    box-shadow: 0 0 7px rgba(141, 210, 148, .8);
  }
  @media (width <= 550px) {
    min-width: 125px;
    min-height: 56px;
    padding: 30px;
  }
  @media (width <= 420px) {
    min-width: 100%;
    min-height: auto;
    width: 100%;
    padding: 16px;
  }
  &_icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
