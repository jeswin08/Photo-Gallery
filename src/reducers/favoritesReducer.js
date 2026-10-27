export const initialFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem('celebrare-favorites')

    if (!savedFavorites) {
      return []
    }

    const parsedFavorites = JSON.parse(savedFavorites)

    if (!Array.isArray(parsedFavorites)) {
      return []
    }

    return parsedFavorites.filter(
      (photoId, index) =>
        (typeof photoId === 'string' || typeof photoId === 'number') &&
        parsedFavorites.indexOf(photoId) === index,
    )
  } catch {
    return []
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.includes(action.photoId) ? state : [...state, action.photoId]
    case 'remove':
      return state.filter((photoId) => photoId !== action.photoId)
    default:
      return state
  }
}

export default favoritesReducer
