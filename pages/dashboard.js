"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
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
    toast.success("See you soon! 👋")
    router.push("/")
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
            <p className="text-gray-600">Loading your diaries...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Diaries</h1>
          <p className="text-gray-600">Choose a diary to read or write in</p>
        </div>
        <DiaryList diaries={diaries} onDiarySelect={handleDiarySelect} user={user} />
      </div>
    </Layout>
  )
}
