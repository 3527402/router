import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
let app = createApp(App)
app.use(router).mount('#app')
