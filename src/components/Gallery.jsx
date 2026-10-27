import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import favoritesReducer, { initialFavorites } from '../reducers/favoritesReducer'

function LoadingSpinner() {
  return (
    <div className="flex min-h-[calc(100vh-81px)] flex-col items-center justify-center gap-4 px-6">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-amber-100 border-t-amber-600"
        role="status"
        aria-label="Loading photos"
      />
      <p className="text-sm font-medium text-stone-600">Loading photos...</p>
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-6 py-16 lg:px-8">
      <div
        className="w-full rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center"
        role="alert"
      >
        <h1 className="text-2xl font-semibold text-red-900">Photos unavailable</h1>
        <p className="mt-3 text-red-700">{message}</p>
      </div>
    </div>
  )
}

function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <p className="truncate text-sm font-medium text-stone-700">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl transition focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 ${
            isFavorite
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              : 'text-stone-500 hover:bg-rose-50 hover:text-rose-500'
          }`}
          aria-label={isFavorite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavorite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 8.61a5.5 5.5 0 0 0-7.78-7.78L12 1.89l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-12.62Z"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchQuery, setSearchQuery] = useState('')
  const [favoriteIds, dispatchFavorites] = useReducer(
    favoritesReducer,
    undefined,
    initialFavorites,
  )

  useEffect(() => {
    localStorage.setItem('celebrare-favorites', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return photos
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery),
    )
  }, [photos, searchQuery])

  const handleFavoriteToggle = useCallback(
    (photoId) => {
      dispatchFavorites({
        type: favoriteIds.includes(photoId) ? 'remove' : 'add',
        photoId,
      })
    },
    [favoriteIds],
  )

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Collection
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Explore the gallery
        </h1>
      </div>
      <label className="mb-8 block max-w-xl">
        <span className="mb-2 block text-sm font-medium text-stone-700">
          Search by author
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter an author name"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </label>
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favoriteIds.includes(photo.id)}
              onToggleFavorite={handleFavoriteToggle}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-stone-600">
          No photos found.
        </p>
      )}
    </section>
  )
}

export default Gallery
