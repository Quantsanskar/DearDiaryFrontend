"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "../components/Layout"
import DiaryList from "../components/DiaryList"
import { authService } from "../services/authService"
import { diaryService } from "../services/diaryService"
import toast from "react-hot-toast"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [diaries, setDiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadUserAndDiaries()
  }, [])

  const loadUserAndDiaries = async () => {
    try {
      const userData = await authService.getProfile()
      setUser(userData)

      const diariesData = await diaryService.getDiaries()
      setDiaries(diariesData)
    } catch (error) {
      toast.error("Please login to continue")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    toast.success("Logged out successfully")
    router.push("/")
  }

  const handleDiarySelect = (diary) => {
    router.push(`/diary/${diary.id}`)
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            {/* Skeleton Loading */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 bg-gray-700 rounded-lg w-64 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-96 mx-auto animate-pulse"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-pulse">
                    <div className="w-14 h-14 bg-gray-700 rounded-xl mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-800 rounded mb-6"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-700 rounded w-20"></div>
                      <div className="h-6 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Your Diaries</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your personal thoughts and shared memories in one secure place
            </p>
          </div>
          <DiaryList diaries={diaries} onDiarySelect={handleDiarySelect} user={user} />
        </div>
      </div>
    </Layout>
  )
}
