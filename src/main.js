// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/poka.js'
import '@/assets/MaterialSlider.css'
import '@/assets/icon_outline.css'
import '@/assets/progress-bar.sass'

import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import store from './store'
import './registerServiceWorker'

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

import * as PokaComponents from './poka-component'
Object.values(PokaComponents).forEach(PokaComponents => Vue.component(PokaComponents.name, PokaComponents))

Vue.material.theming.theme = window._setting('darkMode') ? "default-dark" : "default"
document.getElementsByTagName('meta')["theme-color"].content = window._setting('darkMode') ? "rgb(33, 33, 33)" : "rgb(245, 245, 245)"
window._theme = {
  switchToDark() {
    Vue.material.theming.theme = "default-dark";
    document.getElementsByTagName('meta')["theme-color"].content = "rgb(33, 33, 33)";
    window._setting('darkMode', true)
  },
  switchToLight() {
    Vue.material.theming.theme = "default";
    document.getElementsByTagName('meta')["theme-color"].content = "rgb(245, 245, 245)";
    window._setting('darkMode', false)
  }
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})