import { createRouter, createWebHistory } from 'vue-router'
import RequestsView from '../views/RequestsView.vue'
import AddMachineView from '../views/AddMachineView.vue'

const routes = [
    { path: '/', name: 'home', component: RequestsView },
    { path: '/add', name: 'add', component: AddMachineView },
]

export default function init() {
    return createRouter({
        history: createWebHistory(),
        routes,
        scrollBehavior(to, from, savedPosition) {
            return savedPosition || { top: 0 }
        },
    })
}
