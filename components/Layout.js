"use client"

import Head from "next/head"
import { useRouter } from "next/router"

export default function Layout({ children, user, onLogout }) {
  const router = useRouter()

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleHome = () => {
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>Silent Chat Room - Our Digital Diary</title>
        <meta name="description" content="A calm place where we share our thoughts and feelings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        {/* Header */}
        {user && (
          <header className="glass-effect border-b border-white/30 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleHome}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-2xl">💕</span>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">Silent Chat Room</h1>
                      <p className="text-xs text-gray-600">Welcome back, {user.display_name || user.username}</p>
                    </div>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSettings}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    title="Settings"
                  >
                    <span className="text-lg">⚙️</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-500/20 text-red-700 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center text-gray-500 text-sm">
          <p>Made with 💖 for sharing hearts and thoughts</p>
        </footer>
      </div>
    </>
  )
}
