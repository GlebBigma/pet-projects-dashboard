import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Chart from 'primevue/chart';
import App from './App.vue';
import './style.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  }
});
app.use(ConfirmationService);
app.use(ToastService);
app.component('Chart', Chart);
app.mount('#app');


