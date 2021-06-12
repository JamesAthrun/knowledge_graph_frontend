import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from "./router"
import VueFetch from './plugins/request'
import echarts from 'echarts'
import './global-components'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css' //element-ui的css
import state from "./state"
import VueState from "./plugins/state"
import VueCookies from 'vue-cookies'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VueState, state)
Vue.use(VueCookies)

Vue.use(VueFetch, {
    //baseUrl: 'http://192.168.3.15:8082/'
    baseUrl: 'http://localhost:8082/'
})

new Vue({
    el: '#app',
    data: state,
    render: h => h(AppLayout),
    router
})