"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
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
  const { id } = router.query

  useEffect(() => {
    if (id) {
      loadUserAndDiary()
    }
  }, [id])

  const loadUserAndDiary = async () => {
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
    toast.success("See you soon! 👋")
    router.push("/")
  }

  const handleBack = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading diary...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!diary) {
    return (
      <Layout user={user} onLogout={handleLogout}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Diary not found</h2>
            <button onClick={handleBack} className="btn-primary">
              Go Back Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <DiaryView diary={diary} user={user} onBack={handleBack} />
      </div>
    </Layout>
  )
}
