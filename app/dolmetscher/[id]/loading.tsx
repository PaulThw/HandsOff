export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <div className="bg-black sticky top-0 z-10 p-4">
        <div className="h-6 w-6 bg-gray-700 rounded-full animate-pulse"></div>
      </div>

      <div className="relative">
        <div className="h-64 bg-gradient-to-b from-petrol-900/30 to-black flex items-center justify-center">
          <div className="h-40 w-40 rounded-full border-4 border-petrol-500 bg-gray-700 animate-pulse"></div>
        </div>

        <div className="container">
          <div className="text-center mb-6">
            <div className="h-8 w-48 bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <div className="h-6 w-24 bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
