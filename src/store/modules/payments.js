import { apiInstance } from "@/core/axios";
export default {
  state: {
    balance: 0,
    balanceLink: "",
    cryptoLink: "",
    userEmail: "",
    selectedSum: 15,
  },
  getters: {
    getBalanceLink(state) {
      return state.balanceLink;
    },
    getCryptoLink(state) {
      return state.cryptoLink;
    },
    getMyBalance(state) {
      return state.balance;
    },
    getSelectedSum(state) {
      return state.selectedSum;
    },
  },
  mutations: {
    setBalanceLink(state, link) {
      state.balanceLink = link;
    },
    setCryptoLink(state, link) {
      state.cryptoLink = link;
    },
    setEmail(state, email) {
      state.userEmail = email;
    },
    clearPaymentData(state) {
      state.balanceLink = "";
      state.cryptoLink = "";
    },
    setMyBalance(state, payload) {
      state.balance = payload;
    },
    setSumForPayment(state, payload) {
      state.selectedSum = payload;
    },
  },
  actions: {
    async setCryptoLink({ rootState, dispatch, commit }, formData) {
      try {
        const response = await apiInstance.post(
          "/api/payments/initiate-crypto/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        commit("setCryptoLink", response.data.url);

        return response.data.url;
      } catch (error) {
        console.log(error);
      }
    },
    async setBalance({ rootState, dispatch, commit }, formData) {
      try {
        const response = await apiInstance.post(
          "/api/payments/initiate/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        commit("setBalanceLink", response.data.checkout);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCash() {
      try {
        await apiInstance.get(
          "https://finaltestundress-de54dd54b61b.herokuapp.com/api/payments/initiate"
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
