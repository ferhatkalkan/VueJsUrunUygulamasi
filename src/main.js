import Vue from 'vue';
import App from './App.vue';
import { router } from "./router";
import { store } from "./store/store"
import VueResource from 'vue-resource';

Vue.use(VueResource);

//Para formatlama
// {{ purchase | currency }}
Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) + " TL"; // toLocaleString -> locale para formatı
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
})
