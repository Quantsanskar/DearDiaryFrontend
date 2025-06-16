"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Layout from "../../components/Layout"
import DiaryView from "../../components/DiaryView"
import { authService } from "../../services/authService"
import { diaryService } from "../../services/diaryService"
import toast from "react-hot-toast"

export default function DiaryPage() {
  const [user, setUser] = useState(null)
  const [diary, setDiary] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  useEffect(() => {
    if (id) {
      loadUserAndDiary()
    }
  }, [id])

  const loadUserAndDiary = async () => {
    if (!id) return

    try {
      const userData = await authService.getProfile()
      setUser(userData)

      const diariesData = await diaryService.getDiaries()
      const selectedDiary = diariesData.find((d) => d.id === Number.parseInt(id))

      if (!selectedDiary) {
        toast.error("Diary not found")
        router.push("/")
        return
      }

      setDiary(selectedDiary)
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

  const handleBack = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading diary...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!id) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  if (!diary) {
    return (
      <Layout user={user} onLogout={handleLogout}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-500">📔</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Diary not found</h2>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DiaryView diary={diary} user={user} onBack={handleBack} />
        </div>
      </div>
    </Layout>
  )
}
