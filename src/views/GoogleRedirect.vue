<template>
  <div class="c-redirecting">
    <load-animation />
    <img src="//tsyndicate.com/api/v2/cpa/192272/pixel.gif" />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import LoadAnimation from "@/components/animations/LoadAnimation.vue";
import { onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "RedirectAfterGoogle",
  components: { LoadAnimation },
  props: {
    type: String,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const sendSubid = async (subid) => {
      try {
        await axios.get("https://ktr.dressdown.ai/6e4c40f/postback", {
          params: {
            subid,
            status: "lead",
          },
        });

        console.log("Subid sent successfully");
      } catch (error) {
        console.error("Error sending subid:", error);
      }
    };

    onMounted(() => {
      const subid = Cookies.get("subid");

      if (subid) {
        sendSubid(subid);
      }

      store.dispatch("loginByGoogleAfterCallBack", {
        link: props.type,
        payload: {
          code: route.query.code,
          state: route.query.state,
        },
      });

      setTimeout(() => {
        router.push("/");
        if (store.getters.isAuthorized) {
          store.commit("addModal", "Guide");
        }
      }, 1000);
    });

    return {
      route,
      router,
    };
  },
};
</script>

<style lang="scss">
.c-redirecting {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
