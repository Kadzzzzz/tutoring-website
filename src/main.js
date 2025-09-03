// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Styles globaux
import './assets/styles/main.css'

const app = createApp(App)

// Plugins
app.use(createPinia())
app.use(router)

// Mount l'application
app.mount('#app')