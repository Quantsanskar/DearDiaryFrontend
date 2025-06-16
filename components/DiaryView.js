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
    toast.success("Entry created successfully")
  }

  const handleCancelEntry = () => {
    setShowEntryForm(false)
  }

  const canWrite = () => {
    if (diary.diary_type === "shared") return true
    if (diary.diary_type === "personal") return true
    return false
  }

  if (showEntryForm) {
    return <EntryForm diary={diary} user={user} onSave={handleEntryCreated} onCancel={handleCancelEntry} />
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
        Back to Diaries
      </button>

      {/* Diary Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{diary.title}</h1>
            <p className="text-gray-600">
              {diary.diary_type === "shared"
                ? "Shared diary - collaborative writing space"
                : diary.owner?.username === user.username
                  ? "Your personal diary"
                  : `${diary.owner?.display_name || diary.owner?.username}'s diary`}
            </p>
          </div>

          {canWrite() && (
            <button
              onClick={handleNewEntry}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Entry</span>
            </button>
          )}
        </div>
      </div>

      {/* Entries */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading entries...</p>
        </div>
      ) : (
        <EntryList entries={entries} user={user} onEntriesUpdate={loadEntries} />
      )}
    </div>
  )
}
