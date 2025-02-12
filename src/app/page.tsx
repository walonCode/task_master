export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-16 text-center">
          <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mb-8 border border-gray-200">
            ✨ Simplify your workflow today
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Tasks into
            <span className="block text-blue-600 mt-2">Achievable Goals</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
            Join thousands of productive teams who use our platform to track, manage, and complete tasks with unprecedented efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Start Free Trial →
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-200 hover:border-gray-300">
              Schedule Demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}