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
    <div>
      {/* Back Button */}
      <button onClick={onCancel} className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
        <span className="mr-2">←</span>
        Back to Entries
      </button>

      {/* Form Header */}
      <div className="diary-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">✍️ Write New Entry</h2>
        <p className="text-gray-600">Share your thoughts and feelings in {diary.title}</p>
      </div>

      {/* Entry Form */}
      <div className="diary-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Give your entry a title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
            <select name="mood" value={formData.mood} onChange={handleChange} className="input-field">
              <option value="">Select your mood...</option>
              {MOOD_OPTIONS.map((mood) => (
                <option key={mood.value} value={mood.value}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              className="textarea-field"
              placeholder="Write your heart out..."
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
                className="mr-2"
              />
              <label htmlFor="is_timed" className="text-sm text-gray-700">
                🔒 Lock this entry until a specific time
              </label>
            </div>

            {formData.is_timed && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unlock at</label>
                <input
                  type="datetime-local"
                  name="unlock_at"
                  value={formData.unlock_at}
                  onChange={handleChange}
                  className="input-field"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner h-4 w-4 mr-2"></div>
                  Saving...
                </div>
              ) : (
                "Save Entry 💕"
              )}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
