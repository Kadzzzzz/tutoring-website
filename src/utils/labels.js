// src/utils/labels.js
// Constantes pour tous les labels de l'interface

// Labels des matières
export const SUBJECT_LABELS = {
  maths: 'Mathématiques',
  physics: 'Physique',
  chemistry: 'Chimie'
}

// Labels des niveaux
export const LEVEL_LABELS = {
  terminale: 'Terminale',
  prepa1: 'Prépa 1A',
  prepa2: 'Prépa 2A'
}

// Labels des types de ressources
export const TYPE_LABELS = {
  exercise: 'Exercice',
  course: 'Cours',
  method: 'Méthode',
  interro: 'Interrogation',
  colle: 'Colle'
}

// Labels de difficulté
export const DIFFICULTY_LABELS = {
  facile: 'Facile',
  moyen: 'Moyen',
  difficile: 'Difficile'
}

// Labels pour les téléchargements
export const DOWNLOAD_LABELS = {
  statement: 'Énoncé',
  solution: 'Correction'
}

// Labels généraux pour l'UI
export const UI_LABELS = {
  hasVideo: 'Vidéo',
  notes: 'Notes et conseils',
  noPdfAvailable: 'Documents PDF en cours de préparation'
}

// Fonctions utilitaires pour obtenir les labels
export const getSubjectLabel = (key) => SUBJECT_LABELS[key] || key
export const getLevelLabel = (key) => LEVEL_LABELS[key] || key
export const getTypeLabel = (key) => TYPE_LABELS[key] || key
export const getDifficultyLabel = (key) => DIFFICULTY_LABELS[key] || key