import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App).use(Layui)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
