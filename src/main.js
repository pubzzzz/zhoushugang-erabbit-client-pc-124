import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
import ui from './components/library'

import 'normalize.css'
import '@/assets/styles/common.less'

export default createApp(App).use(store).use(router).use(ui).mount('#app')
