import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Layout from './views/Layout.vue'
import { StorageGetter } from './libs/util'

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
        meta: { requiresAuth: true },
      }, {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "orders" */ './views/Orders.vue'),
        meta: { requiresAuth: true },
      }, {
        path: '/manage',
        name: 'manage',
        component: () => import(/* webpackChunkName: "manage" */ './views/Manage.vue'),
        meta: { requiresAuth: true },
      }, {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ './views/My.vue'),
        meta: { requiresAuth: true },
      }]
    },
    {
      path: '/createShop',
      name: 'createShop',
      component: () => import(/* webpackChunkName: "createShop" */ './views/CreateShop.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/msgSuccess',
      name: 'msgSuccess',
      component: () => import(/* webpackChunkName: "msgSuccess" */ './views/MsgSuccess.vue'),
      meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!StorageGetter('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }  else {
    next() // 确保一定要调用 next()
  }
})

export default router
