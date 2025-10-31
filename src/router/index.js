import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Report from '../views/Reports.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true } // 👈 only for logged in users
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true } // 👈 redirect to home if already logged in
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guestOnly: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => Report,
      meta: { requiresAuth: true, adminOnly: true }
    }

  ]
})

// 🔐 Global navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  // If route needs login and user not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }

  // If route is guest-only but user is logged in
  if (to.meta.guestOnly && isLoggedIn) {
    return next({ name: 'home' })
  }

  // Otherwise allow navigation
  next()
})

export default router
