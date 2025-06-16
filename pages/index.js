"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "../components/Layout"
import AuthForm from "../components/AuthForm"
import DiaryList from "../components/DiaryList"
import { authService } from "../services/authService"
import { diaryService } from "../services/diaryService"
import toast from "react-hot-toast"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [diaries, setDiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userData = await authService.getProfile()
      setUser(userData)
      await loadDiaries()
    } catch (error) {
      console.log("Not authenticated")
    } finally {
      setLoading(false)
    }
  }

  const loadDiaries = async () => {
    try {
      const diariesData = await diaryService.getDiaries()
      setDiaries(diariesData)
    } catch (error) {
      toast.error("Failed to load diaries")
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      await loadDiaries()
      toast.success("Welcome back!")
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
      throw error
    }
  }

  const handleRegister = async (userData) => {
    try {
      const response = await authService.register(userData)
      setUser(response.user)
      await loadDiaries()
      toast.success("Welcome to Digital Diary!")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
      throw error
    }
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setDiaries([])
    toast.success("Logged out successfully")
  }

  const handleDiarySelect = (diary) => {
    router.push(`/diary/${diary.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          {/* Modern Loading Animation */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
              {/* Animated ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              {/* Inner dot */}
              <div className="absolute inset-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading text with animation */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">
              Loading your workspace
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {user ? (
        <Layout user={user} onLogout={handleLogout}>
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Welcome Header */}
              <div className="text-center mb-16">
                <div className="inline-block relative group mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <h1 className="relative text-5xl md:text-6xl font-bold text-white px-8 py-4">
                    Welcome back, <span className="text-blue-400">{user.display_name || user.username}</span>
                  </h1>
                </div>
                
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Your personal sanctuary for thoughts and memories. Choose a diary to continue your journey.
                </p>
                
                <div className="mt-8 inline-flex items-center space-x-2 text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Select a diary below to get started</span>
                </div>
              </div>

              {/* Diaries Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8">
                  <DiaryList diaries={diaries} onDiarySelect={handleDiarySelect} user={user} />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  )
}
