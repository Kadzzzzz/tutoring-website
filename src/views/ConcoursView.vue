<template>
  <div>
    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="page-header">
      <div class="container">
        <div v-if="activeView === 'landing'" class="ph-landing">
          <h1>Concours</h1>
          <p>Préparez les concours des grandes écoles scientifiques</p>
        </div>
        <div v-else class="ph-inner">
          <button class="ph-back" @click="goLanding">← Retour</button>
          <div>
            <h1>{{ activeView === 'modalites' ? 'Modalités des épreuves' : 'Exercices de type concours' }}</h1>
            <p>{{ activeView === 'modalites' ? 'Épreuves écrites et orales par filière et banque' : 'Sujets écrits et oraux avec corrections' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container main-wrap">

      <!-- ── LANDING ──────────────────────────────────────────────────────── -->
      <div v-if="activeView === 'landing'" class="landing">
        <p class="landing-intro">Choisissez votre objectif :</p>
        <div class="landing-grid">
          <button class="landing-card card-modalites" @click="activeView = 'modalites'">
            <span class="lc-icon">📋</span>
            <h2 class="lc-title">Modalités des épreuves</h2>
            <p class="lc-desc">Découvrez les épreuves écrites et orales, les coefficients et les écoles — par filière (MP, PC, PSI) et par banque de concours</p>
            <span class="lc-action">Explorer les modalités →</span>
          </button>
          <button class="landing-card card-exercices" @click="loadExercices">
            <span class="lc-icon">📝</span>
            <h2 class="lc-title">Exercices de type concours</h2>
            <p class="lc-desc">Entraînez-vous sur des sujets d'écrits et d'oraux avec corrigés détaillés et vidéos</p>
            <span class="lc-action">Accéder aux exercices →</span>
          </button>
        </div>
      </div>

      <!-- ── MODALITÉS ─────────────────────────────────────────────────────── -->
      <div v-else-if="activeView === 'modalites'" class="modalites">

        <!-- Étape 1 : filière -->
        <div class="step">
          <div class="step-hd">
            <span class="step-num">1</span>
            <h3 class="step-label">Sélectionnez votre filière</h3>
          </div>
          <div class="filiere-row">
            <button v-for="f in FILIERES" :key="f.id"
              :class="['filiere-btn', { active: selectedFiliere === f.id }]"
              @click="selectFiliere(f.id)">
              <span class="fb-id">{{ f.id }}</span>
              <span class="fb-full">{{ f.label }}</span>
            </button>
          </div>
        </div>

        <!-- Étape 2 : banque -->
        <div v-if="selectedFiliere" class="step">
          <div class="step-hd">
            <span class="step-num">2</span>
            <h3 class="step-label">Choisissez la banque de concours</h3>
          </div>
          <div class="banque-row">
            <button v-for="b in BANQUES" :key="b.id"
              :class="['banque-btn', { active: selectedBanque === b.id, 'banque-na': !hasData(b.id) }]"
              @click="hasData(b.id) && selectBanque(b.id)">
              <span class="bb-emoji">{{ b.emoji }}</span>
              <span class="bb-label">{{ b.label }}</span>
              <span class="bb-schools">{{ b.shortDesc }}</span>
              <span v-if="!hasData(b.id)" class="bb-na-tag">Non accessible en {{ selectedFiliere }}</span>
            </button>
          </div>
        </div>

        <!-- Étape 3 : sous-option -->
        <div v-if="selectedBanque && hasSousOptions" class="step">
          <div class="step-hd">
            <span class="step-num">3</span>
            <h3 class="step-label">Sélectionnez votre option</h3>
          </div>
          <div class="sous-option-row">
            <button v-for="s in sousOptionsForBanque" :key="s.id"
              :class="['so-btn', { active: selectedSousOption === s.id }]"
              @click="selectedSousOption = s.id">
              <span class="so-tag">{{ s.tag }}</span>
              <span class="so-label">{{ s.label }}</span>
            </button>
          </div>
        </div>

        <!-- Détail -->
        <div v-if="currentModalite" class="detail">
          <div v-if="currentModalite.note" class="note-banner">
            ℹ️ {{ currentModalite.note }}
          </div>
          <div class="detail-header">
            <div>
              <h2 class="detail-title">
                {{ hasSousOptions ? currentModalite.label : currentBanque?.label }}
                <span class="detail-filiere-tag">Filière {{ selectedFiliere }}</span>
              </h2>
            </div>
            <button class="btn btn-outline detail-close"
              @click="hasSousOptions ? (selectedSousOption = '') : (selectedBanque = '')">✕</button>
          </div>

          <div class="detail-cols">
            <!-- Écrits -->
            <div class="detail-box">
              <h4 class="box-title">✏️ Épreuves écrites</h4>
              <table class="ep-table">
                <thead>
                  <tr>
                    <th>Matière</th>
                    <th class="td-c">Durée</th>
                    <th class="td-c">Coeff.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(e, i) in currentModalite.ecrits" :key="i">
                    <td>
                      {{ e.matiere }}
                      <div v-if="e.note" class="ep-note">{{ e.note }}</div>
                    </td>
                    <td class="td-c">{{ e.duree }}</td>
                    <td class="td-c coeff">{{ e.coefficient ?? '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Oraux -->
            <div class="detail-box">
              <h4 class="box-title">🎤 Épreuves orales</h4>
              <div class="oral-list">
                <div v-for="(o, i) in currentModalite.oraux" :key="i" class="oral-row">
                  <span class="oral-mat">{{ o.matiere }}</span>
                  <span class="oral-coeff">Coeff.&nbsp;{{ o.coefficient ?? '—' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Écoles -->
          <div class="detail-ecoles">
            <h4 class="box-title">🏫 Écoles accessibles</h4>
            <div class="ecoles-wrap">
              <a v-for="e in currentModalite.ecoles" :key="e.nom"
                :href="e.url" target="_blank" rel="noopener noreferrer"
                class="ecole-chip">
                <span class="ec-nom">{{ e.nom }}</span>
                <span class="ec-ville">{{ e.ville }} ↗</span>
              </a>
            </div>
          </div>

          <!-- Liens officiels -->
          <div class="detail-links">
            <h4 class="box-title">🔗 Sites officiels</h4>
            <div class="links-row">
              <a v-for="l in currentModalite.siteInfos" :key="l.label"
                :href="l.url" target="_blank" rel="noopener noreferrer"
                class="official-link">
                {{ l.label }} ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ── EXERCICES ──────────────────────────────────────────────────────── -->
      <div v-else-if="activeView === 'exercices'">
        <div class="filters">
          <div class="filter-group">
            <label>Type</label>
            <div class="btn-group">
              <button :class="['filter-btn', { active: activeType === '' }]" @click="activeType = ''">Tous</button>
              <button :class="['filter-btn', { active: activeType === 'ecrit_concours' }]" @click="activeType = 'ecrit_concours'">Écrits</button>
              <button :class="['filter-btn', { active: activeType === 'oral_concours' }]" @click="activeType = 'oral_concours'">Oraux</button>
            </div>
          </div>
          <div class="filter-group" v-if="availableBanks.length">
            <label>Concours</label>
            <div class="btn-group">
              <button :class="['filter-btn', { active: activeBank === '' }]" @click="activeBank = ''">Tous</button>
              <button v-for="b in availableBanks" :key="b"
                :class="['filter-btn', { active: activeBank === b }]"
                @click="activeBank = b">{{ b }}</button>
            </div>
          </div>
          <div class="filter-group" v-if="availableSubjects.length">
            <label>Matière</label>
            <div class="btn-group">
              <button :class="['filter-btn', { active: activeSubject === '' }]" @click="activeSubject = ''">Toutes</button>
              <button v-for="s in availableSubjects" :key="s.id"
                :class="['filter-btn', { active: activeSubject === String(s.id) }]"
                @click="activeSubject = String(s.id)">{{ s.name }}</button>
            </div>
          </div>
          <button v-if="activeType || activeSubject || activeBank"
            class="filter-btn filter-reset" @click="activeType = ''; activeSubject = ''; activeBank = ''">
            ✕ Réinitialiser
          </button>
        </div>

        <div v-if="loading" class="loading">Chargement...</div>

        <div v-else-if="grouped.length">
          <div v-for="group in grouped" :key="group.name" class="concours-section">
            <h2 class="concours-name">{{ group.name }}</h2>
            <div class="concours-grid">
              <div v-for="doc in group.items" :key="doc.id" class="concours-card"
                :style="{ '--color': doc.subject_color || '#3b82f6' }">
                <div class="concours-card-header">
                  <div class="concours-tags">
                    <span class="type-badge" :class="doc.type">
                      {{ doc.type === 'ecrit_concours' ? 'Écrit' : 'Oral' }}
                    </span>
                    <span v-if="doc.subject_name" class="subject-badge"
                      :style="{ background: (doc.subject_color || '#3b82f6') + '20', color: doc.subject_color || '#3b82f6' }">
                      {{ doc.subject_name }}
                    </span>
                    <span v-if="doc.level" class="level-badge">{{ doc.level.toUpperCase() }}</span>
                  </div>
                  <span class="year-badge">{{ doc.concours_year }}</span>
                </div>
                <p class="doc-title-text">{{ doc.title }}</p>
                <div class="concours-actions">
                  <template v-if="doc.content_type === 'latex'">
                    <button v-if="doc.latex_statement" class="btn btn-outline" @click="toggleLatex(doc.id + '_s')">
                      {{ openLatex[doc.id + '_s'] ? '▲ Énoncé' : '📄 Énoncé' }}
                    </button>
                    <button v-if="doc.latex_solution" class="btn btn-primary" @click="toggleLatex(doc.id + '_c')">
                      {{ openLatex[doc.id + '_c'] ? '▲ Corrigé' : '✅ Corrigé' }}
                    </button>
                    <span v-else-if="!doc.latex_solution" class="soon">Corrigé bientôt</span>
                  </template>
                  <template v-else>
                    <a v-if="doc.pdf_statement_url" :href="pdfUrl(doc.pdf_statement_url)" target="_blank" class="btn btn-outline">📄 Sujet</a>
                    <a v-if="doc.pdf_solution_url" :href="pdfUrl(doc.pdf_solution_url)" target="_blank" class="btn btn-primary">✅ Corrigé</a>
                    <span v-else-if="!doc.pdf_solution_url" class="soon">Corrigé bientôt</span>
                  </template>
                  <button v-if="doc.videos?.length" class="btn-video" @click="toggleVideos(doc.id)">
                    ▶ Vidéo{{ doc.videos.length > 1 ? 's' : '' }} ({{ doc.videos.length }})
                  </button>
                </div>
                <div v-if="doc.content_type === 'latex' && openLatex[doc.id + '_s']" class="latex-panel">
                  <div class="latex-panel-label">Énoncé</div>
                  <LatexRenderer :content="doc.latex_statement" />
                </div>
                <div v-if="doc.content_type === 'latex' && openLatex[doc.id + '_c']" class="latex-panel latex-solution">
                  <div class="latex-panel-label">Corrigé</div>
                  <LatexRenderer :content="doc.latex_solution" />
                </div>
                <div v-if="openVideos[doc.id]" class="video-list">
                  <a v-for="v in doc.videos" :key="v.id" :href="v.url" target="_blank" class="video-item">
                    <span class="video-icon">▶</span>
                    <span>{{ v.title || 'Vidéo corrigée' }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <h3>Aucun exercice disponible</h3>
          <p>Le contenu sera bientôt disponible.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { api } from '@/api.js'
import LatexRenderer from '@/components/LatexRenderer.vue'
import { FILIERES, BANQUES, MODALITES } from '@/data/modalites.js'

// ── Navigation state ──────────────────────────────────────────────────────────

const activeView         = ref('landing')
const selectedFiliere    = ref('')
const selectedBanque     = ref('')
const selectedSousOption = ref('')

function goLanding() {
  activeView.value         = 'landing'
  selectedFiliere.value    = ''
  selectedBanque.value     = ''
  selectedSousOption.value = ''
}

function selectFiliere(id) {
  selectedFiliere.value    = id
  selectedBanque.value     = ''
  selectedSousOption.value = ''
}

function selectBanque(id) {
  selectedBanque.value     = id
  selectedSousOption.value = ''
}

function hasData(banqueId) {
  return !!MODALITES[selectedFiliere.value]?.[banqueId]
}

const currentBanque = computed(() => BANQUES.find(b => b.id === selectedBanque.value))

const hasSousOptions = computed(() => {
  if (!selectedFiliere.value || !selectedBanque.value) return false
  return !!MODALITES[selectedFiliere.value]?.[selectedBanque.value]?.sousOptions
})

const sousOptionsForBanque = computed(() => {
  if (!hasSousOptions.value) return []
  return MODALITES[selectedFiliere.value]?.[selectedBanque.value]?.sousOptions ?? []
})

const currentModalite = computed(() => {
  if (!selectedFiliere.value || !selectedBanque.value) return null
  const raw = MODALITES[selectedFiliere.value]?.[selectedBanque.value]
  if (!raw) return null
  if (raw.sousOptions) {
    return selectedSousOption.value
      ? raw.sousOptions.find(s => s.id === selectedSousOption.value) ?? null
      : null
  }
  return raw
})

// ── Exercises state ───────────────────────────────────────────────────────────

const BASE_URL      = import.meta.env.VITE_API_URL ?? ''
const docs          = ref([])
const loading       = ref(false)
const docsLoaded    = ref(false)
const activeType    = ref('')
const activeSubject = ref('')
const activeBank    = ref('')
const openVideos    = reactive({})
const openLatex     = reactive({})

function toggleVideos(id) { openVideos[id] = !openVideos[id] }
function toggleLatex(id)  { openLatex[id]  = !openLatex[id] }
function pdfUrl(url)      { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }

const availableSubjects = computed(() => {
  const map = new Map()
  for (const d of docs.value) {
    if (d.subject_id && !map.has(d.subject_id))
      map.set(d.subject_id, { id: d.subject_id, name: d.subject_name })
  }
  return [...map.values()]
})

const availableBanks = computed(() => {
  const set = new Set()
  for (const d of docs.value) { if (d.concours_name) set.add(d.concours_name) }
  return [...set].sort()
})

const filtered = computed(() => docs.value.filter(d => {
  if (activeType.value    && d.type !== activeType.value)                  return false
  if (activeSubject.value && String(d.subject_id) !== activeSubject.value) return false
  if (activeBank.value    && d.concours_name !== activeBank.value)         return false
  return true
}))

const grouped = computed(() => {
  const map = new Map()
  for (const d of filtered.value) {
    const key = d.concours_name || 'Autres'
    if (!map.has(key)) map.set(key, { name: key, items: [] })
    map.get(key).items.push(d)
  }
  return [...map.values()]
})

async function loadExercices() {
  activeView.value = 'exercices'
  if (docsLoaded.value) return
  loading.value = true
  try {
    docs.value    = await api.getDocuments({ type: 'ecrit_concours,oral_concours' })
    docsLoaded.value = true
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}
</script>

<style scoped>
/* ── Page header ──────────────────────────────────────────────────────────── */
.page-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #1e1b4b 60%, #312e81 100%);
  position: relative; overflow: hidden;
}
.page-header::before {
  content: ''; position: absolute; top: -30px; right: 5%;
  width: 250px; height: 250px; border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,.2) 0%, transparent 70%);
  pointer-events: none;
}
.page-header::after {
  content: ''; position: absolute; bottom: -30px; left: 20%;
  width: 180px; height: 180px; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,.25) 0%, transparent 70%);
  pointer-events: none;
}
.ph-landing h1  { margin: 0 0 6px; }
.ph-landing p   { margin: 0; opacity: .75; }
.ph-inner       { display: flex; align-items: center; gap: 20px; }
.ph-back {
  background: rgba(255,255,255,.15); color: white;
  border: 1px solid rgba(255,255,255,.3); border-radius: 8px;
  padding: 8px 16px; font-size: .88rem; font-weight: 600; cursor: pointer;
  white-space: nowrap; transition: background .2s; flex-shrink: 0;
}
.ph-back:hover  { background: rgba(255,255,255,.25); }
.ph-inner h1    { margin: 0 0 4px; }
.ph-inner p     { margin: 0; opacity: .75; }

/* ── Main wrapper ────────────────────────────────────────────────────────── */
.main-wrap { padding: 48px 0 80px; }

/* ── Landing ──────────────────────────────────────────────────────────────── */
.landing-intro { color: var(--text-light); font-size: 1rem; margin: 0 0 24px; }
.landing-grid  {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  max-width: 860px;
}
.landing-card {
  background: white; border: 2px solid var(--border); border-radius: 16px;
  padding: 40px 36px; text-align: left; cursor: pointer;
  transition: transform .25s, box-shadow .25s, border-color .25s;
  box-shadow: var(--shadow);
  display: flex; flex-direction: column; gap: 12px;
}
.landing-card:hover          { transform: translateY(-5px); box-shadow: 0 16px 30px rgba(0,0,0,.12); }
.card-modalites:hover        { border-color: #3b82f6; }
.card-exercices:hover        { border-color: #7c3aed; }
.lc-icon  { font-size: 2.8rem; line-height: 1; }
.lc-title { font-size: 1.35rem; font-weight: 800; color: var(--text); margin: 0; }
.lc-desc  { color: var(--text-light); font-size: .95rem; line-height: 1.6; margin: 0; }
.lc-action { font-weight: 700; font-size: .95rem; margin-top: auto; padding-top: 8px; }
.card-modalites .lc-action { color: #3b82f6; }
.card-exercices .lc-action { color: #7c3aed; }

/* ── Modalités — steps ────────────────────────────────────────────────────── */
.modalites  { display: flex; flex-direction: column; gap: 0; }
.step       { margin-bottom: 36px; }
.step-hd    { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.step-num   {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-weight: 800; font-size: .9rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.step-label { font-size: 1.05rem; font-weight: 700; margin: 0; }

/* Filière buttons */
.filiere-row { display: flex; gap: 14px; flex-wrap: wrap; }
.filiere-btn {
  flex: 1; min-width: 150px; background: white;
  border: 2px solid var(--border); border-radius: 12px;
  padding: 20px 18px; text-align: left; cursor: pointer;
  transition: all .2s; display: flex; flex-direction: column; gap: 4px;
}
.filiere-btn:hover  { border-color: var(--accent); }
.filiere-btn.active { border-color: var(--accent); background: #eff6ff; }
.fb-id   { font-size: 1.7rem; font-weight: 900; color: var(--text); line-height: 1.1; }
.fb-full { font-size: .78rem; color: var(--text-light); line-height: 1.3; }

/* Banque buttons */
.banque-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.banque-btn {
  background: white; border: 2px solid var(--border); border-radius: 12px;
  padding: 20px 14px; text-align: center; cursor: pointer;
  transition: all .2s; display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.banque-btn:hover:not(.banque-na) { border-color: var(--accent); }
.banque-btn.active                { border-color: var(--accent); background: #eff6ff; }
.banque-na { opacity: .5; cursor: not-allowed; }
.bb-emoji  { font-size: 2rem; line-height: 1; }
.bb-label  { font-size: .88rem; font-weight: 700; color: var(--text); }
.bb-schools { font-size: .73rem; color: var(--text-light); line-height: 1.3; }
.bb-na-tag {
  font-size: .7rem; background: #fee2e2; color: #dc2626;
  padding: 2px 8px; border-radius: 4px; font-weight: 600;
}

/* Sous-option buttons */
.sous-option-row { display: flex; flex-wrap: wrap; gap: 10px; }
.so-btn {
  background: white; border: 2px solid var(--border); border-radius: 10px;
  padding: 12px 18px; cursor: pointer; transition: all .2s;
  display: flex; align-items: center; gap: 10px; text-align: left;
}
.so-btn:hover  { border-color: var(--accent); }
.so-btn.active { border-color: var(--accent); background: #eff6ff; }
.so-tag {
  font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .04em;
  background: var(--accent); color: white;
  padding: 2px 8px; border-radius: 4px; white-space: nowrap; flex-shrink: 0;
}
.so-label { font-size: .88rem; font-weight: 600; color: var(--text); }

/* Note banner */
.note-banner {
  background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;
  padding: 12px 18px; font-size: .88rem; color: #1e40af;
  margin-bottom: 20px; line-height: 1.5;
}

/* Detail card */
.detail {
  background: white; border-radius: 16px; padding: 32px;
  box-shadow: var(--shadow); border: 1px solid var(--border); margin-top: 4px;
}
.detail-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 16px; margin-bottom: 20px;
}
.detail-title { font-size: 1.35rem; font-weight: 800; margin: 0 0 10px; color: var(--text); }
.detail-filiere-tag {
  font-size: .9rem; font-weight: 600; color: var(--accent); margin-left: 6px;
}
.detail-close { flex-shrink: 0; padding: 6px 14px; }

.detail-cols {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px; margin: 24px 0;
}
.detail-box   { background: #f8fafc; border-radius: 12px; padding: 20px; }
.box-title    {
  font-size: .8rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .05em; color: var(--text-light);
  margin: 0 0 14px;
}

/* Table écrits */
.ep-table { width: 100%; border-collapse: collapse; font-size: .87rem; }
.ep-table th {
  text-align: left; font-size: .72rem; text-transform: uppercase;
  letter-spacing: .05em; color: var(--text-light);
  padding-bottom: 8px; border-bottom: 1px solid var(--border);
}
.ep-table td { padding: 7px 0; border-bottom: 1px solid #f1f5f9; color: var(--text); }
.ep-table td.td-c { text-align: center; }
.ep-table td.coeff { font-weight: 700; color: var(--accent); }
.ep-note { font-size: .75rem; color: var(--text-light); font-style: italic; }

/* Oraux list */
.oral-list { display: flex; flex-direction: column; }
.oral-row  {
  padding: 9px 0; border-bottom: 1px solid #f1f5f9;
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
}
.oral-row:last-child { border-bottom: none; }
.oral-mat   { font-weight: 600; font-size: .88rem; color: var(--text); flex: 1; }
.oral-coeff {
  font-size: .78rem; font-weight: 700; color: var(--accent);
  background: #eff6ff; border-radius: 4px; padding: 2px 7px;
  white-space: nowrap; flex-shrink: 0;
}

/* Écoles */
.detail-ecoles { margin-bottom: 24px; }
.ecoles-wrap   { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.ecole-chip {
  background: white; border: 1px solid var(--border); border-radius: 10px;
  padding: 10px 14px; text-decoration: none;
  transition: all .2s; display: flex; flex-direction: column; gap: 2px;
}
.ecole-chip:hover { border-color: var(--accent); background: #eff6ff; }
.ec-nom   { font-size: .84rem; font-weight: 700; color: var(--text); }
.ec-ville { font-size: .74rem; color: var(--accent); }

/* Liens officiels */
.detail-links { }
.links-row    { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.official-link {
  background: var(--accent); color: white; text-decoration: none;
  padding: 10px 20px; border-radius: 8px; font-size: .87rem; font-weight: 700;
  transition: background .2s;
}
.official-link:hover { background: #2563eb; }

/* ── Exercises section (unchanged) ───────────────────────────────────────── */
.filters {
  background: white; border-radius: var(--radius); padding: 24px;
  box-shadow: var(--shadow); margin-bottom: 40px;
  display: flex; flex-wrap: wrap; gap: 24px;
}
.filter-group label {
  display: block; font-size: .8rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: .05em;
  color: var(--text-light); margin-bottom: 8px;
}
.btn-group   { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn  {
  padding: 6px 16px; border-radius: 999px; font-size: .85rem; font-weight: 600;
  border: 2px solid var(--border); background: white; color: var(--text-light);
  cursor: pointer; transition: all .2s;
}
.filter-btn:hover  { border-color: var(--accent); color: var(--accent); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }
.filter-reset      { border-color: transparent; color: var(--text-light); align-self: flex-end; }

.concours-section { margin-bottom: 48px; }
.concours-name    { font-size: 1.3rem; border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 20px; }
.concours-grid    { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.concours-card    { background: white; border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); border-top: 4px solid var(--color); }
.concours-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.concours-tags    { display: flex; flex-wrap: wrap; gap: 6px; }
.type-badge       { font-size: .75rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; }
.type-badge.ecrit_concours { background: #dbeafe; color: #1d4ed8; }
.type-badge.oral_concours  { background: #fce7f3; color: #be185d; }
.subject-badge    { font-size: .75rem; font-weight: 600; padding: 3px 10px; border-radius: 6px; }
.level-badge      { font-size: .72rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: #f1f5f9; color: var(--text-light); }
.year-badge       { font-size: 1rem; font-weight: 800; color: var(--text-light); white-space: nowrap; }
.doc-title-text   { font-size: .9rem; font-weight: 500; color: var(--text); margin: 8px 0 14px; }
.concours-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.soon             { font-size: .8rem; color: var(--text-light); font-style: italic; align-self: center; }
.btn-video        {
  background: #7c3aed; color: white; border: none;
  padding: 6px 14px; border-radius: 8px; font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: background .2s;
}
.btn-video:hover { background: #6d28d9; }
.latex-panel     { margin-top: 12px; padding: 16px 20px; background: #f8fafc; border-radius: 8px; border: 1px solid var(--border); }
.latex-solution  { background: #f0fdf4; border-color: #bbf7d0; }
.latex-panel-label {
  font-size: .72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .07em; color: var(--text-light); margin-bottom: 10px;
}
.video-list  { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border); padding-top: 12px; }
.video-item  { display: flex; align-items: center; gap: 8px; font-size: .85rem; color: #7c3aed; font-weight: 600; text-decoration: none; padding: 4px 0; }
.video-item:hover { text-decoration: underline; }
.video-icon  { font-size: .75rem; }

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 700px) {
  .landing-grid { grid-template-columns: 1fr; }
  .banque-row   { grid-template-columns: 1fr 1fr; }
  .detail-cols  { grid-template-columns: 1fr; }
  .filiere-row  { flex-direction: column; }
  .filiere-btn  { min-width: unset; }
  .oral-row     { flex-direction: column; align-items: flex-start; gap: 4px; }
}
@media (max-width: 480px) {
  .banque-row { grid-template-columns: 1fr; }
}
</style>
