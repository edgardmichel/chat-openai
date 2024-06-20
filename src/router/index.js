/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
//import { createRouter, createWebHistory } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router'
//import { setupLayouts } from 'virtual:generated-layouts'

import index from '../pages/index.vue'
import CadastroUsuario from '../pages/CadastroUsuario.vue'
import UserLogin from '../pages/UserLogin.vue'
import UserProfile from '../pages/UserProfile.vue'
import UserConfig from '../pages/UserConfig.vue'
import ChatOpenAi from '../pages/ChatOpenAi.vue'

import { auth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if(!user) {
    next({ name: 'UserLogin' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //extendRoutes: setupLayouts,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: requireAuth
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: UserProfile,
      beforeEnter: requireAuth
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: UserConfig,
      beforeEnter: requireAuth
    },
    {
      path: '/chatopenai',
      name: 'ChatOpenAi',
      component: ChatOpenAi,
      beforeEnter: requireAuth
    },
    {
      path: '/cadastro',
      name: 'CadastroUsuario',
      component: CadastroUsuario
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
  ]
})

export default router
