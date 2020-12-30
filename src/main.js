import antd from '@/plugins/ant-design-vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(antd).use(router).mount('#app')
