import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { io } from "socket.io-client";
import messages from '@intlify/unplugin-vue-i18n/messages'

import App from './App.vue'
import router from './router'

import 'reseter.css'
import './assets/main.sass'
import PokaAPI from './assets/PokaAPI'
import Player from './assets/Player'
const app = createApp(App)

// Load all components in ./components/ directory
const components = import.meta.globEager('./components/**/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  // "./components/Fruits.vue" will become "Fruits"
  const componentName = path.split('/').slice(2).join('').replace(/\.\w+$/, '')

  // Register component on this Vue instance
  app.component(componentName, definition.default)
})
// Set socket.io to global
const socket = io(location.origin)
app.config.globalProperties.$socket = socket
app.provide('socket', socket)

// Set PokaAPI to global
let pokaAPI = new PokaAPI()
app.config.globalProperties.$PokaAPI = pokaAPI
app.provide('PokaAPI', pokaAPI)

// Set Player to global
const player = new Player()
app.config.globalProperties.$Player = player
app.provide('Player', player)

// Setup i18n
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  messages
})
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')
