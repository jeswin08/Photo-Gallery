import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(PHOTOS_URL)

        if (!response.ok) {
          throw new Error('Unable to load photos right now.')
        }

        const photoData = await response.json()
        setPhotos(photoData)
      } catch {
        setError('We could not load the photos. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
