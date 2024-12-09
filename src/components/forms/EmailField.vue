<template>
  <TextField
    type="email"
    :placeholder="$props.placeholder"
    :iconLeft="$props.iconLeft"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :isInvalid ="isInvalid"
    ariaAutocomplete="list"
    :invalidText="$props.invalidText || defaultInvalidText"
  >
  <template v-slot:iconLeft>
    <span class="wg-ffi-icon">
      <img
        src="../../assets/icons/mail.svg"
        alt="mail email"
      />
    </span>
  </template>
  </TextField>
</template>

<script>
import { defineComponent } from 'vue'
import TextField from '../../components/forms/TextField.vue'

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
export default defineComponent({
  name: 'EmailField',
  components: {
    TextField
  },
  emits: ['update:modelValue', 'update:invalidText'],
  props: {
    modelValue: {
      type: [String, Number]
    },
    invalidText: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: 'example@mail.com'
    },
    iconLeft: {
      type: String,
      default: 'wg-ffi-sms-fill'
    }

  },
  data () {
    return {
      isInvalid: false,
      defaultInvalidText: ''
    }
  },
  methods: {
    updateModelValue (e) {
      this.$emit('update:modelValue', e)
      this.isInvalid = !regexEmail.test(e)
      this.defaultInvalidText = this.isInvalid ? this.$t('invalid.email') : ''
      this.$emit('update:invalidText', this.defaultInvalidText)
    }
  }
})
</script>

<style lang="scss">
.wg-field-wrap {

  .wg-field-box {
    position: relative;

    .wg-ffi-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      min-width: 18px;
      text-align: center;
      left: 5px;
    }

    .wg-field-icon-left {
      left: 10px;
    }

    .wg-field-icon-right {
      right: 10px;
    }
  }

  .wg-field-input {
    height: 50px;
    padding: 10px;
    width: 100%;
    display: block;
    font-size: 14px;
    line-height: 1;
    font-weight: 700;
    border: none;
    border-bottom: 1px solid #b4f12f;
    color: #FFFFFF;
    background-color: rgb(22, 22, 22);
    transition:
      background-color 0.3s ease-in-out,
      border 0.3s ease-in-out;

    &:disabled {
      background-size: 4.24px 4.24px;

      .wg-ffi-icon {
        opacity: 0.3;
      }
    }
  }

  &.is-icon-left {

    .wg-field-input {
      padding-left: 36px;
    }
  }

  &.is-icon-right {

    .wg-field-input {
      padding-right: 36px;
    }
  }

  .wg-field-error {
    margin-top: 3px;
    font-size: 12px;
    line-height: 1.333;
    color: red;
  }

  &:not(:last-child) {
    margin-bottom: 9px;
  }

  &~.wg-field-wrap {

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &~.wg-button {

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  &~.wg-checkbox-box {

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }


  input:focus {
    outline: none;
    border-radius: 4px;
  }

  input::placeholder {
    color: hsla(0, 0%, 100%, 0.6);
  }

  .bottom, .left, .right, .top {
    position: absolute;
    background-color: #b4f12f;
    transition: transform 0.1s ease;
  }

  .bottom,
  .top {
    height: 1px;
    left: 0;
    right: 0;
    transform: scaleX(0);
  }

  .left,
  .right {
    width: 1px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
  }

  .bottom {
    bottom: 0;
    transform-origin: bottom right;
  }

  input:focus ~ .bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
  }

  .right {
    right: 0;
    transform-origin: top right;
    transition-delay: 0.05s;
  }

  input:focus ~ .right {
    transform-origin: bottom right;
    transform: scaleY(1);
  }

  .top {
    top: 0;
    transform-origin: top left;
    transition-delay: 0.15s;
  }

  input:focus ~ .top {
    transform-origin: top right;
    transform: scaleX(1);
  }

  .left {
    left: 0;
    transform-origin: bottom left;
    transition-delay: 0.25s;
  }

  input:focus ~ .left {
    transform-origin: top left;
    transform: scaleY(1);
  }

}
</style>
