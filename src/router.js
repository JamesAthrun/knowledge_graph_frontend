import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./components/Home"
import CheckForm from "./components/CheckForm"
import Entity from "./components/Entity"
<<<<<<< HEAD
=======
import CreateNew from "./components/CreateNew";
>>>>>>> 9f37d0e967b5eaac1b4ccb3220e33700a8fd412a

Vue.use(VueRouter)

const routes = [
    {path: '/', name:'home', component: Home},
    {path: '/check', name: 'check', component: CheckForm},
    {path: '/entity/:id', name:'entity', component:Entity},
<<<<<<< HEAD
=======
    {path: '/createNew', name:'createNew', component:CreateNew},
>>>>>>> 9f37d0e967b5eaac1b4ccb3220e33700a8fd412a
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router