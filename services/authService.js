import api from "./api"
import Cookies from "js-cookie"

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post("/auth/login/", credentials)
      const { access, refresh, user } = response.data

      // Store tokens in cookies
      Cookies.set("access_token", access, { expires: 1 })
      Cookies.set("refresh_token", refresh, { expires: 7 })

      return { user, access, refresh }
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async register(userData) {
    try {
      const response = await api.post("/auth/register/", userData)
      const { access, refresh, user } = response.data

      // Store tokens in cookies
      Cookies.set("access_token", access, { expires: 1 })
      Cookies.set("refresh_token", refresh, { expires: 7 })

      return { user, access, refresh }
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async getProfile() {
    try {
      const response = await api.get("/auth/profile/")
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put("/auth/profile/update/", profileData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await api.post("/auth/change-password/", passwordData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout() {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
  },

  isAuthenticated() {
    return !!Cookies.get("access_token")
  },
}
