import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueSocketIO from 'vue-socket.io';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_BACKEND_ENDPOINT as string,
  }),
);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
