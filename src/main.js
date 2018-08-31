import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
Vue.prototype.$ajax = axios
new Vue({
  el: '#app',
  render: h => h(App)
})
