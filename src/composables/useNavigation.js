// src/composables/useNavigation.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useNavigation() {
  const scrolled = ref(false)
  const mobileMenuOpen = ref(false)

  const handleScroll = () => {
    scrolled.value = window.scrollY > 100
  }

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = scrolled.value ? 70 : 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToSectionMobile = (sectionId) => {
    scrollToSection(sectionId)
    setTimeout(() => {
      mobileMenuOpen.value = false
    }, 150)
    document.body.style.overflow = ''
  }

  // Auto-setup des event listeners
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Init value
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = ''
  })

  return {
    scrolled,
    mobileMenuOpen,
    handleScroll,
    toggleMobileMenu,
    scrollToSection,
    scrollToSectionMobile
  }
}