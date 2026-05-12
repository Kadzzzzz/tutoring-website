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
              @click="hasData(b.id) && (selectedBanque = b.id)">
              <span class="bb-emoji">{{ b.emoji }}</span>
              <span class="bb-label">{{ b.label }}</span>
              <span class="bb-schools">{{ b.shortDesc }}</span>
              <span v-if="!hasData(b.id)" class="bb-na-tag">Non accessible en {{ selectedFiliere }}</span>
            </button>
          </div>
        </div>

        <!-- Étape 3 : détail banque -->
        <div v-if="currentModalite" class="detail">
          <div class="redaction-banner">
            ✏️ Cette section est en cours de rédaction — les informations seront complétées prochainement.
          </div>
          <div class="detail-header">
            <div>
              <h2 class="detail-title">
                {{ currentBanque?.label }}
                <span class="detail-filiere-tag">Filière {{ selectedFiliere }}</span>
              </h2>
              <p class="detail-desc">{{ currentModalite.description }}</p>
            </div>
            <button class="btn btn-outline detail-close" @click="selectedBanque = ''">✕</button>
          </div>

          <div class="detail-cols">
            <!-- Écrits -->
            <div class="detail-box">
              <h4 class="box-title">✏️ Épreuves écrites</h4>
              <table class="ep-table">
                <tbody>
                  <tr v-for="(e, i) in currentModalite.ecrits" :key="i">
                    <td>{{ e.matiere }}</td>
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
                </div>
              </div>
            </div>
          </div>

          <!-- Écoles -->
          <div class="detail-ecoles">
            <h4 class="box-title">🏫 Écoles accessibles</h4>
            <div class="ecoles-wrap">
              <a v-for="e in currentModalite.ecoles" :key="e.nom"
                href="https://www.jeremy-luccioni.fr" target="_blank" rel="noopener noreferrer"
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
                href="https://www.jeremy-luccioni.fr" target="_blank" rel="noopener noreferrer"
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

// ── Static data ───────────────────────────────────────────────────────────────

const FILIERES = [
  { id: 'MP',  label: 'Mathématiques-Physique' },
  { id: 'PC',  label: 'Physique-Chimie' },
  { id: 'PSI', label: 'Physique et Sciences de l\'Ingénieur' },
]

const BANQUES = [
  { id: 'X-ENS-ESPCI', label: 'X – ENS – ESPCI',   emoji: '⭐', shortDesc: 'Polytechnique, ENS, ESPCI' },
  { id: 'Centrale',    label: 'Centrale-Supélec',   emoji: '🔧', shortDesc: 'CentraleSupélec, Centrale Lyon…' },
  { id: 'Mines',       label: 'Mines-Ponts',        emoji: '⚙️', shortDesc: 'Mines Paris, Ponts, ISAE…' },
  { id: 'CCINP',       label: 'CCINP',              emoji: '🏭', shortDesc: 'INSA, IMT, INP, CPE…' },
]

const MODALITES = {
  MP: {
    'X-ENS-ESPCI': {
      description: 'La banque X-ENS-ESPCI regroupe les concours des grandes écoles scientifiques les plus prestigieuses. Pour la filière MP, cette banque constitue le sommet de la préparation, avec des épreuves exigeant une maîtrise avancée des mathématiques et de la physique. Les concours de Polytechnique, des ENS et de l\'ESPCI sont distincts mais font appel aux mêmes épreuves communes.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 4 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 4 },
        { matiere: 'Physique 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique 2', duree: '4h', coefficient: 3 },
        { matiere: 'Informatique', duree: '4h', coefficient: 2, note: 'option informatique' },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '3h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques 1', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Mathématiques 2', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Physique', format: 'Oral + TP (variable selon l\'école)' },
        { matiere: 'Langue vivante', format: 'Entretien (20 min)' },
        { matiere: 'Entretien de personnalité', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admissions' },
        { nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' },
        { nom: 'ENS Lyon', ville: 'Lyon', url: 'https://www.ens-lyon.fr/admission' },
        { nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission' },
        { nom: 'ESPCI Paris', ville: 'Paris', url: 'https://www.espci.psl.eu/admission' },
      ],
      siteInfos: [
        { label: 'Concours Polytechnique', url: 'https://www.polytechnique.edu/admissions' },
        { label: 'Concours ENS', url: 'https://www.ens.psl.eu/admission' },
        { label: 'Concours ESPCI', url: 'https://www.espci.psl.eu/admission' },
      ],
    },
    'Centrale': {
      description: 'La banque Centrale-Supélec est l\'une des plus importantes de la filière MP. Elle donne accès aux grandes écoles du réseau Centrale ainsi qu\'à plusieurs écoles partenaires. Les épreuves couvrent mathématiques, physique-chimie, sciences de l\'ingénieur (option) et les matières générales.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 2', duree: '4h', coefficient: 3 },
        { matiere: 'Sciences de l\'Ingénieur', duree: '4h', coefficient: 2, note: 'option SI' },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '2h30', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP (variable)' },
        { matiere: 'Langue vivante', format: 'Entretien (20 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CentraleSupélec', ville: 'Gif-sur-Yvette', url: 'https://www.centralesupelec.fr' },
        { nom: 'Centrale Lyon', ville: 'Écully', url: 'https://www.ec-lyon.fr' },
        { nom: 'Centrale Nantes', ville: 'Nantes', url: 'https://www.ec-nantes.fr' },
        { nom: 'Centrale Lille', ville: 'Lille', url: 'https://centralelille.fr' },
        { nom: 'Centrale Méditerranée', ville: 'Marseille', url: 'https://www.centrale-marseille.fr' },
        { nom: 'Institut d\'Optique (SupOptique)', ville: 'Palaiseau', url: 'https://www.institutoptique.fr' },
        { nom: 'ENSEA', ville: 'Cergy', url: 'https://www.ensea.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale', url: 'https://www.centralesupelec.fr/fr/admissions-en-1re-annee' },
      ],
    },
    'Mines': {
      description: 'La banque Mines-Ponts rassemble des grandes écoles d\'ingénieurs d\'excellence. Les épreuves écrites sont communes à toutes les écoles ; les oraux sont spécifiques à chaque établissement. La filière MP dispose d\'un large choix d\'épreuves en mathématiques, physique et chimie.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique 2', duree: '4h', coefficient: 3 },
        { matiere: 'Chimie', duree: '4h', coefficient: 2 },
        { matiere: 'Informatique', duree: '4h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '3h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Physique', format: 'Oral + TP (variable)' },
        { matiere: 'Langue vivante', format: 'Entretien (20–30 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'Mines Paris – PSL', ville: 'Paris', url: 'https://www.minesparis.psl.eu' },
        { nom: 'École des Ponts ParisTech', ville: 'Marne-la-Vallée', url: 'https://www.ecoledesponts.fr' },
        { nom: 'ISAE-SUPAERO', ville: 'Toulouse', url: 'https://www.isae-supaero.fr' },
        { nom: 'ENSTA Paris', ville: 'Palaiseau', url: 'https://www.ensta-paris.fr' },
        { nom: 'Télécom Paris', ville: 'Palaiseau', url: 'https://www.telecom-paris.fr' },
        { nom: 'Mines Saint-Étienne', ville: 'Saint-Étienne', url: 'https://www.mines-stetienne.fr' },
        { nom: 'Mines Nancy', ville: 'Nancy', url: 'https://mines-nancy.univ-lorraine.fr' },
        { nom: 'ENSAE Paris', ville: 'Palaiseau', url: 'https://www.ensae.fr' },
        { nom: 'Chimie ParisTech – PSL', ville: 'Paris', url: 'https://www.chimieparistech.psl.eu' },
      ],
      siteInfos: [
        { label: 'Site officiel Mines-Ponts', url: 'https://www.concours-mines-ponts.fr' },
      ],
    },
    'CCINP': {
      description: 'La banque CCINP (ex-CCP) donne accès à un large réseau d\'écoles d\'ingénieurs reconnues : INSA, IMT, INP et bien d\'autres. C\'est la banque qui compte le plus grand nombre d\'établissements. Les épreuves sont communes et adaptées au niveau de la filière MP.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 2', duree: '4h', coefficient: 2 },
        { matiere: 'Informatique', duree: '3h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante', duree: '2h', coefficient: 1 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (20–30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP' },
        { matiere: 'Langue vivante', format: 'Entretien' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CPE Lyon', ville: 'Lyon', url: 'https://www.cpe.fr' },
        { nom: 'Grenoble INP – Ensimag', ville: 'Grenoble', url: 'https://ensimag.grenoble-inp.fr' },
        { nom: 'INSA Lyon', ville: 'Lyon', url: 'https://www.insa-lyon.fr' },
        { nom: 'INSA Toulouse', ville: 'Toulouse', url: 'https://www.insa-toulouse.fr' },
        { nom: 'IMT Atlantique', ville: 'Brest / Nantes', url: 'https://www.imt-atlantique.fr' },
        { nom: 'IMT Mines Albi', ville: 'Albi', url: 'https://www.imt-mines-albi.fr' },
        { nom: 'Bordeaux INP', ville: 'Bordeaux', url: 'https://www.bordeaux-inp.fr' },
        { nom: 'ENSICAEN', ville: 'Caen', url: 'https://www.ensicaen.fr' },
        { nom: 'Clermont Auvergne INP', ville: 'Clermont-Ferrand', url: 'https://clermont-inp.fr' },
        { nom: 'ENSCM', ville: 'Montpellier', url: 'https://www.enscm.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP', url: 'https://www.ccinp.fr' },
      ],
    },
  },

  PC: {
    'X-ENS-ESPCI': {
      description: 'La filière PC a pleinement accès aux concours X, ENS et ESPCI. Les épreuves sont adaptées au programme PC, avec notamment une part importante accordée à la chimie. L\'ESPCI Paris, très orientée physique-chimie, est particulièrement adaptée aux étudiants de cette filière.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 4 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 4 },
        { matiere: 'Physique-Chimie 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 2', duree: '4h', coefficient: 3 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '3h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP (variable)' },
        { matiere: 'Langue vivante', format: 'Entretien (20 min)' },
        { matiere: 'Entretien de personnalité', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admissions' },
        { nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' },
        { nom: 'ENS Lyon', ville: 'Lyon', url: 'https://www.ens-lyon.fr/admission' },
        { nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission' },
        { nom: 'ESPCI Paris', ville: 'Paris', url: 'https://www.espci.psl.eu/admission' },
      ],
      siteInfos: [
        { label: 'Concours Polytechnique', url: 'https://www.polytechnique.edu/admissions' },
        { label: 'Concours ENS', url: 'https://www.ens.psl.eu/admission' },
        { label: 'Concours ESPCI', url: 'https://www.espci.psl.eu/admission' },
      ],
    },
    'Centrale': {
      description: 'La banque Centrale-Supélec en filière PC propose les mêmes grandes écoles qu\'en MP, avec des épreuves adaptées au programme PC — notamment une chimie renforcée et une physique orientée vers les applications.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 2', duree: '4h', coefficient: 3 },
        { matiere: 'Sciences de l\'Ingénieur', duree: '4h', coefficient: 2, note: 'option SI' },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '2h30', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP (variable)' },
        { matiere: 'Langue vivante', format: 'Entretien (20 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CentraleSupélec', ville: 'Gif-sur-Yvette', url: 'https://www.centralesupelec.fr' },
        { nom: 'Centrale Lyon', ville: 'Écully', url: 'https://www.ec-lyon.fr' },
        { nom: 'Centrale Nantes', ville: 'Nantes', url: 'https://www.ec-nantes.fr' },
        { nom: 'Centrale Lille', ville: 'Lille', url: 'https://centralelille.fr' },
        { nom: 'Centrale Méditerranée', ville: 'Marseille', url: 'https://www.centrale-marseille.fr' },
        { nom: 'Institut d\'Optique (SupOptique)', ville: 'Palaiseau', url: 'https://www.institutoptique.fr' },
        { nom: 'ENSEA', ville: 'Cergy', url: 'https://www.ensea.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale', url: 'https://www.centralesupelec.fr/fr/admissions-en-1re-annee' },
      ],
    },
    'Mines': {
      description: 'La banque Mines-Ponts en filière PC met l\'accent sur la chimie, qui y prend un coefficient plus important qu\'en MP. Les mêmes grandes écoles sont accessibles, avec des épreuves spécifiques au programme PC.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique 2', duree: '4h', coefficient: 2 },
        { matiere: 'Chimie', duree: '4h', coefficient: 3 },
        { matiere: 'Informatique', duree: '4h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '3h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP (variable)' },
        { matiere: 'Langue vivante', format: 'Entretien (20–30 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'Mines Paris – PSL', ville: 'Paris', url: 'https://www.minesparis.psl.eu' },
        { nom: 'École des Ponts ParisTech', ville: 'Marne-la-Vallée', url: 'https://www.ecoledesponts.fr' },
        { nom: 'ISAE-SUPAERO', ville: 'Toulouse', url: 'https://www.isae-supaero.fr' },
        { nom: 'ENSTA Paris', ville: 'Palaiseau', url: 'https://www.ensta-paris.fr' },
        { nom: 'Télécom Paris', ville: 'Palaiseau', url: 'https://www.telecom-paris.fr' },
        { nom: 'Mines Saint-Étienne', ville: 'Saint-Étienne', url: 'https://www.mines-stetienne.fr' },
        { nom: 'Mines Nancy', ville: 'Nancy', url: 'https://mines-nancy.univ-lorraine.fr' },
        { nom: 'ENSAE Paris', ville: 'Palaiseau', url: 'https://www.ensae.fr' },
        { nom: 'Chimie ParisTech – PSL', ville: 'Paris', url: 'https://www.chimieparistech.psl.eu' },
      ],
      siteInfos: [
        { label: 'Site officiel Mines-Ponts', url: 'https://www.concours-mines-ponts.fr' },
      ],
    },
    'CCINP': {
      description: 'La banque CCINP en filière PC donne accès au même vaste réseau d\'écoles qu\'en MP. Les épreuves sont adaptées au programme PC, avec une présence marquée de la chimie.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 1', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie 2', duree: '4h', coefficient: 2 },
        { matiere: 'Informatique', duree: '3h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante', duree: '2h', coefficient: 1 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (20–30 min)' },
        { matiere: 'Physique-Chimie', format: 'Oral + TP' },
        { matiere: 'Langue vivante', format: 'Entretien' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CPE Lyon', ville: 'Lyon', url: 'https://www.cpe.fr' },
        { nom: 'Grenoble INP – Phelma', ville: 'Grenoble', url: 'https://phelma.grenoble-inp.fr' },
        { nom: 'INSA Lyon', ville: 'Lyon', url: 'https://www.insa-lyon.fr' },
        { nom: 'INSA Toulouse', ville: 'Toulouse', url: 'https://www.insa-toulouse.fr' },
        { nom: 'IMT Atlantique', ville: 'Brest / Nantes', url: 'https://www.imt-atlantique.fr' },
        { nom: 'IMT Mines Albi', ville: 'Albi', url: 'https://www.imt-mines-albi.fr' },
        { nom: 'Bordeaux INP', ville: 'Bordeaux', url: 'https://www.bordeaux-inp.fr' },
        { nom: 'ENSICAEN', ville: 'Caen', url: 'https://www.ensicaen.fr' },
        { nom: 'ENSCM', ville: 'Montpellier', url: 'https://www.enscm.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP', url: 'https://www.ccinp.fr' },
      ],
    },
  },

  PSI: {
    'X-ENS-ESPCI': {
      description: 'En rédaction.',
      ecrits: [
        { matiere: 'En rédaction', duree: '—' },
      ],
      oraux: [
        { matiere: 'En rédaction', format: '—' },
      ],
      ecoles: [
        { nom: 'En rédaction', ville: '—', url: 'https://www.jeremy-luccioni.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel (bientôt disponible)', url: 'https://www.jeremy-luccioni.fr' },
      ],
    },
    'Centrale': {
      description: 'La banque Centrale-Supélec est tout à fait accessible en filière PSI. Les épreuves accordent une place centrale aux Sciences de l\'Ingénieur, qui remplacent les épreuves de mathématiques avancées de MP/PC. Les mêmes grandes écoles du réseau Centrale sont accessibles.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 2 },
        { matiere: 'Sciences de l\'Ingénieur 1', duree: '4h', coefficient: 4 },
        { matiere: 'Sciences de l\'Ingénieur 2', duree: '4h', coefficient: 4 },
        { matiere: 'Physique-Chimie', duree: '4h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '2h30', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (30 min)' },
        { matiere: 'Sciences de l\'Ingénieur', format: 'Oral + TP (variable)' },
        { matiere: 'Physique-Chimie', format: 'Oral (20 min)' },
        { matiere: 'Langue vivante', format: 'Entretien (20 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CentraleSupélec', ville: 'Gif-sur-Yvette', url: 'https://www.centralesupelec.fr' },
        { nom: 'Centrale Lyon', ville: 'Écully', url: 'https://www.ec-lyon.fr' },
        { nom: 'Centrale Nantes', ville: 'Nantes', url: 'https://www.ec-nantes.fr' },
        { nom: 'Centrale Lille', ville: 'Lille', url: 'https://centralelille.fr' },
        { nom: 'Centrale Méditerranée', ville: 'Marseille', url: 'https://www.centrale-marseille.fr' },
        { nom: 'Institut d\'Optique (SupOptique)', ville: 'Palaiseau', url: 'https://www.institutoptique.fr' },
        { nom: 'ENSEA', ville: 'Cergy', url: 'https://www.ensea.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale', url: 'https://www.centralesupelec.fr/fr/admissions-en-1re-annee' },
      ],
    },
    'Mines': {
      description: 'La banque Mines-Ponts est accessible en filière PSI, principalement pour les écoles à fort profil ingénierie. Les Sciences de l\'Ingénieur remplacent certaines épreuves de mathématiques et permettent d\'accéder à des écoles comme ISAE-SUPAERO, ENSTA Paris ou les Mines.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 2 },
        { matiere: 'Sciences de l\'Ingénieur 1', duree: '4h', coefficient: 3 },
        { matiere: 'Sciences de l\'Ingénieur 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique', duree: '4h', coefficient: 2 },
        { matiere: 'Informatique', duree: '4h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante 1', duree: '3h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral + préparation (30 min + 30 min)' },
        { matiere: 'Sciences de l\'Ingénieur', format: 'Oral + TP (variable)' },
        { matiere: 'Physique', format: 'Oral (20 min)' },
        { matiere: 'Langue vivante', format: 'Entretien (20–30 min)' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'ISAE-SUPAERO', ville: 'Toulouse', url: 'https://www.isae-supaero.fr' },
        { nom: 'ENSTA Paris', ville: 'Palaiseau', url: 'https://www.ensta-paris.fr' },
        { nom: 'Télécom Paris', ville: 'Palaiseau', url: 'https://www.telecom-paris.fr' },
        { nom: 'Mines Saint-Étienne', ville: 'Saint-Étienne', url: 'https://www.mines-stetienne.fr' },
        { nom: 'Mines Nancy', ville: 'Nancy', url: 'https://mines-nancy.univ-lorraine.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Mines-Ponts', url: 'https://www.concours-mines-ponts.fr' },
      ],
    },
    'CCINP': {
      description: 'La banque CCINP est très bien adaptée à la filière PSI, avec des épreuves centrées sur les Sciences de l\'Ingénieur. Elle donne accès à un réseau très large d\'écoles, notamment les INSA et les INP qui valorisent particulièrement ce profil.',
      ecrits: [
        { matiere: 'Mathématiques 1', duree: '4h', coefficient: 3 },
        { matiere: 'Mathématiques 2', duree: '4h', coefficient: 2 },
        { matiere: 'Sciences de l\'Ingénieur 1', duree: '4h', coefficient: 4 },
        { matiere: 'Sciences de l\'Ingénieur 2', duree: '4h', coefficient: 3 },
        { matiere: 'Physique-Chimie', duree: '4h', coefficient: 2 },
        { matiere: 'Informatique', duree: '3h', coefficient: 2 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 2 },
        { matiere: 'Langue vivante', duree: '2h', coefficient: 1 },
      ],
      oraux: [
        { matiere: 'Mathématiques', format: 'Oral (20–30 min)' },
        { matiere: 'Sciences de l\'Ingénieur', format: 'Oral + TP' },
        { matiere: 'Physique-Chimie', format: 'Oral (20 min)' },
        { matiere: 'Langue vivante', format: 'Entretien' },
        { matiere: 'Entretien de motivation', format: 'Spécifique à chaque école' },
      ],
      ecoles: [
        { nom: 'CPE Lyon', ville: 'Lyon', url: 'https://www.cpe.fr' },
        { nom: 'INSA Lyon', ville: 'Lyon', url: 'https://www.insa-lyon.fr' },
        { nom: 'INSA Toulouse', ville: 'Toulouse', url: 'https://www.insa-toulouse.fr' },
        { nom: 'Grenoble INP – Génie industriel', ville: 'Grenoble', url: 'https://genie-industriel.grenoble-inp.fr' },
        { nom: 'IMT Atlantique', ville: 'Brest / Nantes', url: 'https://www.imt-atlantique.fr' },
        { nom: 'IMT Mines Albi', ville: 'Albi', url: 'https://www.imt-mines-albi.fr' },
        { nom: 'Bordeaux INP', ville: 'Bordeaux', url: 'https://www.bordeaux-inp.fr' },
        { nom: 'ENSICAEN', ville: 'Caen', url: 'https://www.ensicaen.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP', url: 'https://www.ccinp.fr' },
      ],
    },
  },
}

// ── Navigation state ──────────────────────────────────────────────────────────

const activeView      = ref('landing')
const selectedFiliere = ref('')
const selectedBanque  = ref('')

function goLanding() {
  activeView.value      = 'landing'
  selectedFiliere.value = ''
  selectedBanque.value  = ''
}

function selectFiliere(id) {
  selectedFiliere.value = id
  selectedBanque.value  = ''
}

function hasData(banqueId) {
  return !!MODALITES[selectedFiliere.value]?.[banqueId]
}

const currentBanque   = computed(() => BANQUES.find(b => b.id === selectedBanque.value))
const currentModalite = computed(() =>
  selectedFiliere.value && selectedBanque.value
    ? MODALITES[selectedFiliere.value]?.[selectedBanque.value] ?? null
    : null
)

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
  if (activeType.value    && d.type !== activeType.value)                       return false
  if (activeSubject.value && String(d.subject_id) !== activeSubject.value)      return false
  if (activeBank.value    && d.concours_name !== activeBank.value)               return false
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

/* Bannière en rédaction */
.redaction-banner {
  background: #fef9c3; border: 1px solid #fde047; border-radius: 10px;
  padding: 12px 18px; font-size: .88rem; font-weight: 600; color: #854d0e;
  margin-bottom: 20px;
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
.detail-desc  { color: var(--text-light); font-size: .93rem; line-height: 1.6; margin: 0; }
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
.oral-row  { padding: 9px 0; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 2px; }
.oral-row:last-child { border-bottom: none; }
.oral-mat  { font-weight: 600; font-size: .88rem; color: var(--text); }
.oral-fmt  { font-size: .8rem; color: var(--text-light); }

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
}
@media (max-width: 480px) {
  .banque-row { grid-template-columns: 1fr; }
}
</style>
