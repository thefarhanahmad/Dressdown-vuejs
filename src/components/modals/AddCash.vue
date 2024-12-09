<template>
  <ModalWrapper :model-name="modelName">
    <div class="add-cash-modal">
      <div class="add-cash-modal-head">
        <p class="add-cash-modal-head_title">
          {{ $t("modals.addCash") }}
        </p>
        <div @click="onClose" class="add-cash-modal-head_close">
          <img src="@/assets/icons/close.svg" alt="close remove" />
        </div>
      </div>
      <div class="add-cash-modal-promotion">
        <div class="add-cash-modal-promotion-text">
          <span>{{ $t("addCash.hurry") }}</span>
          <span class="add-cash-modal-promotion-text_promotion">
            <span class="add-cash-modal-promotion-text_promotion-item">{{
              $t("addCash.promotion")
            }}</span>
            <img
              class="add-cash-modal-promotion-text_promotion-image"
              src="@/assets/fire.png"
              alt="fire promotion"
            />
          </span>
        </div>
      </div>
      <div class="add-cash-modal_body">
        <div
          v-for="amount of baseAmounts"
          :key="amount.id"
          @click="setAmount(amount), handleCash()"
          :class="{
            'add-cash-modal_body-item--active': amount.id === checkedSum,
            'add-cash-modal_body-item-first': amount.id === 0,
            'add-cash-modal_body-item-second': amount.id === 1,
            'add-cash-modal_body-item-third': amount.id === 2,
            'add-cash-modal_body-item-fourth': amount.id === 3,
          }"
          class="add-cash-modal_body-item"
        >
          <div class="add-cash-modal_body-item-text-plan">
            <p class="add-cash-modal_body-item-wrapper-text">
              {{ $t("modals.planText", { amount: amount.amount }) }}
            </p>
          </div>

          <span class="add-cash-modal_body-item-text">
            <p
              v-show="amount.promotion > 0 && amount.prevCoin > 0"
              class="add-cash-modal_body-item-text-promotion"
            >
              {{ amount.prevCoin }}
            </p>

            <span class="add-cash-modal_body-item-wrapper">
              <img
                class="add-cash-modal_body-item-text_icon"
                src="@/assets/small-logo.png"
                alt="small coin money"
              />
            </span>
          </span>
          <span class="add-cash-modal_body-item-euros"
            >{{ amount.euros }} €</span
          >
          <div
            class="add-cash-modal_body-item-payments"
            :class="{
              'add-cash-modal_body-item-payments--once': amount.euros === 5,
            }"
          >
            <img
              v-show="amount.euros > 5"
              class="add-cash-modal_body-item-payments-icon"
              src="@/assets/visaMaster.svg"
              alt="visa master pay card"
            />
            <img
              class="add-cash-modal_body-item-payments-icon add-cash-modal_body-item-payments-crypto"
              src="@/assets/usdtTrc.svg"
              alt="crypto usdt tron trc"
            />
          </div>
          <span class="add-cash-modal_body-item-promotion">
            <span
              v-show="amount.promotion > 0"
              class="add-cash-modal_body-item-promotion_text"
              >-{{ amount.promotion }}%</span
            >
            <img
              v-show="amount.isHaveFire"
              src="@/assets/fire.png"
              alt="fire promotion hot"
            />
          </span>
        </div>
      </div>
      <div class="add-cash-modal_footer">
        <span class="add-cash-modal_footer-text">
          {{ $t("addCash.privacy") }}
        </span>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "AddCash",
  components: {
    ModalWrapper,
  },
  props: {
    modelName: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const checkedSum = ref(15);
    const baseAmounts = [
      {
        id: 0,
        amount: 15,
        euros: 15,
        promotion: 0,
        prevCoin: 0,
        isHaveFire: false,
      },
      {
        id: 1,
        amount: 30,
        euros: 25,
        promotion: 0,
        prevCoin: 0,
        isHaveFire: false,
      },
      {
        id: 2,
        amount: 45,
        euros: 35,
        promotion: 15,
        prevCoin: 0,
        isHaveFire: true,
      },
      {
        id: 3,
        amount: 60,
        euros: 45,
        promotion: 25,
        prevCoin: 0,
        isHaveFire: false,
      },
    ];

    const _getSelectedSum = computed(() => {
      return store.getters.getSelectedSum;
    });

    const setAmount = async (amount) => {
      checkedSum.value = amount.id;
      await store.commit("setSumForPayment", amount.id);
    };

    const handleCash = async () => {
      const formData = new FormData();
      formData.append("token", "USDTTRC");
      store.commit("addModal", "RedirectModal");

      formData.append(
        "amount",
        baseAmounts.find((item) => item.id === checkedSum.value).euros
      );
      const response = await store.dispatch("setBalance", formData);
      const cryptoLink = await store.dispatch("setCryptoLink", formData);
      if (response && cryptoLink) {
        checkedSum.value = 15;
      }
    };

    const onClose = () => {
      store.commit("removeAllModal");
      emit("closeModal");
      store.dispatch("getUser Profile");
    };

    return {
      checkedSum,
      baseAmounts,
      setAmount,
      handleCash,
      onClose,
    };
  },
};
</script>

<style lang="scss">
.add-cash-modal {
  background-color: rgb(22, 22, 22);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 15px;
  width: 500px;
  @media screen and (max-width: 900px) {
    width: 95%;
  }
  @media screen and (max-height: 540px) {
    overflow: auto;
    height: 90vh;
  }
  &-promotion {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &-timer {
      background: #b4f12f;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      padding: 10px 15px;
      height: 35px;
      @media screen and (max-width: 550px) {
        height: 25px;
        padding: 10px;
      }
      &_item {
        font-size: 22px;
        color: #000;
        @media screen and (max-width: 550px) {
          font-size: 16px;
        }
      }
    }
    &-text {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: 700;

      &_promotion {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        &-item {
        }
        &-image {
          width: 28px;
        }
      }
    }
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    &_title {
      font-weight: 700;
      font-size: 18px;
      text-transform: uppercase;
    }
    &_close {
      cursor: pointer;
    }
  }
  &_body {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 15px;
    padding-bottom: 15px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      width: 100%;
      padding: 5px 15px;
      height: 65px;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid #b4f12f;
      border-bottom: 4px solid #b4f12f;
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(121, 119, 119, 0.6);
      &-first {
        background-image: url("../../assets/icons/addCash/top1bg.svg");
      }
      &-second {
        background-image: url("../../assets/icons/addCash/top2bg.svg");
      }
      &-third {
        background-image: url("../../assets/icons/addCash/top3bg.svg");
      }
      &-fourth {
        background-image: url("../../assets/icons/addCash/top4bg.svg");
      }
      &--active {
        .add-cash-modal_body-item-text {
          color: #ffffff;
        }
      }
      &-wrapper {
        display: flex;
        align-items: center;
        gap: 5px;
        &-text {
          font-weight: 700;
          font-size: 24px;
          color: #b4f12f;
        }
      }
      &-text {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        margin-top: 1px;
        color: #b4f12f;
        font-weight: 600;
        font-size: 24px;
        &-promotion {
          font-size: 16px;
          text-decoration: line-through;
          color: #b4f12f;
        }
        &-plan {
          margin-inline: auto;
          position: absolute;
          text-transform: uppercase;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          & > p {
            font-size: 20px;
            @media screen and (max-width: 678px) {
              font-size: 16px;
            }
          }
        }
        &_icon {
          width: 25px;
          height: 25px;
        }
      }
      &-payments {
        position: absolute;
        left: 50px;
        top: 33px;
        display: flex;
        align-items: center;
        gap: 3px;
        &--once {
          top: 8px;
          left: 0;
          img {
            width: 30px;
            height: 20px;
          }
        }
        &-icon {
          width: 40px;
          height: 30px;
        }
        &-crypto {
          height: 18px;
          width: 25px;
        }
      }
      &-euros {
        position: absolute;
        top: 65%;
        color: #fff;
        font-weight: 600;
        left: 10px;
      }
      &-promotion {
        position: absolute;
        top: 10%;
        left: 5px;
        display: flex;
        align-items: center;

        &_text {
          padding: 4px 12px;
          background: #b4f12f;
          color: #000;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
        }

        img {
          width: 20px;
        }
      }
    }
  }
  &_footer {
    padding-top: 10px;
    //border-top: 1px solid #f5f5f561;
    &-btn {
      cursor: pointer;
      border: none;
      background-color: #b4f12f;
      color: #000000;
      height: 35px;
      outline: none;
      border-radius: 8px;
      font-size: 16px;
      width: 100%;
      &:hover {
        opacity: 0.86;
      }
    }
    &-text {
      text-align: center;
      display: block;
      opacity: 0.2;
      max-width: 95%;
      margin: 0 auto;
    }
  }
}
</style>
