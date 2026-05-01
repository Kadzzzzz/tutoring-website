<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <router-link to="/" class="back-site">← Site</router-link>
        <div class="sidebar-title">Administration</div>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" :class="{ active: $route.path === '/admin' }">
          <span class="nav-icon">📊</span> Dashboard
        </router-link>
        <router-link to="/admin/documents">
          <span class="nav-icon">📝</span> Exercices
        </router-link>
        <router-link to="/admin/colles">
          <span class="nav-icon">📋</span> Colles
        </router-link>
        <router-link to="/admin/matieres">
          <span class="nav-icon">📚</span> Matières & Chapitres
        </router-link>
      </nav>
      <button class="logout-btn" @click="logout">Déconnexion</button>
    </aside>
    <main class="admin-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; }

.sidebar {
  width: 240px; background: #1a1a2e; color: white;
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0; height: 100vh;
}

.sidebar-top { padding: 20px 16px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.back-site { font-size: 0.8rem; color: rgba(255,255,255,0.5); text-decoration: none; display: block; margin-bottom: 8px; }
.back-site:hover { color: white; }
.sidebar-title { font-size: 1rem; font-weight: 700; color: white; }

.sidebar-nav { flex: 1; padding: 12px 0; display: flex; flex-direction: column; }
.sidebar-nav a {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; color: rgba(255,255,255,0.65);
  text-decoration: none; font-size: 0.95rem; font-weight: 500;
  transition: all 0.2s; border-left: 3px solid transparent;
}
.sidebar-nav a:hover, .sidebar-nav a.router-link-active, .sidebar-nav a.active {
  background: rgba(59,130,246,0.15); color: white; border-left-color: var(--accent);
}
.nav-icon { font-size: 1rem; width: 20px; text-align: center; }

.logout-btn {
  margin: 16px; padding: 10px;
  background: rgba(239,68,68,0.15); color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.3); border-radius: 8px;
  font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
}
.logout-btn:hover { background: rgba(239,68,68,0.3); }

.admin-main { margin-left: 240px; flex: 1; background: #f8f9fa; min-height: 100vh; padding: 32px; }
</style>
