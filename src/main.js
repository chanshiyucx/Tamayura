import Vue from 'vue'
import { Collapse } from 'buefy/dist/components/collapse'
import 'buefy/dist/buefy.css'
import App from './App.vue'

// Vue.use(Collapse)
Vue.component('Collapse', Collapse)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
