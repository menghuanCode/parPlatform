import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'

import './plugins/weui'
import './plugins/vueResource'
import './plugins/validater'

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
