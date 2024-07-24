import './assets/main.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {plugin, defaultConfig} from '@formkit/vue';
import {useToast} from 'vue-toast-notification';

import config from '../formkit.config';
import App from './App.vue';
import router from './router';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const $toast = useToast({position: 'top-right', duration: 5000});

const app = createApp(App);
app.provide('toast', $toast); //* Provide always declares in main
app.use(createPinia());
//*config Formkit
app.use(plugin, defaultConfig(config));
app.use(router);

app.mount('#app');
