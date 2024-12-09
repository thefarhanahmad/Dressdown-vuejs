<template>
  <ModalWrapper :model-name="modelName">
    <div class="c-registration-signup c-registration-login">
      <div class="c-registration-head">
        <p class="c-registration-head_title">
          {{ $t('modals.referral.title') }}
        </p>
        <div @click="onClose" class="c-registration-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove">
        </div>
      </div>
      <p class="m-referral_text">
        {{ $t('modals.referral.text') }}
      </p>
      <div class="default-horizontal"></div>
      <p class="m-referral_text-count">
        {{ $t('modals.referral.invited', { count: getReferralUsersCount, generations: generationsCount }) }}
      </p>
      <form @submit.prevent="handleSubmit" class="c-registration_body">
        <TextField
          @click="handleSubmit"
          class="c-registration_body_field c-registration_body_field c-registration_body_field-referral"
          :modelValue="getLink"
          name="Referral Link"
          :isReadonly="true"
          fieldId="referralId"
          :is-required="true"
          placeholder="Username"
        />
        <div class="c-registration_footer">
          <button
            type="submit"
            class="c-registration_footer-siging"
            style="margin-bottom: 15px"
          >
            {{ $t('modals.copy') }}
          </button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import TextField from "@/components/forms/TextField.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: 'Referral',
  components: {
    ModalWrapper,
    TextField,
  },
  props: {
    modelName: {
      type: String
    }
  },
  setup () {
    const store = useStore()
    const referral = ref('')
    const getLink = computed(() => {
      return store.getters.getMyReferralLink
    })
    const getReferralUsersCount = computed(() => {
      return store.getters.getMyReferralUsersCount
    })
    const generationsCount = computed(() => {
      return store.getters.getOwnedTokens
    })
    // const generationsCount = computed(() => {
    //   return getReferralUsersCount.value * 3
    // })

    const handleSubmit = () => {
      const input = document.getElementById('referralId');
      input.select();
      input.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
        store.dispatch('handleToast', {
          text: 'Copied!',
          type: 'SUCCESS'
        })
      } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
      }
    }
    const onClose = () => {
      referral.value = ''
      store.commit('removeModal')
    }

    return {
      handleSubmit,
      onClose,
      getLink,
      getReferralUsersCount,
      generationsCount,
      referral,
    }
  }
}
</script>

<style lang="scss">
.m-referral_text {
  &-count {
    margin: 10px 0;
  }
}
</style>
