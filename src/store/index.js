import { createStore } from 'vuex'
import modals from "./modules/modals";
import auth from "./modules/authentication";
import toast from "./modules/toast";
import payments from "./modules/payments";
import generation from "./modules/generation";
import languages from "./modules/languages";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    modals,
    auth,
    toast,
    payments,
    languages,
    generation,
  }
})
