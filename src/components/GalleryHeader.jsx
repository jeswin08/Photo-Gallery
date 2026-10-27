function GalleryHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <a
          href="/"
          className="text-xl font-semibold tracking-tight text-stone-900"
          aria-label="Celebrare Photo Gallery home"
        >
          Celebrare
        </a>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
          Photo Gallery
        </span>
      </div>
    </header>
  )
}

export default GalleryHeader
