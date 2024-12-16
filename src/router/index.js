import { createRouter, createWebHistory } from 'vue-router'
import Router from '../../plugins/router'
import Home from '../pages/Home.vue'
import Other from '../pages/Other.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    // component: Other,
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
  },
  {
    name: 'Other',
    path: '/other',
    component: Other,
  },
]
const router = new Router({
  // history: createWebHistory(),
  routes,
})
// const router = new createRouter({
//   history: createWebHistory(),
//   routes,
// })
export default router
