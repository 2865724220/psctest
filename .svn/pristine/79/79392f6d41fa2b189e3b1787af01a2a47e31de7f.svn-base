// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common.css'
import echarts from 'echarts'
import axios from 'axios'
// import 'vue2-toast/lib/toast.css'
// import Toast from 'vue2-toast'

// Vue.use(Toast, {
//   type: 'center',
//   duration: 3000,
//   wordWrap: true,
//   width: '150px'
// })

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

// Vue.prototype.$way = 'http://10.180.203.164:8000/rbpea/api/'
// 原创方法

// axios.defaults.baseURL = 'http://10.180.203.164:8000/rbpea/api/'
axios.defaults.baseURL = 'http://127.0.0.1:8000/rbpea/api/'
// axios.defaults.baseURL = 'https://103.28.215.253:10094/rbpea/api/ea1001/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// axios.create({
//   baseURL: 'http://10.180.203.164:8000/rbpea/api/'
// })
