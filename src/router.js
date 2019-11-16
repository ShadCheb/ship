import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ListPage from './pages/ListPage.vue';


export default new VueRouter ({
  routes: [
    {
      path: '/',
      name: 'ListPage',
      component: ListPage
    }
  ],
  mode: 'history',
  base: '/',
});

