import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'

import Layout from './views/Layout.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
        path: '/',
        name: 'home',
        component: Home,
      }, {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "orders" */ './views/Orders.vue')
      }, {
        path: '/manage',
        name: 'manage',
        component: () => import(/* webpackChunkName: "manage" */ './views/Manage.vue')
      }, {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ './views/My.vue')
      }]
    },
    {
      path: '/createShop',
      name: 'createShop',
      component: () => import(/* webpackChunkName: "createShop" */ './views/CreateShop.vue')
    },
    {
      path: '/msgSuccess',
      name: 'msgSuccess',
      component: () => import(/* webpackChunkName: "msgSuccess" */ './views/MsgSuccess.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/shop',
      component: Layout,
      children: [{
        path: '/',
        name: 'shop',
        component: () => import(/* webpackChunkName: "shop" */ './views/shop/home.vue'),
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: () => import(/* webpackChunkName: "register_success" */ './views/RegisterSuccess.vue')
    }
  ]
})

export default router
