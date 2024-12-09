<template>
  <div class="btn-holder">
    <button class="btn-holder_item">
      <span v-if="!$slots.default">
        {{ $t($props.text) }}
      </span>
      <slot v-else></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String
  }
}
</script>

<style lang="scss">
.btn-holder {
  cursor: pointer;
  &_item {
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    padding: 16px 24px;
    background: linear-gradient(rgba(173, 240, 28, 1), rgba(189, 244, 69, 1), rgba(162, 238, 0, 1));
    box-shadow: 0 4px 8px rgba(173, 240, 28, 0.7), 0 6px 20px rgba(173, 240, 28, 0.4);
    border-radius: 9999px;
    border: none;
    color: black;
    font-weight: 600;
    span {
      color:rgba(57, 57, 57, 1);
    }
  }
}
</style>
