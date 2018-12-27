import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import htmlToPdf from './utils/htmlToPdf'

Vue.use(Buefy)
Vue.use(htmlToPdf)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
