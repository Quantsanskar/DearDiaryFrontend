"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "../components/Layout"
import Settings from "../components/Settings"
import { authService } from "../services/authService"
import toast from "react-hot-toast"

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await authService.getProfile()
      setUser(userData)
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
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Settings user={user} onBack={handleBack} />
        </div>
      </div>
    </Layout>
  )
}
