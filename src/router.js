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
import Question from "./components/Question";
import EntityTree from "./components/EntityTree";
import SearchBox from "./components/SearchBox";
import MyGroup from "./components/MyGroup";

Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/check', name: 'check', component: CheckForm},
    {path: '/entity/:id', name: 'entity', component: Entity},
    {path: '/entity/tree/:id', name: 'entityTree', component: EntityTree},
    {path: '/KGDetail/:id', name: 'KGDetail', component: KGDetail},
    {path: '/search', name: 'innerSearch', component: SearchBox},
    {path: '/question', name: 'innerQuestion', component: Question},
    {path: '/createNew', name: 'createNew', component: CreateNew},
    {path: '/login', name: 'login', component: Login},
    {path: '/user/home', name: 'myHome', component: MyHome},
    {path: '/user/myKG', name: 'myKG', component: MyKGList},
    {path: '/user/myGroup', name: 'myGroup', component: MyGroup},
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router