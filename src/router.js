import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./components/Home"
import CheckForm from "./components/CheckForm"
import Entity from "./components/Entity"
import CreateNew from "./components/CreateNew";
import Login from "./components/Login";
import MyHome from "./components/MyHome";
import KGDetail from "./components/KGDetail";
import MyKGList from "./components/MyKGList";
import EntityTree from "./components/EntityTree";

Vue.use(VueRouter)

const routes = [
    {path: '/', name:'home', component: Home},
    {path: '/check', name: 'check', component: CheckForm},
    {path: '/entity/:id', name:'entity', component:Entity},
    {path: '/entity/tree/:id', name:'entityTree', component:EntityTree},
    {path: '/KGDetail/:id', name:'KGDetail', component:KGDetail},
    {path: '/createNew', name:'createNew', component:CreateNew},
    {path: '/login', name: 'login', component: Login},
    {path: '/:user', name: 'myHome', component: MyHome},
    {path: '/:user/myKG', name: 'myHome', component: MyKGList},
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router