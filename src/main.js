import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from "./router"
import VueFetch, { $fetch } from './plugins/fetch'
import echarts from 'echarts'
import './global-components'
import axios from "axios"
import VueAxios from "vue-axios"

Vue.prototype.$echarts = echarts

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:8082/'

})

new Vue({
    el:'#app',
    render: h => h(AppLayout),
    router
})