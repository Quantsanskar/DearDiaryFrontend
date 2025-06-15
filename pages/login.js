"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import AuthForm from "../components/AuthForm"
import { authService } from "../services/authService"
import toast from "react-hot-toast"

export default function Login() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      await authService.getProfile()
      router.push("/")
    } catch (error) {
      setLoading(false)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      await authService.login(credentials)
      toast.success("Welcome back! 💕")
      router.push("/")
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
      throw error
    }
  }

  const handleRegister = async (userData) => {
    try {
      await authService.register(userData)
      toast.success("Welcome to our Silent Chat Room! 🌸")
      router.push("/")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
      throw error
    }
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
    <Layout>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
    </Layout>
  )
}
