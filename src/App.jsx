import GalleryHeader from './components/GalleryHeader'
import Gallery from './components/Gallery'
import useDocumentTitle from './hooks/useDocumentTitle'

function App() {
  useDocumentTitle('Photo Gallery | Celebrare')

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <GalleryHeader />
      <Gallery />
    </main>
  )
}

export default App
