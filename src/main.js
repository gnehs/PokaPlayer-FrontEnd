// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/poka.js'
import '@/assets/MaterialSlider.css'
import '@/assets/icon_outline.css'

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

import * as PokaComponents from './poka-component'
import vuetify from './plugins/vuetify';
Object.values(PokaComponents).forEach(PokaComponents => Vue.component(PokaComponents.name, PokaComponents))

// 偵測暗黑模式
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
themeSwitch(darkModeMediaQuery.matches)
darkModeMediaQuery.addListener(e => {
  const darkModeOn = e.matches;
  themeSwitch(darkModeOn)
});

function themeSwitch(dark = false) {
  vuetify.framework.theme.isDark = dark
  document.getElementsByTagName('meta')["theme-color"].content = dark ? "rgb(47, 43, 62)" : "rgb(245, 245, 245)"
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
  vuetify,
  render: h => h(App)
})