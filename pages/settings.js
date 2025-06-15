"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
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
          <div className="loading-spinner h-12 w-12"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Settings user={user} onBack={handleBack} />
      </div>
    </Layout>
  )
}
