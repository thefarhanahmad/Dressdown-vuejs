import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import Policy from "../views/Policy.vue";
import Privacy from "../views/Privacy.vue";
import Terms from "../views/Terms.vue";
import { useStore } from "vuex";
import generationPage from "@/views/GenerationPage.vue";
import VerifyProfile from "@/views/VerifyProfile.vue";
import AboutUs from "@/views/AboutUs.vue";
import App from "@/App.vue";
import GoogleRedirect from "@/views/GoogleRedirect.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/:locale(en|ru|tr|ua|it|de|no|ja|fr|es|sv|pt|ar|pl)?",
    component: App,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        props: (route) => ({
          isRegistration: !!route.query.referral_token,
          referralToken: route.query.referral_token,
          token: "",
          isResetPassword: false,
        }),
      },
      {
        path: "reset_password",
        name: "HomeReset",
        component: Home,
        props: (route) => ({
          token: route.query.token,
          isResetPassword: true,
          isRegistration: false,
          referralToken: "",
        }),
      },
      {
        path: "policy",
        name: "Policy",
        component: Policy,
      },
      {
        path: "privacy",
        name: "Privacy",
        component: Privacy,
      },
      {
        path: "terms",
        name: "Terms",
        component: Terms,
      },
      {
        path: "about-us",
        name: "AboutUs",
        component: AboutUs,
      },
      {
        path: "verify-email/:token",
        name: "VerifyProfile",
        component: VerifyProfile,
        props: true,
      },
      {
        path: "generate-girl",
        name: "Generation",
        component: generationPage,
        meta: { requiresAuth: true },
      },
      {
        path: "auth/google/callback",
        name: "RedirectAfterGoogle",
        component: GoogleRedirect,
        props: (route) => ({
          route: route,
          type: "google",
        }),
      },
      {
        path: "auth/discord/callback",
        name: "RedirectAfterDiscord",
        component: GoogleRedirect,
        props: (route) => ({
          route: route,
          type: "discord",
        }),
      },
    ],
  },
  // {
  //   path: '/edit',
  //   name: 'Edit',
  //   component: Edit
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const store = useStore();

  if (to.query.subid) {
    Cookies.set("subid", to.query.subid, { expires: 30 });
  }

  const isAuthorized = store.getters.isAuthorized;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthorized) {
      next({ name: "Home" });
      store.commit("addModal", "Login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
