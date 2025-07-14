// src/data/methodology.js
// Données de la méthodologie pédagogique

export const methodologyItems = [
  {
    id: 1,
    iconClass: 'fas fa-heart',
    key: 'passion',
    color: '#e74c3c'
  },
  {
    id: 2,
    iconClass: 'fas fa-ear-listen',
    key: 'listening',
    color: '#3498db'
  },
  {
    id: 3,
    iconClass: 'fas fa-users',
    key: 'collaboration',
    color: '#27ae60'
  }
]

// Fonction utilitaire
export const getMethodologyItemById = (id) => {
  return methodologyItems.find(item => item.id === id)
}

export const getMethodologyItemByKey = (key) => {
  return methodologyItems.find(item => item.key === key)
}