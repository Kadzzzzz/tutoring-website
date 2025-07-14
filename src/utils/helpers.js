// Fonctions utilitaires
export const scrollToSection = (sectionId, headerOffset = 70) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export const generateResourceId = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .substring(0, 20)
}
