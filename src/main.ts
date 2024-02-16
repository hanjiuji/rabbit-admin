import { createApp } from 'vue'
import pinia from '@/stores/index.ts'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'animate.css/animate.min.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
