"use client"

import { useState } from "react"
import { diaryService } from "../services/diaryService"
import { MOOD_OPTIONS } from "../utils/constants"
import toast from "react-hot-toast"

export default function EntryForm({ diary, user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: "",
    is_timed: false,
    unlock_at: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const entryData = {
        ...formData,
        unlock_at: formData.is_timed && formData.unlock_at ? formData.unlock_at : null,
      }

      await diaryService.createEntry(diary.id, entryData)
      onSave()
    } catch (error) {
      toast.error("Failed to create entry")
      console.error("Create entry error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onCancel}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Entries
      </button>

      {/* Form Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Entry</h1>
        <p className="text-gray-600">Share your thoughts in {diary.title}</p>
      </div>

      {/* Entry Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Title (Optional)</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Give your entry a title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Current Mood</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select your mood...</option>
              {MOOD_OPTIONS.map((mood) => (
                <option key={mood.value} value={mood.value}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Your Entry</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Write your thoughts here..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_timed"
                name="is_timed"
                checked={formData.is_timed}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_timed" className="ml-3 text-sm text-gray-700">
                Schedule this entry to unlock later
              </label>
            </div>

            {formData.is_timed && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Unlock Date & Time</label>
                <input
                  type="datetime-local"
                  name="unlock_at"
                  value={formData.unlock_at}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                "Save Entry"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
