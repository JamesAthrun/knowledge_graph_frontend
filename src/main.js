import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from "./router"
import VueFetch, { $fetch } from './plugins/fetch'
import echarts from 'echarts'
<<<<<<< HEAD
import './global-components'
=======
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import './global-components'
import axios from "axios"
import VueAxios from "vue-axios"
>>>>>>> 9f37d0e967b5eaac1b4ccb3220e33700a8fd412a

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.use(VueFetch, {
<<<<<<< HEAD
    baseUrl: 'http://localhost:3000/'
=======
    baseUrl: 'http://localhost:8082/'
>>>>>>> 9f37d0e967b5eaac1b4ccb3220e33700a8fd412a

})

new Vue({
    el:'#app',
    render: h => h(AppLayout),
    router
})