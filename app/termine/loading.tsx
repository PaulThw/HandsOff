export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
      </div>

      <div className="container py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-secondary rounded-lg p-4">
              <div className="flex gap-4">
                <div className="h-16 w-16 bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-64 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
