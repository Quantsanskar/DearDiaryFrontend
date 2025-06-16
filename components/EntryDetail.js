"use client"

import { useState, useEffect } from "react"
import ReactionButton from "./ReactionButton"
import { diaryService } from "../services/diaryService"
import { formatDate } from "../utils/dateUtils"
import { REACTION_TYPES } from "../utils/constants"
import toast from "react-hot-toast"

export default function EntryDetail({ entry, user, onBack }) {
  const [entryData, setEntryData] = useState(entry)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    markAsRead()
  }, [entry.id])

  const markAsRead = async () => {
    try {
      await diaryService.markEntryRead(entry.id)
    } catch (error) {
      console.error("Failed to mark entry as read:", error)
    }
  }

  const handleReaction = async (reactionType) => {
    setLoading(true)
    try {
      await diaryService.addReaction(entry.id, reactionType)

      const updatedEntry = await diaryService.getEntryDetail(entry.id)
      setEntryData(updatedEntry)

      toast.success("Reaction added")
    } catch (error) {
      toast.error("Failed to add reaction")
    } finally {
      setLoading(false)
    }
  }

  const getMoodEmoji = (mood) => {
    const moodMap = {
      happy: "😊",
      love: "💙",
      excited: "⚡",
      peaceful: "🌊",
      thoughtful: "💭",
      grateful: "🙏",
      nostalgic: "📸",
      hopeful: "⭐",
      missing: "💫",
      dreamy: "☁️",
    }
    return moodMap[mood] || "💭"
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
        Back to Entries
      </button>

      {/* Entry Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Entry Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="font-medium text-gray-600">
                  {(entryData.author_name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-lg font-medium text-gray-900">{entryData.author_name || "Anonymous"}</span>
                {entryData.mood && <span className="ml-3 text-2xl">{getMoodEmoji(entryData.mood)}</span>}
              </div>
            </div>
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              {formatDate(entryData.created_at)}
            </span>
          </div>

          {entryData.title && <h1 className="text-2xl font-bold text-gray-900">{entryData.title}</h1>}
        </div>

        {/* Entry Content */}
        <div className="p-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">{entryData.content}</p>
          </div>
        </div>

        {/* Reactions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reactions</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {REACTION_TYPES.map((reaction) => (
              <ReactionButton
                key={reaction.type}
                reaction={reaction}
                count={entryData.reaction_counts?.[reaction.type] || 0}
                onClick={() => handleReaction(reaction.type)}
                disabled={loading}
              />
            ))}
          </div>

          {/* Existing Reactions */}
          {entryData.reactions && entryData.reactions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Recent reactions:</h4>
              <div className="flex flex-wrap gap-2">
                {entryData.reactions.map((reaction) => (
                  <div
                    key={reaction.id}
                    className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-lg">{reaction.reaction_emoji}</span>
                    <span className="text-gray-700 font-medium">{reaction.user_display_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
