<template>
  <div>
    <div class="page-header" :style="{ '--color': subject?.color || '#3b82f6' }">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <span>{{ subject?.name }}</span>
        </div>
        <h1>{{ subject?.name || 'Chargement...' }}</h1>
        <p v-if="subject">{{ subject.chapters?.length || 0 }} chapitre{{ (subject.chapters?.length || 0) > 1 ? 's' : '' }}</p>
      </div>
    </div>

    <div class="container" style="padding-top: 48px; padding-bottom: 80px;">
      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="subject?.chapters?.length" class="chapters-grid">
        <router-link
          v-for="chapter in subject.chapters" :key="chapter.id"
          :to="`/chapitres/${chapter.id}`"
          class="chapter-card"
          :style="{ '--color': subject.color }"
        >
          <div class="chapter-header">
            <h3>{{ chapter.name }}</h3>
            <span class="chapter-count">{{ chapter.document_count }} document{{ chapter.document_count > 1 ? 's' : '' }}</span>
          </div>
          <div class="chapter-footer">
            <span class="chapter-link">Voir les exercices →</span>
          </div>
        </router-link>
      </div>

      <div v-else class="empty-state">
        <h3>Aucun chapitre disponible</h3>
        <p>Le contenu sera bientôt disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api.js'

const route = useRoute()
const subject = ref(null)
const loading = ref(true)

async function load() {
  loading.value = true
  subject.value = null
  try { subject.value = await api.getSubject(route.params.slug) }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
watch(() => route.params.slug, load)
</script>

<style scoped>
.page-header { background: linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--color) 30%, var(--primary)) 100%); }

.chapters-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

.chapter-card {
  background: white; border-radius: var(--radius); padding: 28px;
  text-decoration: none; color: var(--text);
  border: 2px solid transparent; box-shadow: var(--shadow);
  transition: all 0.2s; display: flex; flex-direction: column; gap: 16px;
}
.chapter-card:hover { border-color: var(--color); box-shadow: var(--shadow-lg); color: var(--text); }

.chapter-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.chapter-card h3 { font-size: 1.05rem; line-height: 1.4; margin: 0; }
.chapter-count { font-size: 0.8rem; font-weight: 600; background: color-mix(in srgb, var(--color) 15%, white); color: var(--color); padding: 3px 10px; border-radius: 999px; white-space: nowrap; }

.chapter-footer { margin-top: auto; }
.chapter-link { font-size: 0.9rem; font-weight: 600; color: var(--color); }
</style>
