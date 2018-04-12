
import Vue from 'vue'
import App from './App'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueX from 'vuex'
import store from './util/global'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueX)
// Vue.use(store)
axios.defaults.baseURL='http://127.0.0.1:8084/glue';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
/* eslint-disable no-new */
const router = new VueRouter({
  routes:routes,
  mode: 'history',
  base: '/glue/', //加上这一行
})
new Vue({
 // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

