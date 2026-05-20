import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Accueil from '../components/Acceuil.vue'

const routes = [
  { path: '/', component: Register },
  { path: '/login', component: Login },
  { path: '/accueil', component: Accueil }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router