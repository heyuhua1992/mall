// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuex from './vuex/index'
import {router} from './router/index'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import '@/assets/scss/base.scss'
import '@/assets/scss/product.scss'
import '@/assets/scss/checkout.scss'
import {currency} from '@/util/currency'
import toast from '@/util/toast'

Vue.config.productionTip = false
Vue.use(infiniteScroll)
Vue.prototype.$axios = axios
Vue.use(VueLazyLoad, {
  loading: '/static/loading-bars.svg'
})
// 全局过滤器
Vue.filter('currency', currency) // 总价格过滤器
Vue.use(toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: Vuex,
  render: h => h(App)
})
