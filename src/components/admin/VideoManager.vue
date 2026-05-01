<template>
  <div class="video-manager">
    <h4 class="vm-title"><i class="fas fa-play-circle"></i> Vidéos corrigées</h4>

    <div v-if="videos.length" class="vm-list">
      <div v-for="v in videos" :key="v.id" class="vm-row">
        <i class="fas fa-play-circle vm-icon"></i>
        <span class="vm-label">{{ v.title || 'Vidéo corrigée' }}</span>
        <a :href="v.url" target="_blank" class="vm-link">Voir</a>
        <button class="vm-del" @click="remove(v.id)">✕</button>
      </div>
    </div>
    <p v-else class="vm-empty">Aucune vidéo.</p>

    <div class="vm-add">
      <input v-model="newTitle" placeholder="Titre (ex: Exercice 1)" class="vm-input" />
      <input v-model="newUrl" placeholder="URL YouTube / autre..." class="vm-input vm-url" />
      <button class="btn btn-primary vm-btn" @click="add" :disabled="!newUrl.trim()">Ajouter</button>
    </div>
    <p v-if="error" class="vm-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '@/api.js'

const props = defineProps({
  entityType: { type: String, required: true },
  entityId:   { type: Number, required: true },
  videos:     { type: Array, default: () => [] }
})
const emit = defineEmits(['update'])

const newTitle = ref('')
const newUrl   = ref('')
const error    = ref('')

async function add() {
  if (!newUrl.value.trim()) return
  error.value = ''
  try {
    const v = await api.addContentVideo({
      entity_type: props.entityType,
      entity_id:   props.entityId,
      title:       newTitle.value,
      url:         newUrl.value,
      order_index: props.videos.length
    })
    emit('update', [...props.videos, v])
    newTitle.value = ''
    newUrl.value   = ''
  } catch (e) { error.value = e.message }
}

async function remove(id) {
  if (!confirm('Supprimer cette vidéo ?')) return
  try {
    await api.deleteContentVideo(id)
    emit('update', props.videos.filter(v => v.id !== id))
  } catch (e) { error.value = e.message }
}
</script>

<style scoped>
.video-manager {
  background: #faf5ff;
  border: 1px solid #e9d5ff;
  border-radius: 10px;
  padding: 16px;
  margin-top: 12px;
}
.vm-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #7c3aed;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.vm-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.vm-row {
  display: flex; align-items: center; gap: 10px;
  background: white; border-radius: 6px; padding: 8px 10px; font-size: 0.85rem;
}
.vm-icon { color: #7c3aed; }
.vm-label { flex: 1; font-weight: 500; }
.vm-link { color: #7c3aed; font-weight: 600; font-size: 0.8rem; }
.vm-del {
  background: none; border: none; color: #ef4444;
  cursor: pointer; font-size: 0.9rem; padding: 2px 6px; border-radius: 4px;
}
.vm-del:hover { background: #fee2e2; }
.vm-empty { font-size: 0.85rem; color: #9ca3af; font-style: italic; margin-bottom: 12px; }
.vm-add { display: flex; gap: 8px; flex-wrap: wrap; }
.vm-input {
  padding: 6px 10px; border: 2px solid #e9d5ff; border-radius: 6px;
  font-size: 0.85rem; font-family: inherit;
}
.vm-input:focus { outline: none; border-color: #7c3aed; }
.vm-url { flex: 1; min-width: 180px; }
.vm-btn { font-size: 0.85rem; padding: 6px 14px; }
.vm-error { color: #ef4444; font-size: 0.85rem; margin-top: 6px; }
</style>
