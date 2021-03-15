import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from "./router"
import VueFetch, { $fetch } from './plugins/fetch'
import echarts from 'echarts'
import './global-components'

Vue.prototype.$echarts = echarts

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000/'

})

new Vue({
    el:'#app',
    render: h => h(AppLayout),
    router
})