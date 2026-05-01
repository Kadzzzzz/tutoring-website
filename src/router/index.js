import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Parcours from '@/views/Parcours.vue'
import Pedagogie from '@/views/Pedagogie.vue'
import SubjectView from '@/views/SubjectView.vue'
import ChapterView from '@/views/ChapterView.vue'
import CollesView from '@/views/CollesView.vue'
import ConcoursView from '@/views/ConcoursView.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminDocuments from '@/views/admin/AdminDocuments.vue'
import AdminColles from '@/views/admin/AdminColles.vue'
import AdminConcours from '@/views/admin/AdminConcours.vue'
import AdminSubjects from '@/views/admin/AdminSubjects.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',           name: 'Home',      component: Home,        meta: { title: 'Jeremy Luccioni - Cours Prépa' } },
    { path: '/parcours',   name: 'Parcours',  component: Parcours,    meta: { title: 'Mon Parcours - Jeremy Luccioni' } },
    { path: '/pedagogie',  name: 'Pedagogie', component: Pedagogie,   meta: { title: 'Pédagogie - Jeremy Luccioni' } },
    { path: '/matieres/:slug', name: 'Subject',  component: SubjectView },
    { path: '/chapitres/:id',  name: 'Chapter',  component: ChapterView },
    { path: '/colles',     name: 'Colles',    component: CollesView,  meta: { title: 'Colles - Jeremy Luccioni' } },
    { path: '/concours',   name: 'Concours',  component: ConcoursView,meta: { title: 'Concours - Jeremy Luccioni' } },
    { path: '/admin/login',name: 'AdminLogin',component: AdminLogin,  meta: { title: 'Administration' } },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '',          name: 'AdminDashboard', component: AdminDashboard },
        { path: 'documents', name: 'AdminDocuments', component: AdminDocuments },
        { path: 'colles',    name: 'AdminColles',    component: AdminColles },
        { path: 'concours',  name: 'AdminConcours',  component: AdminConcours },
        { path: 'matieres',  name: 'AdminSubjects',  component: AdminSubjects },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Jeremy Luccioni - Cours Prépa'
  if (to.meta.requiresAuth && !localStorage.getItem('admin_token')) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
