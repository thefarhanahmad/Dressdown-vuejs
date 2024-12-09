<template>
  <TextField
    :type="'text' ? !isShowPass : 'password'"
    :placeholder="$props.placeholder"
    :isShowPass="isShowPass"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :isInvalid ="isInvalid"
    ariaAutocomplete="list"
    :isPasswordField="true"
    :invalidText="$props.invalidText || defaultInvalidText"
  >
    <template v-slot:iconRight>
    <span class="text-field-icon-right">
      <img
        v-show="isShowPass"
        @click="isShowPass = !isShowPass"
        :src="showPass"
        alt="show password"
      />
      <img
        v-show="!isShowPass"
        @click="isShowPass = !isShowPass"
        :src="hidePass"
        alt="hide password"
      />
    </span>
    </template>
  </TextField>
</template>

<script>
import { defineComponent } from 'vue'
import showPass from '@/assets/icons/show-pass.svg'
import hidePass from '@/assets/icons/hide-password.svg'
import TextField from '../../components/forms/TextField.vue'

export default defineComponent({
  name: 'PasswordField',
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
      isShowPass: false,
      defaultInvalidText: '',
      showPass,
      hidePass
    }
  },
  methods: {
    updateModelValue (e) {
      this.$emit('update:modelValue', e)
      this.isInvalid = e.length < 8
      this.defaultInvalidText = this.isInvalid ? this.$t('invalid.password') : ''
      this.$emit('update:invalidText', this.defaultInvalidText)
    }
  }
})
</script>

<style lang="scss">
.wg-field-wrap {
 .text-field-icon-right {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   width: 24px;
   height: 24px;
   right: 15px;

   img {
     cursor: pointer;
     opacity: .5;
     &:hover {
       opacity: .7;
     }
   }
 }
}
</style>
