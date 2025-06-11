// src/composables/useTranslations.js
// Centralized composable for translations management

import { ref, computed } from 'vue'
import { translations } from '@/i18n/translations.js'

// Global state shared between all components
const currentLang = ref('fr')

export function useTranslations() {

  /**
   * Main translation function
   * @param {string} key - Translation key (dot notation: 'section.subsection.key')
   * @returns {string} Translated text or key if not found
   */
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    for (const k of keys) {
      value = value?.[k]
    }

    // Fallback: return key if translation not found
    return value || key
  }

  /**
   * Toggles between French and English
   */
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
    localStorage.setItem('language', currentLang.value)
  }

  /**
   * Sets a specific language
   * @param {string} lang - Language code ('fr' or 'en')
   */
  const setLanguage = (lang) => {
    if (['fr', 'en'].includes(lang)) {
      currentLang.value = lang
      localStorage.setItem('language', lang)
    }
  }

  /**
   * Loads the saved language from localStorage
   */
  const loadSavedLanguage = () => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && ['fr', 'en'].includes(savedLang)) {
      currentLang.value = savedLang
    }
  }

  /**
   * Gets all available languages
   */
  const availableLanguages = computed(() => {
    return Object.keys(translations)
  })

  /**
   * Gets the current language display name
   */
  const currentLanguageName = computed(() => {
    const langNames = {
      fr: 'Français',
      en: 'English'
    }
    return langNames[currentLang.value] || currentLang.value
  })

  /**
   * Checks if a translation key exists
   * @param {string} key - Translation key to check
   * @returns {boolean} True if translation exists
   */
  const hasTranslation = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    for (const k of keys) {
      if (value?.[k] === undefined) return false
      value = value[k]
    }

    return true
  }

  /**
   * Translation with parameter replacement
   * @param {string} key - Translation key
   * @param {Object} params - Parameters to replace in translation
   * @returns {string} Translated text with parameters replaced
   * @example tWithParams('greeting.hello', {name: 'Jeremy'}) // "Hello {name}" → "Hello Jeremy"
   */
  const tWithParams = (key, params = {}) => {
    let translation = t(key)

    // Replace parameters in the translation
    // Ex: "Hello {name}" with {name: "Jeremy"} → "Hello Jeremy"
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })

    return translation
  }

  return {
    // State
    currentLang: computed(() => currentLang.value),

    // Main functions
    t,
    toggleLanguage,
    setLanguage,
    loadSavedLanguage,

    // Utilities
    availableLanguages,
    currentLanguageName,
    hasTranslation,
    tWithParams
  }
}