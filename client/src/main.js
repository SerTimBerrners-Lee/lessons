import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Unicon from 'vue-unicons'
import { uniPlus, uniTimes, uniAngleLeftB, uniAngleRightB } from 'vue-unicons/dist/icons'

Unicon.add([uniPlus, uniTimes, uniAngleLeftB, uniAngleRightB])

createApp(App)
  .use(store)
  .use(router)
  .use(Unicon, {
    height: 20, 
    width: 20 
  }).mount('#app')
