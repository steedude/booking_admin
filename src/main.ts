import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'virtual:svg-icons-register';

import '@/styles/tailwind.postcss';
import '@/styles/index.postcss';
import App from './App.vue';
import router from '@/router';
import elementPlusPlugin from '@/plugins/elementPlus';
import i18NPlugin from '@/plugins/i18n';
import { vue3GooglePlugin, vue3GoogleInstallOptions } from '@/plugins/vue3GoogleLogin';

if (process.env.NODE_ENV === 'mockServiceWorker') {
  const { worker } = await import('@/mocks/browser');

  worker.start();
}

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(elementPlusPlugin);
app.use(i18NPlugin);
app.use(vue3GooglePlugin, vue3GoogleInstallOptions);

app.mount('#app');
