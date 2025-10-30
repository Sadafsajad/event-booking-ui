import './assets/main.css'
import 'vuetify/styles' // ✅ Vuetify core styles

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// ✅ Vuetify setup
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
    icons: {
      defaultSet: 'mdi', // 👈 this is required
    },
})

// Create Vue app
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // ✅ register Vuetify
app.mount('#app')
