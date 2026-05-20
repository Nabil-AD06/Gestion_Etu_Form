import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import EtudiantDashboard from '../components/EtudiantDashboard.vue'

const routes = [
  // Page d'accueil publique (landing page)
  { path: '/accueil', component: Home },

  // Authentification
  { path: '/', component: Register },
  { path: '/login', component: Login },

  // Dashboard étudiant (après connexion)
  {
    path: '/etudiant',
    component: EtudiantDashboard,
    meta: { requiresAuth: true, role: 'ETUDIANT' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navigation (optionnel mais recommandé)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) {
      next('/login')
    } else if (to.meta.role && role !== to.meta.role) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router