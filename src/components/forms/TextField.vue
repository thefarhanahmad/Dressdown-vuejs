<template>
  <div
    class="wg-field-wrap"
    :class="className"
  >

    <div class="wg-field-box">

      <!--      wg-field-icon-left        -->
      <slot name="iconLeft"></slot>

      <input
        :type="fieldType"
        :placeholder="$props.placeholder"
        :value="$props.modelValue"
        :disabled="$props.isDisabled"
        :required="$props.isRequired"
        :readonly="$props.isReadonly"
        autocomplete="new-password"
        class="wg-field-input"
        :class="{
          'is-inputted': isInputted,
          'is-invalid': $props.isInvalid
        }"
        :id="$props.fieldId"
        ref="input"
        @input="onInput"
      />
      <span class="bottom"></span>
      <span class="right"></span>
      <span class="top"></span>
      <span class="left"></span>
      <!--      wg-field-icon-right     -->
      <slot name="iconRight"></slot>

    </div>

    <transition name="fade">
      <div class="wg-field-error" v-if="isInvalid && invalidText">{{ invalidText }}</div>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'


export default {
  name: 'TextField',
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'text', // text', 'email', 'phone', 'password', 'date', 'number'
      required: false,
      validator: (prop) => ['text', 'email', 'phone', 'password', 'date', 'number'].includes(prop)
    },
    modelValue: {
      type: [String, Number]
    },
    fieldId: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    invalidText: {
      type: String,
      default: null
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    ariaAutocomplete: {
      type: String,
      required: false,
      default: 'none',
      validator: (prop) => ['none', 'inline', 'list', 'both'].includes(prop)
    },
    iconLeft: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    isDisabled: { type: Boolean },
    isInvalid: { type: Boolean },
    isRequired: { type: Boolean },
    isReadonly: {
      type: Boolean,
      default: false
    },
    isPasswordField: {
      type: Boolean,
      default: false
    },
    isShowPass: {
      type: Boolean,
      default: false
    },
    isInputFocus: {
      type: [Boolean, Function],
      default: false
    }
  },
  setup (props, { emit }) {
    const input = ref(null)

    const isInputted = ref(false)

    const className = computed(() => {
      return {
        'is-icon-left': props.iconLeft,
        'is-icon-right': props.iconRight
      }
    })

    const value = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    const onInput = (e) => {
      emit('update:modelValue', e.target.value)
      isInputted.value = e.target.value.length > 0;
    }

    const fieldType = computed(() => {
      if (!props.isShowPass && props.isPasswordField) {
        return 'password'
      }

      if (props.isShowPass && props.isPasswordField) {
        return 'text'
      }

      return props.type
    })

    watch(
      () => props.isInputFocus,
      (value) => {
        if (value) {
          input.value.focus()
        }
      }
    )

    onMounted(() => {
      if (props.isInputFocus) {
        input.value.focus()
      }
    })
    return {
      className,
      value,
      input,
      isInputted,
      fieldType,
      onInput
    }
  }
}
</script>
