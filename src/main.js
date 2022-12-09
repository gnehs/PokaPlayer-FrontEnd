import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'reseter.css'
import './assets/main.sass'
import PokaAPI from './assets/PokaAPI'
const app = createApp(App)
const components = import.meta.globEager('./components/**/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  // "./components/Fruits.vue" will become "Fruits"
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')

  // Register component on this Vue instance
  app.component(componentName, definition.default)
})
app.config.globalProperties.$PokaAPI = new PokaAPI()
app.use(createPinia())
app.use(router)

app.mount('#app')
