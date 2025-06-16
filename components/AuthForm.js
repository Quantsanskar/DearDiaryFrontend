"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthForm({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">D</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Digital Diary</h1>
          <p className="text-gray-400">Your personal space for thoughts and memories</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <div className="flex space-x-1 mb-8 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push(isLogin ? "/login" : "/register")}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isLogin ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isLogin ? "Continue to Sign In" : "Continue to Sign Up"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Secure • Private • Beautiful</p>
        </div>
      </div>
    </div>
  )
}
