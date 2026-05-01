<template>
  <div>
    <h1 class="page-title">Dashboard</h1>
    <div class="stats-grid" v-if="stats">
      <div class="stat-card">
        <div class="stat-num">{{ stats.documents }}</div>
        <div class="stat-label">Exercices</div>
        <router-link to="/admin/documents" class="stat-link">Gérer →</router-link>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{ stats.chapters }}</div>
        <div class="stat-label">Chapitres</div>
        <router-link to="/admin/matieres" class="stat-link">Gérer →</router-link>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{ stats.colles }}</div>
        <div class="stat-label">Colles</div>
        <router-link to="/admin/colles" class="stat-link">Gérer →</router-link>
      </div>
      <div class="stat-card">
        <div class="stat-num">{{ stats.concours }}</div>
        <div class="stat-label">Concours</div>
        <router-link to="/admin/concours" class="stat-link">Gérer →</router-link>
      </div>
    </div>
    <div v-else class="loading">Chargement...</div>

    <div class="quick-actions">
      <h2>Actions rapides</h2>
      <div class="actions-grid">
        <router-link to="/admin/documents" class="action-btn" @click="$emit('new-doc')">
          ➕ Ajouter un exercice
        </router-link>
        <router-link to="/admin/colles" class="action-btn">
          ➕ Ajouter une colle
        </router-link>
        <router-link to="/admin/concours" class="action-btn">
          ➕ Ajouter un concours
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'

const stats = ref(null)
onMounted(async () => {
  try { stats.value = await api.getStats() }
  catch (e) { console.error(e) }
})
</script>

<style scoped>
.page-title { font-size: 1.8rem; margin-bottom: 2rem; color: var(--text); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
.stat-card { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); text-align: center; }
.stat-num { font-size: 2.5rem; font-weight: 800; color: var(--accent); line-height: 1; }
.stat-label { font-size: 0.9rem; color: var(--text-light); margin: 8px 0 12px; font-weight: 600; }
.stat-link { font-size: 0.85rem; color: var(--accent); text-decoration: none; font-weight: 600; }
.quick-actions h2 { font-size: 1.2rem; margin-bottom: 16px; }
.actions-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.action-btn { padding: 12px 20px; background: white; border-radius: 8px; box-shadow: var(--shadow); font-weight: 600; font-size: 0.95rem; color: var(--accent); text-decoration: none; transition: all 0.2s; border: 2px solid transparent; }
.action-btn:hover { border-color: var(--accent); color: var(--accent); box-shadow: var(--shadow-lg); }
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
