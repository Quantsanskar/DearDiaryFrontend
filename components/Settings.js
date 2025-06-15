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
      toast.success("Profile updated successfully! 💕")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authService.changePassword(passwordData)
      setPasswordData({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
      })
      toast.success("Password changed successfully! 🔒")
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
    <div>
      {/* Back Button */}
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
        <span className="mr-2">←</span>
        Back to Diaries
      </button>

      {/* Settings Header */}
      <div className="diary-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">⚙️ Settings</h2>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="diary-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <input
                type="text"
                name="display_name"
                value={profileData.display_name}
                onChange={handleProfileChange}
                className="input-field"
                placeholder="How should we call you?"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Username</label>
              <input
                type="text"
                name="partner_username"
                value={profileData.partner_username}
                onChange={handleProfileChange}
                className="input-field"
                placeholder="Your partner's username (optional)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Setting a partner username allows you to access each other's personal diaries
              </p>
            </div> */}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="diary-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                required
                className="input-field"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                className="input-field"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="new_password_confirm"
                value={passwordData.new_password_confirm}
                onChange={handlePasswordChange}
                required
                className="input-field"
                placeholder="Confirm your new password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="diary-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Member since:</strong> {new Date(user.date_joined).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
