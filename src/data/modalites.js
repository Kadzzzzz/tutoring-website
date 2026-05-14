// Sources : règlement CCMP 2026, notice inter-ENS 2026, règlement CCINP 2026,
// coefficients CCMP (chireux.fr), coefficients X/ENS (génération-prepa.com),
// légifrance avis X 2026, site concours-centrale-supelec.fr

export const FILIERES = [
  { id: 'MP',  label: 'Mathématiques-Physique' },
  { id: 'PC',  label: 'Physique-Chimie' },
  { id: 'PSI', label: 'Physique et Sciences de l\'Ingénieur' },
]

export const BANQUES = [
  { id: 'X-ENS-ESPCI', label: 'X – ENS – ESPCI',  emoji: '⭐', shortDesc: 'Polytechnique, ENS, ESPCI' },
  { id: 'Centrale',    label: 'Centrale-Supélec',  emoji: '🔧', shortDesc: 'CentraleSupélec, Centrale Lyon…' },
  { id: 'Mines',       label: 'Mines-Ponts',       emoji: '⚙️', shortDesc: 'Mines Paris, Ponts, ISAE…' },
  { id: 'CCINP',       label: 'CCINP',             emoji: '🏭', shortDesc: 'INSA, IMT, INP, CPE…' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const SITE = 'https://www.jeremy-luccioni.fr' // placeholder pour liens non encore fournis

// ─────────────────────────────────────────────────────────────────────────────
// MODALITES — structure :
//   MODALITES[filiere][banque] =
//     { sousOptions: [...] }          ← si plusieurs sous-choix
//   ou
//     { ecrits, oraux, ecoles, siteInfos }   ← si pas de sous-choix
//
// ecrits  : [{ matiere, duree, coefficient }]   (coefficient null = affiché "—")
// oraux   : [{ matiere, coefficient }]
// ecoles  : [{ nom, ville, url }]
// siteInfos : [{ label, url }]
// ─────────────────────────────────────────────────────────────────────────────

export const MODALITES = {

  // ═══════════════════════════════════════════════════════════════════════════
  // FILIÈRE MP
  // ═══════════════════════════════════════════════════════════════════════════
  MP: {

    // ─── X – ENS – ESPCI ────────────────────────────────────────────────────
    'X-ENS-ESPCI': {
      sousOptions: [

        // Polytechnique — Option Informatique
        {
          id: 'X-info', label: 'Polytechnique – Option Informatique', tag: 'X',
          ecrits: [
            { matiere: 'Mathématiques A',  duree: '4h', coefficient: 8 },
            { matiere: 'Mathématiques B',  duree: '4h', coefficient: 7 },
            { matiere: 'Physique MP',      duree: '4h', coefficient: 6 },
            { matiere: 'Informatique A',   duree: '4h', coefficient: 6 },
            { matiere: 'Français',         duree: '4h', coefficient: 6 },
            { matiere: 'Langue Vivante',   duree: '4h', coefficient: 6 },
          ],
          oraux: [
            { matiere: 'Mathématiques — 1re interrogation', coefficient: 16 },
            { matiere: 'Mathématiques — 2e interrogation',  coefficient: 16 },
            { matiere: 'Physique',                          coefficient: 20 },
            { matiere: 'Chimie MP',                         coefficient: 9  },
            { matiere: 'Analyse de Documents Scientifiques (ADS)', coefficient: 15 },
            { matiere: 'Français',                          coefficient: 8  },
            { matiere: 'Langue Vivante obligatoire',        coefficient: 8  },
            { matiere: 'Épreuves sportives',                coefficient: 5  },
          ],
          ecoles: [{ nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
          siteInfos: [{ label: 'Polytechnique — Admissions', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
        },

        // Polytechnique — Option SI
        {
          id: 'X-si', label: 'Polytechnique – Option SI', tag: 'X',
          ecrits: [
            { matiere: 'Mathématiques A',         duree: '4h', coefficient: 8 },
            { matiere: 'Mathématiques B',         duree: '4h', coefficient: 7 },
            { matiere: 'Physique MP',             duree: '4h', coefficient: 6 },
            { matiere: 'Physique & Sciences de l\'Ingénieur', duree: '4h', coefficient: 6 },
            { matiere: 'Français',                duree: '4h', coefficient: 6 },
            { matiere: 'Langue Vivante',          duree: '4h', coefficient: 6 },
          ],
          oraux: [
            { matiere: 'Mathématiques — 1re interrogation', coefficient: 16 },
            { matiere: 'Mathématiques — 2e interrogation',  coefficient: 16 },
            { matiere: 'Physique',                          coefficient: 20 },
            { matiere: 'Chimie MP',                         coefficient: 9  },
            { matiere: 'Analyse de Documents Scientifiques (ADS)', coefficient: 15 },
            { matiere: 'Français',                          coefficient: 8  },
            { matiere: 'Langue Vivante obligatoire',        coefficient: 8  },
            { matiere: 'Épreuves sportives',                coefficient: 5  },
          ],
          ecoles: [{ nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
          siteInfos: [{ label: 'Polytechnique — Admissions', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
        },

        // ENS Ulm — option Physique
        {
          id: 'ENS-ulm-P', label: 'ENS Ulm – Physique', tag: 'ENS',
          ecrits: [
            { matiere: 'Physique MP',     duree: '4h', coefficient: 6 },
            { matiere: 'Mathématiques C', duree: '4h', coefficient: 4 },
            { matiere: 'Mathématiques D', duree: '6h', coefficient: 6, note: 'Épreuve propre ENS Ulm (6h)' },
            { matiere: 'Français',        duree: '4h', coefficient: 8 },
            { matiere: 'Langue Vivante',  duree: '4h', coefficient: 3 },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune X-ULSR)',  coefficient: 3  },
            { matiere: 'Mathématiques – commun ULSR',      coefficient: 15 },
            { matiere: 'Mathématiques – Ulm propre',       coefficient: 30 },
            { matiere: 'Physique – Ulm',                   coefficient: 25 },
          ],
          ecoles: [{ nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' }],
          siteInfos: [{ label: 'ENS Ulm — Admissions', url: 'https://www.ens.psl.eu/admission' }],
        },

        // ENS Ulm — option Informatique
        {
          id: 'ENS-ulm-I', label: 'ENS Ulm – Informatique', tag: 'ENS',
          ecrits: [
            { matiere: 'Physique MP',               duree: '4h', coefficient: 2 },
            { matiere: 'Informatique A',            duree: '4h', coefficient: 4 },
            { matiere: 'Mathématiques D',           duree: '6h', coefficient: 6, note: 'Épreuve propre ENS Ulm (6h)' },
            { matiere: 'Informatique Fondamentale', duree: '4h', coefficient: 4 },
            { matiere: 'Français',                  duree: '4h', coefficient: 8 },
            { matiere: 'Langue Vivante',            duree: '4h', coefficient: 3 },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune X-ULSR)',  coefficient: 3  },
            { matiere: 'Mathématiques – commun ULSR',      coefficient: 10 },
            { matiere: 'Mathématiques – Ulm propre',       coefficient: 30 },
            { matiere: 'Physique – Ulm',                   coefficient: 4  },
            { matiere: 'Informatique Fondamentale',        coefficient: 15 },
            { matiere: 'TP Algorithmique',                 coefficient: 15 },
          ],
          ecoles: [{ nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' }],
          siteInfos: [{ label: 'ENS Ulm — Admissions', url: 'https://www.ens.psl.eu/admission' }],
        },

        // ENS Lyon
        {
          id: 'ENS-lyon', label: 'ENS Lyon', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques A', duree: '4h', coefficient: 4 },
            { matiere: 'Mathématiques C', duree: '4h', coefficient: 4 },
            { matiere: 'Informatique B',  duree: '2h', coefficient: 3, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Français',        duree: '4h', coefficient: 2.5, note: 'Épreuve d\'admission' },
            { matiere: 'Langue Vivante',  duree: '4h', coefficient: 2.5, note: 'Épreuve d\'admission' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',       coefficient: 1.5 },
            { matiere: 'Mathématiques – commun ULSR',   coefficient: 4   },
            { matiere: 'Mathématiques – Lyon',          coefficient: 6   },
            { matiere: 'Physique',                      coefficient: 6   },
            { matiere: 'Informatique Fondamentale',     coefficient: 4   },
            { matiere: 'TIPE',                          coefficient: 2   },
          ],
          ecoles: [{ nom: 'ENS Lyon', ville: 'Lyon', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
          siteInfos: [{ label: 'ENS Lyon — Admissions', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
        },

        // ENS Paris-Saclay
        {
          id: 'ENS-saclay', label: 'ENS Paris-Saclay', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques A', duree: '4h', coefficient: 5 },
            { matiere: 'Physique MP',     duree: '4h', coefficient: 4 },
            { matiere: 'Informatique B',  duree: '2h', coefficient: 2.5, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Français',        duree: '4h', coefficient: 3, note: 'Épreuve d\'admission' },
            { matiere: 'Langue Vivante',  duree: '4h', coefficient: 2, note: 'Épreuve d\'admission' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',           coefficient: 2  },
            { matiere: 'Mathématiques – commun ULSR',       coefficient: 8  },
            { matiere: 'Mathématiques – Paris-Saclay',      coefficient: 12 },
            { matiere: 'Physique',                          coefficient: 6  },
            { matiere: 'Informatique Fondamentale',         coefficient: 12 },
            { matiere: 'TIPE',                              coefficient: 2  },
          ],
          ecoles: [{ nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
          siteInfos: [{ label: 'ENS Paris-Saclay — Admissions', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
        },

        // ENS Rennes
        {
          id: 'ENS-rennes', label: 'ENS Rennes', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques A', duree: '4h', coefficient: 5 },
            { matiere: 'Mathématiques C', duree: '4h', coefficient: 5 },
            { matiere: 'Physique MP',     duree: '4h', coefficient: 4 },
            { matiere: 'Informatique B',  duree: '2h', coefficient: 3, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Français',        duree: '4h', coefficient: 3, note: 'Épreuve d\'admission' },
            { matiere: 'Langue Vivante',  duree: '4h', coefficient: 2, note: 'Épreuve d\'admission' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',          coefficient: 2  },
            { matiere: 'Mathématiques – commun ULSR',      coefficient: 8  },
            { matiere: 'Mathématiques – Rennes',           coefficient: 12 },
            { matiere: 'Informatique Fondamentale',        coefficient: 5  },
            { matiere: 'TIPE',                             coefficient: 2  },
          ],
          ecoles: [{ nom: 'ENS Rennes', ville: 'Rennes', url: 'https://www.ens-rennes.fr/admission' }],
          siteInfos: [{ label: 'ENS Rennes — Admissions', url: 'https://www.ens-rennes.fr/admission' }],
        },
      ],
    },

    // ─── Centrale-Supélec ────────────────────────────────────────────────────
    'Centrale': {
      ecrits: [
        { matiere: 'Mathématiques 1',     duree: '4h', coefficient: 13 },
        { matiere: 'Mathématiques 2',     duree: '4h', coefficient: 11 },
        { matiere: 'Physique-Chimie 1',   duree: '4h', coefficient: 11 },
        { matiere: 'Physique-Chimie 2',   duree: '4h', coefficient: 10 },
        { matiere: 'Rédaction (Français)',duree: '4h', coefficient: 17 },
        { matiere: 'Informatique',        duree: '3h', coefficient: 6  },
        { matiere: 'Sciences de l\'Ingénieur (S2I)', duree: '4h', coefficient: 6 },
        { matiere: 'Langue Vivante A',    duree: '4h', coefficient: 6  },
      ],
      oraux: [
        { matiere: 'Mathématiques 1',              coefficient: 19 },
        { matiere: 'Mathématiques-Informatique',   coefficient: 19 },
        { matiere: 'Physique-Chimie 1',            coefficient: 16 },
        { matiere: 'Physique-Chimie-Informatique', coefficient: 16 },
        { matiere: 'TP Physique-Chimie',           coefficient: 12 },
        { matiere: 'TIPE',                         coefficient: 11 },
        { matiere: 'Langue Vivante A',             coefficient: 6  },
      ],
      ecoles: [
        { nom: 'CentraleSupélec',            ville: 'Gif-sur-Yvette', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lyon',              ville: 'Écully',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Nantes',            ville: 'Nantes',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lille',             ville: 'Villeneuve d\'Ascq', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Méditerranée',      ville: 'Marseille',       url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Institut d\'Optique (SupOptique)', ville: 'Palaiseau', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Arts et Métiers (ENSAM)',    ville: 'Paris',           url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'ENSEA',                      ville: 'Cergy',           url: 'https://www.concours-centrale-supelec.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale-Supélec', url: 'https://www.concours-centrale-supelec.fr' },
        { label: 'Épreuves écrites',               url: 'https://www.concours-centrale-supelec.fr/epreuves-ecrites' },
        { label: 'Épreuves orales',                url: 'https://www.concours-centrale-supelec.fr/epreuves-orales' },
      ],
    },

    // ─── Mines-Ponts (CCMP) ──────────────────────────────────────────────────
    'Mines': {
      ecrits: [
        { matiere: 'Mathématiques I',            duree: '3h',   coefficient: 4 },
        { matiere: 'Mathématiques II',           duree: '4h',   coefficient: 5 },
        { matiere: 'Physique I',                 duree: '3h',   coefficient: 3 },
        { matiere: 'Physique II',                duree: '3h',   coefficient: 4 },
        { matiere: 'Chimie',                     duree: '1h30', coefficient: 2 },
        { matiere: 'Informatique Commune',       duree: '2h',   coefficient: 2 },
        { matiere: 'Informatique option ou SI',  duree: '3h',   coefficient: 2 },
        { matiere: 'Français',                   duree: '3h',   coefficient: 5 },
        { matiere: 'Langue Vivante',             duree: '1h30', coefficient: 3 },
      ],
      oraux: [
        { matiere: 'Mathématiques-Physique',             coefficient: 12 },
        { matiere: 'Physique',                           coefficient: 10 },
        { matiere: 'TIPE',                               coefficient: 6  },
        { matiere: 'Français',                           coefficient: 6  },
        { matiere: 'Anglais (obligatoire)',              coefficient: 5  },
        { matiere: 'Reprise note écrite Info ou SI',     coefficient: 2  },
      ],
      ecoles: [
        { nom: 'Mines Paris – PSL',         ville: 'Paris',            url: 'https://concoursminesponts.fr' },
        { nom: 'École des Ponts ParisTech', ville: 'Marne-la-Vallée', url: 'https://concoursminesponts.fr' },
        { nom: 'ISAE-SUPAERO',              ville: 'Toulouse',         url: 'https://concoursminesponts.fr' },
        { nom: 'ENSTA Paris-Saclay',        ville: 'Palaiseau',        url: 'https://concoursminesponts.fr' },
        { nom: 'Télécom Paris',             ville: 'Palaiseau',        url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Saint-Étienne',       ville: 'Saint-Étienne',    url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Nancy',               ville: 'Nancy',            url: 'https://concoursminesponts.fr' },
        { nom: 'ENSAE Paris',               ville: 'Palaiseau',        url: 'https://concoursminesponts.fr' },
        { nom: 'IMT Atlantique',            ville: 'Brest / Nantes',   url: 'https://concoursminesponts.fr' },
        { nom: 'Chimie ParisTech – PSL',    ville: 'Paris',            url: 'https://concoursminesponts.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCMP',           url: 'https://concoursminesponts.fr' },
        { label: 'Règlement 2026 (PDF)',          url: 'https://concoursminesponts.fr/wp-content/uploads/2025/12/reglement-2026-09.12.25.pdf' },
        { label: 'Notice des écoles 2026 (PDF)', url: 'https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf' },
      ],
    },

    // ─── CCINP ───────────────────────────────────────────────────────────────
    'CCINP': {
      ecrits: [
        { matiere: 'Mathématiques 1',       duree: '3h', coefficient: 8 },
        { matiere: 'Mathématiques 2',       duree: '3h', coefficient: 8 },
        { matiere: 'Physique-Chimie 1',     duree: '3h', coefficient: 7 },
        { matiere: 'Physique-Chimie 2',     duree: '3h', coefficient: 7 },
        { matiere: 'Informatique ou SI (au choix)', duree: 'variable', coefficient: 6 },
        { matiere: 'Français-Philosophie', duree: '4h', coefficient: 6 },
        { matiere: 'Langue Vivante A',      duree: '3h', coefficient: 4 },
      ],
      oraux: [
        { matiere: 'Mathématiques',                   coefficient: 10 },
        { matiere: 'Physique-Chimie',                 coefficient: 12 },
        { matiere: 'TIPE',                            coefficient: 8  },
        { matiere: 'Reprise note écrite Français',    coefficient: 4  },
        { matiere: 'Reprise note écrite LV A',        coefficient: 2  },
      ],
      ecoles: [
        { nom: 'CPE Lyon',              ville: 'Lyon',           url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Grenoble INP',          ville: 'Grenoble',       url: 'https://www.concours-commun-inp.fr' },
        { nom: 'INSA Lyon',             ville: 'Lyon',           url: 'https://www.concours-commun-inp.fr' },
        { nom: 'INSA Toulouse',         ville: 'Toulouse',       url: 'https://www.concours-commun-inp.fr' },
        { nom: 'IMT Mines Albi',        ville: 'Albi',           url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Bordeaux INP',          ville: 'Bordeaux',       url: 'https://www.concours-commun-inp.fr' },
        { nom: 'ENSICAEN',              ville: 'Caen',           url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Clermont Auvergne INP', ville: 'Clermont-Fd',   url: 'https://www.concours-commun-inp.fr' },
        { nom: 'ENSCM',                 ville: 'Montpellier',    url: 'https://www.concours-commun-inp.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP',       url: 'https://www.concours-commun-inp.fr' },
        { label: 'Épreuves écrites',          url: 'https://www.concours-commun-inp.fr/fr/epreuves/les-epreuves-ecrites.html' },
        { label: 'Épreuves orales',           url: 'https://www.concours-commun-inp.fr/fr/epreuves/les-epreuves-orales.html' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FILIÈRE PC
  // ═══════════════════════════════════════════════════════════════════════════
  PC: {

    'X-ENS-ESPCI': {
      sousOptions: [

        // Polytechnique
        {
          id: 'X', label: 'Polytechnique (X)', tag: 'X',
          ecrits: [
            { matiere: 'Mathématiques',   duree: '4h', coefficient: 9 },
            { matiere: 'Physique A',      duree: '4h', coefficient: 6 },
            { matiere: 'Physique B',      duree: '4h', coefficient: 6 },
            { matiere: 'Chimie A',        duree: '4h', coefficient: 6 },
            { matiere: 'Français',        duree: '4h', coefficient: 6 },
            { matiere: 'Langue Vivante',  duree: '4h', coefficient: 6 },
          ],
          oraux: [
            { matiere: 'Mathématiques — 1re interrogation', coefficient: 20 },
            { matiere: 'Physique',                          coefficient: 16 },
            { matiere: 'Chimie PC',                         coefficient: 9  },
            { matiere: 'Analyse de Documents Scientifiques (ADS)', coefficient: 15 },
            { matiere: 'Français',                          coefficient: 8  },
            { matiere: 'Langue Vivante obligatoire',        coefficient: 8  },
            { matiere: 'TP Physique',                       coefficient: 8  },
            { matiere: 'TP Chimie',                         coefficient: 8  },
            { matiere: 'Épreuves sportives',                coefficient: 5  },
          ],
          ecoles: [
            { nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' },
          ],
          siteInfos: [
            { label: 'Polytechnique — Admissions', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' },
          ],
        },

        // ESPCI Paris (écrits et oraux propres, distincts de l'X)
        {
          id: 'ESPCI', label: 'ESPCI Paris', tag: 'ESPCI',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 9 },
            { matiere: 'Physique A',     duree: '4h', coefficient: 5, note: 'Épreuve passée par X et ESPCI uniquement' },
            { matiere: 'Chimie A',       duree: '4h', coefficient: 9 },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5 },
            { matiere: 'Français',       duree: '4h', coefficient: 5 },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 4 },
          ],
          oraux: [
            { matiere: 'Mathématiques',                          coefficient: 14 },
            { matiere: 'Physique',                               coefficient: 14 },
            { matiere: 'Chimie',                                 coefficient: 14 },
            { matiere: 'Analyse de Documents Scientifiques (ADS)', coefficient: 15 },
            { matiere: 'TP Physique',                            coefficient: 12 },
            { matiere: 'TP Chimie',                              coefficient: 12 },
            { matiere: 'Langue Vivante',                         coefficient: 7  },
            { matiere: 'Français',                               coefficient: 6  },
          ],
          ecoles: [
            { nom: 'ESPCI Paris', ville: 'Paris', url: 'https://www.espci.psl.eu/fr/admission' },
          ],
          siteInfos: [
            { label: 'ESPCI — Admissions', url: 'https://www.espci.psl.eu/fr/admission' },
          ],
        },

        // ENS Ulm — option Physique
        {
          id: 'ENS-ulm-P', label: 'ENS Ulm – Physique', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 5 },
            { matiere: 'Chimie A',       duree: '4h', coefficient: 5 },
            { matiere: 'Physique C',     duree: '6h', coefficient: 7, note: 'Épreuve propre ENS Ulm (6h)' },
            { matiere: 'Français',       duree: '4h', coefficient: 8 },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 3 },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',  coefficient: 3  },
            { matiere: 'Physique – Ulm',            coefficient: 26 },
            { matiere: 'Chimie – Ulm',              coefficient: 20 },
            { matiere: 'Mathématiques – Ulm',       coefficient: 20 },
            { matiere: 'TP Physique',               coefficient: 12 },
            { matiere: 'TIPE',                      coefficient: 8  },
          ],
          ecoles: [{ nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' }],
          siteInfos: [{ label: 'ENS Ulm — Admissions', url: 'https://www.ens.psl.eu/admission' }],
        },

        // ENS Ulm — option Chimie
        {
          id: 'ENS-ulm-C', label: 'ENS Ulm – Chimie', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 4 },
            { matiere: 'Chimie B',       duree: '6h', coefficient: 8, note: 'Épreuve propre ENS Ulm (6h)' },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5 },
            { matiere: 'Français',       duree: '4h', coefficient: 8 },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 3 },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)', coefficient: 3  },
            { matiere: 'Physique – Ulm',           coefficient: 22 },
            { matiere: 'Chimie – Ulm',             coefficient: 28 },
            { matiere: 'Mathématiques – Ulm',      coefficient: 20 },
            { matiere: 'TP Chimie',                coefficient: 16 },
            { matiere: 'TIPE',                     coefficient: 8  },
          ],
          ecoles: [{ nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' }],
          siteInfos: [{ label: 'ENS Ulm — Admissions', url: 'https://www.ens.psl.eu/admission' }],
        },

        // ENS Lyon — option Physique
        {
          id: 'ENS-lyon-P', label: 'ENS Lyon – Physique', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 5   },
            { matiere: 'Chimie A',       duree: '4h', coefficient: 5   },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5   },
            { matiere: 'Informatique B', duree: '2h', coefficient: 3, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Français',       duree: '4h', coefficient: 2.5, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 2.5, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Langue Vivante',  coefficient: 2 },
            { matiere: 'Physique',        coefficient: 6 },
            { matiere: 'Chimie',          coefficient: 6 },
            { matiere: 'Mathématiques',   coefficient: 4 },
            { matiere: 'TP Physique',     coefficient: 4 },
            { matiere: 'TP Chimie',       coefficient: 4 },
            { matiere: 'TIPE',            coefficient: 3 },
          ],
          ecoles: [{ nom: 'ENS Lyon', ville: 'Lyon', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
          siteInfos: [{ label: 'ENS Lyon — Admissions', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
        },

        // ENS Lyon — option Chimie
        {
          id: 'ENS-lyon-C', label: 'ENS Lyon – Chimie', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 5 },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5 },
            { matiere: 'Informatique B', duree: '2h', coefficient: 3, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Français',       duree: '4h', coefficient: 3, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Langue Vivante',  coefficient: 2 },
            { matiere: 'Physique',        coefficient: 6 },
            { matiere: 'Chimie',          coefficient: 6 },
            { matiere: 'Mathématiques',   coefficient: 4 },
            { matiere: 'TP Physique',     coefficient: 4 },
            { matiere: 'TP Chimie',       coefficient: 4 },
            { matiere: 'TIPE',            coefficient: 3 },
          ],
          ecoles: [{ nom: 'ENS Lyon', ville: 'Lyon', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
          siteInfos: [{ label: 'ENS Lyon — Admissions', url: 'https://www.ens-lyon.fr/formation/admission/procedures-dadmission/concours-sciences-exactes-et-experimentales' }],
        },

        // ENS Paris-Saclay — option Physique
        {
          id: 'ENS-saclay-P', label: 'ENS Paris-Saclay – Physique', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 5 },
            { matiere: 'Chimie A',       duree: '4h', coefficient: 5 },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5 },
            { matiere: 'Physique-Chimie',duree: '5h', coefficient: 5, note: 'Épreuve propre ENS Paris-Saclay (5h)' },
            { matiere: 'Français',       duree: '4h', coefficient: 3, note: 'Épreuve d\'admission' },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 2, note: 'Épreuve d\'admission' },
          ],
          oraux: [
            { matiere: 'Langue Vivante',  coefficient: 2  },
            { matiere: 'Physique',        coefficient: 12 },
            { matiere: 'Chimie',          coefficient: 6  },
            { matiere: 'TP Physique',     coefficient: 6  },
            { matiere: 'TP Chimie',       coefficient: 3  },
            { matiere: 'TIPE',            coefficient: 6  },
          ],
          ecoles: [{ nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
          siteInfos: [{ label: 'ENS Paris-Saclay — Admissions', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
        },

        // ENS Paris-Saclay — option Chimie
        {
          id: 'ENS-saclay-C', label: 'ENS Paris-Saclay – Chimie', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',  duree: '4h', coefficient: 5 },
            { matiere: 'Chimie A',       duree: '4h', coefficient: 5 },
            { matiere: 'Physique B',     duree: '4h', coefficient: 5 },
            { matiere: 'Physique-Chimie',duree: '5h', coefficient: 5, note: 'Épreuve propre ENS Paris-Saclay (5h)' },
            { matiere: 'Français',       duree: '4h', coefficient: 3, note: 'Épreuve d\'admission' },
            { matiere: 'Langue Vivante', duree: '4h', coefficient: 2, note: 'Épreuve d\'admission' },
          ],
          oraux: [
            { matiere: 'Langue Vivante',  coefficient: 2  },
            { matiere: 'Physique',        coefficient: 6  },
            { matiere: 'Chimie',          coefficient: 12 },
            { matiere: 'TP Physique',     coefficient: 3  },
            { matiere: 'TP Chimie',       coefficient: 6  },
            { matiere: 'TIPE',            coefficient: 6  },
          ],
          ecoles: [{ nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
          siteInfos: [{ label: 'ENS Paris-Saclay — Admissions', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
        },
      ],
    },

    // ─── Centrale-Supélec ────────────────────────────────────────────────────
    'Centrale': {
      ecrits: [
        { matiere: 'Mathématiques 1',       duree: '4h', coefficient: 11 },
        { matiere: 'Mathématiques 2',       duree: '4h', coefficient: 11 },
        { matiere: 'Physique-Chimie 1',     duree: '4h', coefficient: 14 },
        { matiere: 'Physique-Chimie 2',     duree: '4h', coefficient: 12 },
        { matiere: 'Rédaction (Français)',  duree: '4h', coefficient: 17 },
        { matiere: 'Informatique',          duree: '3h', coefficient: 6  },
        { matiere: 'Langue Vivante A',      duree: '4h', coefficient: 6  },
      ],
      oraux: [
        { matiere: 'Mathématiques 1',              coefficient: 19 },
        { matiere: 'Mathématiques-Informatique',   coefficient: 16 },
        { matiere: 'Physique 1',                   coefficient: 19 },
        { matiere: 'Physique-Chimie-Informatique', coefficient: 16 },
        { matiere: 'TP Physique-Chimie',           coefficient: 12 },
        { matiere: 'TIPE',                         coefficient: 11 },
        { matiere: 'Langue Vivante A',             coefficient: 6  },
      ],
      ecoles: [
        { nom: 'CentraleSupélec',       ville: 'Gif-sur-Yvette', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lyon',         ville: 'Écully',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Nantes',       ville: 'Nantes',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lille',        ville: 'Villeneuve d\'Ascq', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Méditerranée', ville: 'Marseille',       url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Arts et Métiers',       ville: 'Paris',           url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'ENSEA',                 ville: 'Cergy',           url: 'https://www.concours-centrale-supelec.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale-Supélec', url: 'https://www.concours-centrale-supelec.fr' },
        { label: 'Épreuves écrites',               url: 'https://www.concours-centrale-supelec.fr/epreuves-ecrites' },
        { label: 'Épreuves orales',                url: 'https://www.concours-centrale-supelec.fr/epreuves-orales' },
      ],
    },

    // ─── Mines-Ponts (CCMP) ──────────────────────────────────────────────────
    'Mines': {
      ecrits: [
        { matiere: 'Mathématiques I',      duree: '3h',   coefficient: 4 },
        { matiere: 'Mathématiques II',     duree: '3h',   coefficient: 3 },
        { matiere: 'Physique I',           duree: '3h',   coefficient: 4 },
        { matiere: 'Physique II',          duree: '4h',   coefficient: 5 },
        { matiere: 'Chimie',              duree: '4h',   coefficient: 4 },
        { matiere: 'Informatique Commune', duree: '2h',   coefficient: 2 },
        { matiere: 'Français',            duree: '3h',   coefficient: 5 },
        { matiere: 'Langue Vivante',      duree: '1h30', coefficient: 3 },
      ],
      oraux: [
        { matiere: 'Mathématiques-Physique',    coefficient: 8  },
        { matiere: 'Physique',                  coefficient: 10 },
        { matiere: 'Épreuve mixte (Phys. ou Chim.)', coefficient: 6 },
        { matiere: 'TIPE',                      coefficient: 6  },
        { matiere: 'Français',                  coefficient: 6  },
        { matiere: 'Anglais (obligatoire)',      coefficient: 5  },
      ],
      ecoles: [
        { nom: 'Mines Paris – PSL',         ville: 'Paris',           url: 'https://concoursminesponts.fr' },
        { nom: 'École des Ponts ParisTech', ville: 'Marne-la-Vallée', url: 'https://concoursminesponts.fr' },
        { nom: 'ISAE-SUPAERO',              ville: 'Toulouse',         url: 'https://concoursminesponts.fr' },
        { nom: 'ENSTA Paris-Saclay',        ville: 'Palaiseau',        url: 'https://concoursminesponts.fr' },
        { nom: 'Télécom Paris',             ville: 'Palaiseau',        url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Saint-Étienne',       ville: 'Saint-Étienne',    url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Nancy',               ville: 'Nancy',            url: 'https://concoursminesponts.fr' },
        { nom: 'Chimie ParisTech – PSL',    ville: 'Paris',            url: 'https://concoursminesponts.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCMP',           url: 'https://concoursminesponts.fr' },
        { label: 'Règlement 2026 (PDF)',          url: 'https://concoursminesponts.fr/wp-content/uploads/2025/12/reglement-2026-09.12.25.pdf' },
      ],
    },

    // ─── CCINP ───────────────────────────────────────────────────────────────
    'CCINP': {
      ecrits: [
        { matiere: 'Mathématiques',       duree: '4h', coefficient: 12 },
        { matiere: 'Physique',            duree: '4h', coefficient: 13, note: 'Coeff. 13 en PC-PH, 7 en PC-CH' },
        { matiere: 'Chimie',              duree: '4h', coefficient: 7,  note: 'Coeff. 7 en PC-PH, 13 en PC-CH' },
        { matiere: 'Modélisation de systèmes physiques ou chimiques', duree: '4h', coefficient: 7 },
        { matiere: 'Informatique',        duree: '3h', coefficient: 6  },
        { matiere: 'Français-Philosophie',duree: '4h', coefficient: 9  },
        { matiere: 'Langue Vivante A',    duree: '3h', coefficient: 4  },
        { matiere: 'Langue Vivante B (facultative)', duree: '1h', coefficient: 2 },
      ],
      oraux: [
        { matiere: 'Mathématiques',                    coefficient: 10 },
        { matiere: 'Physique ou Chimie (tirage au sort)', coefficient: 12 },
        { matiere: 'TIPE',                             coefficient: 8  },
        { matiere: 'Reprise note écrite Français',     coefficient: 4  },
        { matiere: 'Reprise note écrite LV A',         coefficient: 2  },
      ],
      ecoles: [
        { nom: 'CPE Lyon',     ville: 'Lyon',     url: 'https://www.concours-commun-inp.fr' },
        { nom: 'INSA Lyon',    ville: 'Lyon',     url: 'https://www.concours-commun-inp.fr' },
        { nom: 'INSA Toulouse',ville: 'Toulouse', url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Bordeaux INP', ville: 'Bordeaux', url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Grenoble INP', ville: 'Grenoble', url: 'https://www.concours-commun-inp.fr' },
        { nom: 'ENSCM',        ville: 'Montpellier', url: 'https://www.concours-commun-inp.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP', url: 'https://www.concours-commun-inp.fr' },
        { label: 'Épreuves',            url: 'https://www.concours-commun-inp.fr/fr/epreuves/' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FILIÈRE PSI
  // ═══════════════════════════════════════════════════════════════════════════
  PSI: {

    'X-ENS-ESPCI': {
      sousOptions: [

        // Polytechnique PSI
        {
          id: 'X', label: 'Polytechnique', tag: 'X',
          ecrits: [
            { matiere: 'Mathématiques',             duree: '4h', coefficient: 10 },
            { matiere: 'Modélisation (physique/SI)', duree: '5h', coefficient: 5  },
            { matiere: 'Physique',                  duree: '4h', coefficient: 6  },
            { matiere: 'Sciences Industrielles',    duree: '5h', coefficient: 6  },
            { matiere: 'Français',                  duree: '4h', coefficient: 6  },
            { matiere: 'Informatique',              duree: '2h', coefficient: 4, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante',            duree: '4h', coefficient: 6, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Mathématiques',                              coefficient: 18 },
            { matiere: 'Physique',                                   coefficient: 12 },
            { matiere: 'Manipulation de physique',                   coefficient: 6  },
            { matiere: 'Manipulation et interrogation SI',           coefficient: 6  },
            { matiere: 'Français',                                   coefficient: 6  },
            { matiere: 'Langue Vivante',                             coefficient: 6  },
            { matiere: 'Analyse de Documents Scientifiques (ADS)',   coefficient: 10 },
            { matiere: 'Épreuves sportives',                         coefficient: 4  },
          ],
          ecoles: [{ nom: 'École Polytechnique (l\'X)', ville: 'Palaiseau', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
          siteInfos: [{ label: 'Polytechnique — Admissions', url: 'https://www.polytechnique.edu/admission-cycle-ingenieur/calendrier-cpge' }],
        },

        // ENS Paris-Saclay — voie Physique-PSI
        {
          id: 'ENS-saclay-P', label: 'ENS Paris-Saclay – Physique', tag: 'ENS',
          note: 'Deux voies distinctes à ENS Paris-Saclay (Physique-PSI et SI-PSI). Les candidats peuvent s\'inscrire aux deux.',
          ecrits: [
            { matiere: 'Mathématiques',              duree: '4h', coefficient: 5  },
            { matiere: 'Modélisation (physique/SI)', duree: '5h', coefficient: 5  },
            { matiere: 'Physique',                   duree: '4h', coefficient: 5  },
            { matiere: 'Sciences Industrielles',     duree: '5h', coefficient: 5  },
            { matiere: 'Français',                   duree: '4h', coefficient: 4, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante',             duree: '4h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Informatique',               duree: '2h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',          coefficient: 2 },
            { matiere: 'Mathématiques',                     coefficient: 5 },
            { matiere: 'Physique',                          coefficient: 3 },
            { matiere: 'Manipulation de physique',          coefficient: 6 },
            { matiere: 'Manipulation et interrogation SI',  coefficient: 6 },
            { matiere: 'TIPE',                              coefficient: 4 },
          ],
          ecoles: [{ nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
          siteInfos: [{ label: 'ENS Paris-Saclay — Admissions', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
        },

        // ENS Paris-Saclay — voie SI-PSI
        {
          id: 'ENS-saclay-SI', label: 'ENS Paris-Saclay – SI', tag: 'ENS',
          note: 'Mêmes épreuves et coefficients que la voie Physique-PSI, orientation département Sciences de l\'ingénieur.',
          ecrits: [
            { matiere: 'Mathématiques',              duree: '4h', coefficient: 5  },
            { matiere: 'Modélisation (physique/SI)', duree: '5h', coefficient: 5  },
            { matiere: 'Physique',                   duree: '4h', coefficient: 5  },
            { matiere: 'Sciences Industrielles',     duree: '5h', coefficient: 5  },
            { matiere: 'Français',                   duree: '4h', coefficient: 4, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante',             duree: '4h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Informatique',               duree: '2h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',          coefficient: 2 },
            { matiere: 'Mathématiques',                     coefficient: 5 },
            { matiere: 'Physique',                          coefficient: 3 },
            { matiere: 'Manipulation de physique',          coefficient: 6 },
            { matiere: 'Manipulation et interrogation SI',  coefficient: 6 },
            { matiere: 'TIPE',                              coefficient: 4 },
          ],
          ecoles: [{ nom: 'ENS Paris-Saclay', ville: 'Gif-sur-Yvette', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
          siteInfos: [{ label: 'ENS Paris-Saclay — Admissions', url: 'https://ens-paris-saclay.fr/admission/sur-concours/concours-dadmission-en-1ere-annee' }],
        },

        // ENS Ulm PSI
        {
          id: 'ENS-ulm', label: 'ENS Ulm', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',                     duree: '4h',      coefficient: 9 },
            { matiere: 'Modélisation SC/SI',                duree: '5h',      coefficient: 7 },
            { matiere: 'Physique (propre ENS Ulm)',         duree: '6h', coefficient: 12, note: 'Épreuve propre ENS Ulm (6h)' },
            { matiere: 'Français',                          duree: '4h',      coefficient: 8 },
            { matiere: 'Langue Vivante',                    duree: '4h',      coefficient: 3 },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)', coefficient: 2  },
            { matiere: 'Physique',                 coefficient: 12 },
            { matiere: 'Mathématiques',            coefficient: 18 },
          ],
          ecoles: [{ nom: 'ENS Paris (Ulm)', ville: 'Paris', url: 'https://www.ens.psl.eu/admission' }],
          siteInfos: [{ label: 'ENS Ulm — Admissions', url: 'https://www.ens.psl.eu/admission' }],
        },

        // ENS Rennes PSI
        // Note : ENS Lyon ne recrute pas en PSI (0 place en 2025-2026, cf. notice ENS Lyon).
        {
          id: 'ENS-rennes', label: 'ENS Rennes', tag: 'ENS',
          ecrits: [
            { matiere: 'Mathématiques',              duree: '4h', coefficient: 5  },
            { matiere: 'Modélisation (physique/SI)', duree: '5h', coefficient: 5  },
            { matiere: 'Physique',                   duree: '4h', coefficient: 5  },
            { matiere: 'Sciences Industrielles',     duree: '5h', coefficient: 5  },
            { matiere: 'Français',                   duree: '4h', coefficient: 4, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Langue Vivante',             duree: '4h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
            { matiere: 'Informatique',               duree: '2h', coefficient: 2, note: 'Épreuve d\'admission (non comptée à l\'admissibilité)' },
          ],
          oraux: [
            { matiere: 'Langue Vivante (commune)',         coefficient: 3 },
            { matiere: 'Mathématiques',                    coefficient: 5 },
            { matiere: 'Physique',                         coefficient: 3 },
            { matiere: 'Manipulation de physique',         coefficient: 3 },
            { matiere: 'Manipulation et interrogation SI', coefficient: 6 },
            { matiere: 'TIPE',                             coefficient: 4 },
          ],
          ecoles: [{ nom: 'ENS Rennes', ville: 'Rennes', url: 'https://www.ens-rennes.fr/admission' }],
          siteInfos: [{ label: 'ENS Rennes — Admissions', url: 'https://www.ens-rennes.fr/admission' }],
        },
      ],
    },

    // ─── Centrale-Supélec ────────────────────────────────────────────────────
    'Centrale': {
      ecrits: [
        { matiere: 'Mathématiques 1',     duree: '4h', coefficient: 11 },
        { matiere: 'Mathématiques 2',     duree: '4h', coefficient: 11 },
        { matiere: 'Physique-Chimie 1',   duree: '4h', coefficient: 11 },
        { matiere: 'Physique-Chimie 2',   duree: '4h', coefficient: 11 },
        { matiere: 'Rédaction (Français)',duree: '4h', coefficient: 17 },
        { matiere: 'Informatique',        duree: '3h', coefficient: 6  },
        { matiere: 'Sciences de l\'Ingénieur (S2I)', duree: '4h', coefficient: 14 },
        { matiere: 'Langue Vivante A',    duree: '4h', coefficient: 6  },
      ],
      oraux: [
        { matiere: 'Mathématiques 1',              coefficient: 19 },
        { matiere: 'Mathématiques-Informatique',   coefficient: 16 },
        { matiere: 'Physique-Chimie 1',            coefficient: 19 },
        { matiere: 'S2I + Informatique',           coefficient: 16 },
        { matiere: 'TP Physique-Chimie',           coefficient: 12 },
        { matiere: 'TIPE',                         coefficient: 11 },
        { matiere: 'Langue Vivante A',             coefficient: 6  },
      ],
      ecoles: [
        { nom: 'CentraleSupélec',       ville: 'Gif-sur-Yvette', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lyon',         ville: 'Écully',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Nantes',       ville: 'Nantes',          url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Lille',        ville: 'Villeneuve d\'Ascq', url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Centrale Méditerranée', ville: 'Marseille',       url: 'https://www.concours-centrale-supelec.fr' },
        { nom: 'Arts et Métiers',       ville: 'Paris',           url: 'https://www.concours-centrale-supelec.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel Centrale-Supélec', url: 'https://www.concours-centrale-supelec.fr' },
        { label: 'Épreuves écrites',               url: 'https://www.concours-centrale-supelec.fr/epreuves-ecrites' },
        { label: 'Épreuves orales',                url: 'https://www.concours-centrale-supelec.fr/epreuves-orales' },
      ],
    },

    // ─── Mines-Ponts (CCMP) ──────────────────────────────────────────────────
    'Mines': {
      ecrits: [
        { matiere: 'Mathématiques I',      duree: '3h',   coefficient: 4 },
        { matiere: 'Mathématiques II',     duree: '3h',   coefficient: 3 },
        { matiere: 'Physique I',           duree: '3h',   coefficient: 3 },
        { matiere: 'Physique II',          duree: '4h',   coefficient: 4 },
        { matiere: 'Chimie',              duree: '1h30', coefficient: 2 },
        { matiere: 'Informatique Commune', duree: '2h',   coefficient: 2 },
        { matiere: 'Sciences Industrielles', duree: '4h', coefficient: 4 },
        { matiere: 'Français',            duree: '3h',   coefficient: 5 },
        { matiere: 'Langue Vivante',      duree: '1h30', coefficient: 3 },
      ],
      oraux: [
        { matiere: 'Mathématiques-Physique',                  coefficient: 9 },
        { matiere: 'Physique',                                coefficient: 9 },
        { matiere: 'Épreuve mixte (Physique ou SI)',          coefficient: 6 },
        { matiere: 'TIPE',                                    coefficient: 6 },
        { matiere: 'Français',                                coefficient: 6 },
        { matiere: 'Anglais (obligatoire)',                   coefficient: 5 },
      ],
      ecoles: [
        { nom: 'ISAE-SUPAERO',       ville: 'Toulouse',      url: 'https://concoursminesponts.fr' },
        { nom: 'ENSTA Paris-Saclay', ville: 'Palaiseau',     url: 'https://concoursminesponts.fr' },
        { nom: 'Télécom Paris',      ville: 'Palaiseau',     url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Saint-Étienne',ville: 'Saint-Étienne', url: 'https://concoursminesponts.fr' },
        { nom: 'Mines Nancy',        ville: 'Nancy',         url: 'https://concoursminesponts.fr' },
        { nom: 'IMT Atlantique',     ville: 'Brest / Nantes',url: 'https://concoursminesponts.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCMP',  url: 'https://concoursminesponts.fr' },
        { label: 'Règlement 2026 (PDF)',url: 'https://concoursminesponts.fr/wp-content/uploads/2025/12/reglement-2026-09.12.25.pdf' },
      ],
    },

    // ─── CCINP ───────────────────────────────────────────────────────────────
    'CCINP': {
      ecrits: [
        { matiere: 'Mathématiques',                     duree: '4h', coefficient: 9  },
        { matiere: 'Physique-Chimie',                   duree: '4h', coefficient: 9  },
        { matiere: 'Modélisation et Ingénierie Numérique', duree: '4h', coefficient: 9 },
        { matiere: 'Sciences Industrielles',            duree: '4h', coefficient: 12 },
        { matiere: 'Informatique',                      duree: '3h', coefficient: 6  },
        { matiere: 'Français-Philosophie',              duree: '4h', coefficient: 9  },
        { matiere: 'Langue Vivante A',                  duree: '3h', coefficient: 4  },
        { matiere: 'Langue Vivante B (facultative)',    duree: '1h', coefficient: 2  },
      ],
      oraux: [
        { matiere: 'Mathématiques',               coefficient: 10 },
        { matiere: 'Physique-Chimie',             coefficient: 12 },
        { matiere: 'TIPE',                        coefficient: 8  },
        { matiere: 'Reprise note écrite Français',coefficient: 4  },
        { matiere: 'Reprise note écrite LV A',    coefficient: 2  },
      ],
      ecoles: [
        { nom: 'INSA Lyon',             ville: 'Lyon',          url: 'https://www.concours-commun-inp.fr' },
        { nom: 'INSA Toulouse',         ville: 'Toulouse',      url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Grenoble INP',          ville: 'Grenoble',      url: 'https://www.concours-commun-inp.fr' },
        { nom: 'IMT Atlantique',        ville: 'Brest / Nantes',url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Bordeaux INP',          ville: 'Bordeaux',      url: 'https://www.concours-commun-inp.fr' },
        { nom: 'Clermont Auvergne INP', ville: 'Clermont-Fd',  url: 'https://www.concours-commun-inp.fr' },
        { nom: 'ENSICAEN',              ville: 'Caen',          url: 'https://www.concours-commun-inp.fr' },
      ],
      siteInfos: [
        { label: 'Site officiel CCINP', url: 'https://www.concours-commun-inp.fr' },
        { label: 'Épreuves',            url: 'https://www.concours-commun-inp.fr/fr/epreuves/' },
      ],
    },
  },
}
