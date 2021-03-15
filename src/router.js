import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./components/Home"
import CheckForm from "./components/CheckForm"
import Entity from "./components/Entity"

Vue.use(VueRouter)

const routes = [
    {path: '/', name:'home', component: Home},
    {path: '/check', name: 'check', component: CheckForm},
    {path: '/entity/:id', name:'entity', component:Entity},
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router