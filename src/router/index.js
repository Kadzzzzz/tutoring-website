import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Resources from '@/views/Resources.vue'
import Colles from '@/views/Colles.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Jeremy Luccioni - Cours Particuliers'
      }
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
      meta: {
        title: 'Toutes les Ressources - Jeremy Luccioni'
      }
    },
    {
      path: '/colles',
      name: 'Colles',
      component: Colles,
      meta: {
        title: 'Exercices de Colles - Jeremy Luccioni'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si on a une position sauvegardée (navigation avec boutons back/forward)
    if (savedPosition) {
      return savedPosition
    }
    // Pour toute autre navigation, aller en haut
    return { top: 0, behavior: 'smooth' }
  }
})

// Mise à jour du titre de la page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jeremy Luccioni - Cours Particuliers'
  next()
})

export default router