"use client"

import Head from "next/head"
import { useRouter } from "next/navigation"

export default function Layout({ children, user, onLogout }) {
  const router = useRouter()

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleHome = () => {
    router.push("/")
  }

  const handleDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <>
      <Head>
        <title>Digital Diary - Professional Journal Platform</title>
        <meta name="description" content="A professional platform for personal journaling and shared thoughts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        {user && (
          <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={handleHome}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">Digital Diary</h1>
                    </div>
                  </button>

                  <nav className="hidden md:flex space-x-6">
                    <button
                      onClick={handleDashboard}
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </button>
                  </nav>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300 hidden sm:block">
                    Welcome, {user.display_name || user.username}
                  </span>
                  <button
                    onClick={handleSettings}
                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                    title="Settings"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800/30 border-t border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2024 Digital Diary. A professional platform for personal journaling.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
