export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <div className="bg-secondary p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="container py-4">
        <div className="bg-secondary rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2].map((section) => (
            <div key={section}>
              <div className="h-6 w-16 bg-gray-700 rounded mb-3 animate-pulse"></div>
              <div className="bg-secondary rounded-lg divide-y divide-border">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="h-5 w-5 bg-gray-700 rounded mr-3 animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
