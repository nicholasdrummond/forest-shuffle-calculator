import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import axios from './plugins/axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios, 'http://localhost:3001/')

app.mount('#app')
