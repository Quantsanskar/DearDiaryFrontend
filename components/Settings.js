"use client"

import { useState } from "react"
import { authService } from "../services/authService"
import toast from "react-hot-toast"

export default function Settings({ user, onBack }) {
  const [profileData, setProfileData] = useState({
    display_name: user.display_name || "",
    partner_username: user.partner_username || "",
  })
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  })
  const [loading, setLoading] = useState(false)

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authService.updateProfile(profileData)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.new_password_confirm) {
      toast.error("New passwords don't match")
      return
    }

    setLoading(true)

    try {
      await authService.changePassword(passwordData)
      setPasswordData({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
      })
      toast.success("Password changed successfully")
    } catch (error) {
      toast.error("Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Settings Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Display Name</label>
              <input
                type="text"
                name="display_name"
                value={profileData.display_name}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="How should we address you?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
              <input
                type="password"
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
              <input
                type="password"
                name="new_password_confirm"
                value={passwordData.new_password_confirm}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
        </div>

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
              <p className="text-gray-900 font-medium">{user.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900 font-medium">{user.email || "Not provided"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
              <p className="text-gray-900 font-medium">
                {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
