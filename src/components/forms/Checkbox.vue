<template>
  <div class="checkbox-wrapper-19">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="handleChange"
    />
    <label :for="id" class="check-box" />
    <label :for="id">{{ $t(label) }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
    },
    modelValue: { // Включаем поддержу v-model
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleChange = (event) => {
      emit('update:modelValue', event.target.checked);
    };
    return {
      handleChange
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/checkbox.scss";
</style>
