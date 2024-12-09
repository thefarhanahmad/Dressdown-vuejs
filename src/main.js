import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vClickOutside from "click-outside-vue3"
import './assets/styles/global.scss';
import 'vue3-toastify/dist/index.css';
import { VueReCaptcha } from 'vue-recaptcha-v3';

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(VueReCaptcha, { siteKey: '6Lf7Vj0qAAAAAOmhILsMjORc2JAAxbHJAw-2-9Yo' })
  .use(vClickOutside)
  .mount('#app')
