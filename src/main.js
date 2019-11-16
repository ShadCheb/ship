import Vue from 'vue'
import App from './App.vue'

import 'vue-router';
import router from './router';

import '../public/style/style.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
