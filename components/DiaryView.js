"use client"

import { useState, useEffect } from "react"
import EntryList from "./EntryList"
import EntryForm from "./EntryForm"
import { diaryService } from "../services/diaryService"
import toast from "react-hot-toast"

export default function DiaryView({ diary, user, onBack }) {
  const [entries, setEntries] = useState([])
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEntries()
  }, [diary.id])

  const loadEntries = async () => {
    try {
      const entriesData = await diaryService.getDiaryEntries(diary.id)
      setEntries(entriesData)
    } catch (error) {
      toast.error("Failed to load entries")
    } finally {
      setLoading(false)
    }
  }

  const handleNewEntry = () => {
    setShowEntryForm(true)
  }

  const handleEntryCreated = () => {
    setShowEntryForm(false)
    loadEntries()
    toast.success("Entry created! 💕")
  }

  const handleCancelEntry = () => {
    setShowEntryForm(false)
  }

  const canWrite = () => {
    // User can write in:
    // 1. Their own personal diary
    // 2. Shared diary
    // Cannot write in partner's personal diary
    if (diary.diary_type === "shared") return true
    if (diary.diary_type === "personal" ) return true
    return false
  }

  if (showEntryForm) {
    return <EntryForm diary={diary} user={user} onSave={handleEntryCreated} onCancel={handleCancelEntry} />
  }

  return (
    <div>
      {/* Back Button */}
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
        <span className="mr-2">←</span>
        Back to Diaries
      </button>

      {/* Diary Header */}
      <div className="diary-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{diary.title}</h2>
            <p className="text-gray-600">
              {diary.diary_type === "shared"
                ? "Our shared thoughts and feelings"
                : diary.owner?.username === user.username
                  ? "Your personal diary"
                  : `${diary.owner?.display_name || diary.owner?.username}'s diary`}
            </p>
          </div>

          {canWrite() && (
            <button onClick={handleNewEntry} className="btn-primary">
              ✍️ Write Entry
            </button>
          )}
        </div>
      </div>

      {/* Entries */}
      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading entries...</p>
        </div>
      ) : (
        <EntryList entries={entries} user={user} onEntriesUpdate={loadEntries} />
      )}
    </div>
  )
}
