import { apiInstance } from "@/core/axios";
import Cookies from "js-cookie";
import i18n from "@/i18n";
import axios from "axios";
export default {
  state: {
    profileData: {},
    token: "",
    myRefLinks: "",
    referralLinkForRegister: "",
    resetToken: "",
    spentMoney: 0,
  },
  getters: {
    isAuthorized(state) {
      return !!(!!state.token || localStorage.getItem("token"));
    },
    getMyReferralLink(state) {
      return state.myRefLinks.referral_link;
    },
    getMyReferralUsersCount(state) {
      return state.myRefLinks.referral_count;
    },
    getOwnedTokens(state) {
      return state.myRefLinks.reffered_tokens;
    },
    getReferralLinkForRegistration(state) {
      return state.referralLinkForRegister;
    },
    getResetToken(state) {
      return state.resetToken;
    },
    getSpentMoney(state) {
      return state.spentMoney;
    },
  },
  mutations: {
    clearProfileData(state) {
      state.profileData = {};
    },
    setReferralLinkForRegister(state, payload) {
      state.referralLinkForRegister = payload;
    },
    setResetToken(state, payload) {
      state.resetToken = payload;
    },
    setProfileData(state, payload) {
      state.profileData = payload;
    },
    setSpentMoney(state, payload) {
      state.spentMoney = payload;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setRefLink(state, payload) {
      state.myRefLinks = payload;
    },
  },
  actions: {
    async logout({ commit, dispatch }) {
      await commit("clearProfileData");
      await commit("clearToken");
      dispatch("handleToast", {
        text: "Successful logout!",
        type: "WARNING",
      });
      localStorage.removeItem("email");
      localStorage.removeItem("order-id");
    },

    async loginByGoogleAfterCallBack({ commit, dispatch }, { payload, link }) {
      try {
        const response = await apiInstance.get(`/auth/${link}/callback`, {
          params: {
            ...payload,
          },
        });
        await commit("setToken", response.data.access_token);

        dispatch("handleToast", {
          text: "Successfully!",
          type: "SUCCESS",
        });
        await dispatch("getUserProfile");
        await dispatch("getMyRefLink");
      } catch (error) {
        console.log(error);
      }
    },

    async verifyEmail({ dispatch }, { id, token }) {
      try {
        const response = await apiInstance.get(`/verify-email/${token}`);
        dispatch("handleToast", {
          text: response.data.message,
          type: "SUCCESS",
        });
      } catch (error) {
        dispatch("handleToast", {
          text: error.response.data.message,
          type: "ERROR",
        });
      }
    },

    async setPromoCode({ state, dispatch }, { code }) {
      try {
        const response = await apiInstance.get("/use-promo-code", {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "multipart/form-data",
          },
          params: {
            code,
          },
        });
        dispatch("handleToast", {
          text: response.data.Done,
          type: "SUCCESS",
        });
        dispatch("getUserProfile");
      } catch (error) {
        console.log(error);
        dispatch("handleToast", {
          text: error.response.data.message,
          type: "ERROR",
        });
      }
    },

    async getMyRefLink({ state, commit }) {
      try {
        const response = await apiInstance.get("/get-ref-link", {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        commit("setRefLink", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async resetPassword({ dispatch, commit }, payload) {
      try {
        const response = await apiInstance.post("/reset-password", payload);
        await commit("removeModal");
        await commit("addModal", "Login");
        setTimeout(async () => {
          await dispatch("handleToast", {
            text: response.data.message,
            type: "SUCCESS",
          });
        }, 600);
      } catch (error) {
        console.log(error);
        dispatch("handleToast", {
          text: error.response.data.message,
          type: "WARNING",
        });
      }
    },

    async getDiscordToken(code) {
      const clientId = "1284424844234199040";
      const clientSecret = "YOUR_DISCORD_CLIENT_SECRET";
      const redirectUri = "YOUR_REDIRECT_URI";

      const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    },

    async getDiscordUser(token) {
      const response = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },

    async registration({ dispatch, commit }, formData) {
      try {
        const response = await apiInstance.post("/register", formData);

        dispatch("handleToast", {
          text: i18n.global.t(response.data.message),
          type: "SUCCESS",
        });

        commit("removeAllModal");

        const subid = Cookies.get("subid");
        if (subid) {
          try {
            await axios.get("https://ktr.dressdown.ai/6e4c40f/postback", {
              params: {
                subid,
                status: "lead",
              },
            });
          } catch (error) {
            console.error("Error sending postback:", error);
          }
        }
      } catch (error) {
        console.error(error);
        dispatch("handleToast", {
          text: i18n.global.t(error.response.data.message),
          type: "WARNING",
        });
      }
    },

    async passwordRecovery({ dispatch, commit }, { email }) {
      try {
        const response = await apiInstance.post("/send-reset-email", {
          email,
        });
        dispatch("handleToast", {
          text: response.data.message,
          type: "SUCCESS",
        });
        commit("removeAllModal");
        localStorage.setItem("email", email);
      } catch (error) {
        console.log(error);
        dispatch("handleToast", {
          text: error.message,
          type: "WARNING",
        });
      }
    },

    async getUserProfile({ state, commit }) {
      try {
        const profile = await apiInstance.get("/user-profile", {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        commit("setMyBalance", profile.data.balance);
        commit("setSpentMoney", profile.data.money_spent);
      } catch (error) {
        console.log(error);
      }
    },

    async login({ dispatch, commit }, formData) {
      try {
        const response = await apiInstance.post("/login", formData);

        commit("setProfileData", response.data.user);
        await commit("setToken", response.data.access_token);

        dispatch("handleToast", {
          text: "Successfully!",
          type: "SUCCESS",
        });
        await dispatch("getUserProfile");
        await dispatch("getMyRefLink");
        commit("removeAllModal");
      } catch (error) {
        console.log(error);
        dispatch("handleToast", {
          text: i18n.global.t(error.response.data.message),
          type: "WARNING",
        });
      }
    },

    async authByGoogle({ dispatch, commit, state }, token) {
      console.log(state.referralLinkForRegister);
      try {
        const response = await apiInstance.get("/auth/google", {
          params: {
            referral_token: state.referralLinkForRegister,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch("handleToast", {
          text: "Successfully!",
          type: "SUCCESS",
        });
      } catch (error) {
        console.log(error);
        dispatch("handleToast", {
          text: i18n.global.t(error.response.data.message),
          type: "WARNING",
        });
      }
    },
  },
};
