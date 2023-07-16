import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css/core';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSplide);
})
