"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import AuthForm from "../components/AuthForm"
import DiaryList from "../components/DiaryList"
import { authService } from "../services/authService"
import { diaryService } from "../services/diaryService"
import toast from "react-hot-toast"

export default function Home() {
  const [user, setUser] = useState(null)
  const [diaries, setDiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
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
      toast.success("Welcome back! 💕")
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
      toast.success("Welcome to our Silent Chat Room! 🌸")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
      throw error
    }
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setDiaries([])
    toast.success("See you soon! 👋")
  }

  const handleDiarySelect = (diary) => {
    router.push(`/diary/${diary.id}`)
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {user ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {user.display_name || user.username}! 💕
            </h1>
            <p className="text-gray-600">Choose a diary to read or write in</p>
          </div>
          <DiaryList diaries={diaries} onDiarySelect={handleDiarySelect} user={user} />
        </div>
      ) : (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </Layout>
  )
}
