import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Parcours from '@/views/Parcours.vue'
import Pedagogie from '@/views/Pedagogie.vue'
import Resources from '@/views/Resources.vue'
import Colles from '@/views/Colles.vue'
import ResourceEditor from '@/views/ResourceEditor.vue'

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
      path: '/parcours',
      name: 'Parcours',
      component: Parcours,
      meta: {
        title: 'Mon Parcours - Jeremy Luccioni'
      }
    },
    {
      path: '/pedagogie',
      name: 'Pedagogie',
      component: Pedagogie,
      meta: {
        title: 'Pédagogie & Méthode - Jeremy Luccioni'
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
    },
    {
      path: '/gestion-ressources',
      name: 'ResourceEditor',
      component: ResourceEditor,
      meta: {
        title: 'Gestion des Ressources - Jeremy Luccioni'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jeremy Luccioni - Cours Particuliers'
  next()
})

export default router