import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Resources from '@/views/Resources.vue'

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
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Mise à jour du titre de la page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jeremy Luccioni - Cours Particuliers'
  next()
})

export default router