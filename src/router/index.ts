import Vue from 'vue'
import VueRouter from 'vue-router'


import MainFeed from '../views/MainFeed.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import { store } from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainFeed',
    component: MainFeed
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loginStore:any = store;
  const isLoggedIn = loginStore['state']['login']['status']['loggedIn'];

  if (authRequired  && !isLoggedIn) {
    return next('/login');
  }

  next();
})

export default router
