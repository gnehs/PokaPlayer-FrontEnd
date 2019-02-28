// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/poka.js'

import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

import headerWrapper from '@/components/header-wrapper.vue'
import pokaCard from '@/components/card.vue'
import pokaCards from '@/components/cards.vue'
import pokaLoader from '@/components/loader.vue'
import parsePlaylists from '@/components/parse-playlists.vue'
Vue.component("poka-header", headerWrapper)
Vue.component("poka-card", pokaCard)
Vue.component("poka-cards", pokaCards)
Vue.component("poka-loader", pokaLoader)
Vue.component("poka-parse-playlists", parsePlaylists)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})