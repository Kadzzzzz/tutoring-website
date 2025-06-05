// src/composables/useTranslations.js
// 🎣 COMPOSABLE CENTRALISÉ POUR LES TRADUCTIONS

import { ref, computed } from 'vue'
import { translations } from '@/i18n/translations.js'

// État global partagé entre tous les composants
const currentLang = ref('fr')

export function useTranslations() {

  // 🔄 Fonction de traduction principale
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    for (const k of keys) {
      value = value?.[k]
    }

    // Fallback : retourne la clé si traduction introuvable
    return value || key
  }

  // 🌍 Changement de langue
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
    localStorage.setItem('language', currentLang.value)
  }

  // 🔧 Définir une langue spécifique
  const setLanguage = (lang) => {
    if (['fr', 'en'].includes(lang)) {
      currentLang.value = lang
      localStorage.setItem('language', lang)
    }
  }

  // 💾 Charger la langue sauvegardée
  const loadSavedLanguage = () => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && ['fr', 'en'].includes(savedLang)) {
      currentLang.value = savedLang
    }
  }

  // 📋 Obtenir toutes les langues disponibles
  const availableLanguages = computed(() => {
    return Object.keys(translations)
  })

  // 🏷️ Obtenir le nom de la langue courante
  const currentLanguageName = computed(() => {
    const langNames = {
      fr: 'Français',
      en: 'English'
    }
    return langNames[currentLang.value] || currentLang.value
  })

  // 🔍 Vérifier si une clé de traduction existe
  const hasTranslation = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    for (const k of keys) {
      if (value?.[k] === undefined) return false
      value = value[k]
    }

    return true
  }

  // 🎯 Traduction avec paramètres (bonus pour plus tard)
  const tWithParams = (key, params = {}) => {
    let translation = t(key)

    // Remplace les paramètres dans la traduction
    // Ex: "Bonjour {name}" avec {name: "Jeremy"} → "Bonjour Jeremy"
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })

    return translation
  }

  return {
    // État
    currentLang: computed(() => currentLang.value),

    // Fonctions principales
    t,
    toggleLanguage,
    setLanguage,
    loadSavedLanguage,

    // Utilitaires
    availableLanguages,
    currentLanguageName,
    hasTranslation,
    tWithParams
  }
}