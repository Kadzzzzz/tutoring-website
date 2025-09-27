<template>
  <div class="resource-list">
    <!-- Filtres et recherche -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par ID, titre, tags..."
        class="search-input"
      >
      <select v-model="filterSubject" class="filter-select">
        <option value="">Toutes les matières</option>
        <option value="maths">Mathématiques</option>
        <option value="physics">Physique</option>
        <option value="chemistry">Chimie</option>
      </select>
      <select v-model="filterLevel" class="filter-select">
        <option value="">Tous les niveaux</option>
        <option value="terminale">Terminale</option>
        <option value="prepa1">Prépa 1A</option>
        <option value="prepa2">Prépa 2A</option>
      </select>
    </div>

    <!-- Tableau des ressources -->
    <div class="table-container">
      <table class="resource-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Matière</th>
            <th>Niveau</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in filteredResources" :key="resource.id">
            <td class="id-cell">{{ resource.id }}</td>
            <td class="title-cell">{{ resource.title || resource.id }}</td>
            <td>
              <span class="badge" :class="`badge-${resource.subject}`">
                {{ getSubjectLabel(resource.subject) }}
              </span>
            </td>
            <td>{{ getLevelLabel(resource.levelKey) }}</td>
            <td>{{ getTypeLabel(resource.typeKey) }}</td>
            <td class="tags-cell">
              <span v-for="tag in resource.tags.slice(0, 2)" :key="tag" class="tag-small">
                {{ tag }}
              </span>
              <span v-if="resource.tags.length > 2" class="tag-more">
                +{{ resource.tags.length - 2 }}
              </span>
            </td>
            <td class="actions-cell">
              <button @click="$emit('edit', resource)" class="btn-icon btn-edit" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="$emit('delete', resource.id)" class="btn-icon btn-delete" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredResources.length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <p>Aucune ressource trouvée</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getSubjectLabel, getLevelLabel, getTypeLabel } from '@/utils/labels'

const props = defineProps({
  resources: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const searchQuery = ref('')
const filterSubject = ref('')
const filterLevel = ref('')

const filteredResources = computed(() => {
  let filtered = [...props.resources]

  // Filtre par matière
  if (filterSubject.value) {
    filtered = filtered.filter(r => r.subject === filterSubject.value)
  }

  // Filtre par niveau
  if (filterLevel.value) {
    filtered = filtered.filter(r => r.levelKey === filterLevel.value)
  }

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.id.toLowerCase().includes(query) ||
      (r.title && r.title.toLowerCase().includes(query)) ||
      r.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Trier par date (plus récent en premier)
  return filtered.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
})
</script>

<style scoped>
.resource-list {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 10px 15px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  font-size: 1rem;
}

.filter-select {
  padding: 10px 15px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.table-container {
  overflow-x: auto;
}

.resource-table {
  width: 100%;
  border-collapse: collapse;
}

.resource-table thead {
  background-color: var(--secondary-color, #f8f9fa);
}

.resource-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: var(--primary-color);
  border-bottom: 2px solid var(--border-color);
}

.resource-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

.resource-table tbody tr:hover {
  background-color: #f8f9fa;
}

.id-cell {
  font-family: monospace;
  color: var(--text-light);
  font-size: 0.9rem;
}

.title-cell {
  font-weight: 500;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-maths {
  background-color: #e3f2fd;
  color: #1976d2;
}

.badge-physics {
  background-color: #fce4ec;
  color: #c2185b;
}

.badge-chemistry {
  background-color: #fff3e0;
  color: #e65100;
}

.tags-cell {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag-small {
  padding: 3px 8px;
  background-color: #e9ecef;
  border-radius: 10px;
  font-size: 0.75rem;
  color: var(--text-light);
}

.tag-more {
  padding: 3px 8px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-icon {
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-edit {
  background-color: #e3f2fd;
  color: #1976d2;
}

.btn-edit:hover {
  background-color: #1976d2;
  color: white;
}

.btn-delete {
  background-color: #ffebee;
  color: #c62828;
}

.btn-delete:hover {
  background-color: #c62828;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.3;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-input {
    min-width: 100%;
  }
}
</style>