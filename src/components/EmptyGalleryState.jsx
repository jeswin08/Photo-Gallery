function EmptyGalleryState() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-6 py-16 lg:px-8">
      <div className="w-full rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm sm:px-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl" aria-hidden="true">
          📷
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Welcome
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Your memories, beautifully collected.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
          This is the starting point for your photo gallery. Your collection will appear here soon.
        </p>
      </div>
    </section>
  )
}

export default EmptyGalleryState
