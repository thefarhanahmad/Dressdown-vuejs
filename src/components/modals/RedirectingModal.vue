<template>
  <ModalWrapper :model-name="modelName">
    <div class="redirecting-modal">
      <div class="add-cash-modal-head">
        <p class="add-cash-modal-head_title">
          {{ $t("modals.attention") }}
        </p>
        <div @click="onClose" class="add-cash-modal-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove" />
        </div>
      </div>
      <div class="redirecting-modal_body">
        <!--        v-show="cardUrl && cryptoUrl || (getSelectedSumForPayment === 0 && cryptoUrl)"     -->
        <div
          v-show="
            (getSelectedSumForPayment === 0 && cryptoUrl === '') ||
            (cardUrl === '' && cryptoUrl === '')
          "
          v-for="payment of 2"
          :key="payment"
          class="skeleton fade"
        ></div>
        <template v-for="payment of payments">
          <PaymentButton
            v-if="
              payment.link &&
              ((cardUrl && cryptoUrl) ||
                (getSelectedSumForPayment === 0 && cryptoUrl))
            "
            :payment="payment"
            :key="payment.id"
          />
        </template>
      </div>
      <div class="add-cash-modal_footer">
        <button @click="handleCash" class="add-cash-modal_footer-btn">
          {{ $t("buttons.makeNewPayment") }}
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import PaymentButton from "@/components/PaymentButton.vue";

import cardPayment from "@/assets/visaMaster.svg";
import cryptoPayment from "@/assets/usdtTrc.svg";
import LoadAnimation from "@/components/animations/LoadAnimation.vue";

export default {
  name: "RedirectingModal",
  components: {
    LoadAnimation,
    PaymentButton,
    ModalWrapper,
  },
  props: {
    modelName: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const getSelectedSumForPayment = computed(() => {
      return store.getters.getSelectedSum;
    });
    const cardUrl = computed(() => {
      return store.getters.getBalanceLink;
    });
    const cryptoUrl = computed(() => {
      return store.getters.getCryptoLink;
    });
    const onClose = () => {
      store.commit("removeAllModal");
      emit("closeModal");
      store.commit("clearPaymentData");
    };
    const handleCash = () => {
      store.commit("removeAllModal");
      store.commit("addModal", "Cash");
      store.commit("clearPaymentData");
    };

    const payments = ref([
      { id: 1, label: "card", icon: cardPayment, link: cardUrl },
      { id: 2, label: "usdt", icon: cryptoPayment, link: cryptoUrl },
    ]);

    return {
      payments,
      cardUrl,
      cryptoUrl,
      getSelectedSumForPayment,
      onClose,
      handleCash,
    };
  },
};
</script>

<style lang="scss">
.redirecting-modal {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 500px;

  @media (width <= 550px) {
    width: 380px;
  }
  @media (width <= 420px) {
    width: 95%;
  }

  &_body {
    padding-bottom: 20px;
    font-size: 18px;
    height: 230px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px;
    @media (width <= 550px) {
      grid-gap: 15px;
    }
  }

  .skeleton {
    background: rgba(33, 33, 33, 0.95);
    min-height: 211px;
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0),
      rgba(#fff, 0.5),
      rgba(#fff, 0)
    );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -40px top 0;
    animation: shine 1s ease infinite;
  }

  @keyframes shine {
    to {
      background-position: right -40px top 0;
    }
  }
}
</style>
