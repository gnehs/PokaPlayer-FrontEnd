import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'reseter.css'
import './assets/main.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
