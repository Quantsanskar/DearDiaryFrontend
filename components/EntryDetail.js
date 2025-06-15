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

      // Refresh entry data to get updated reactions
      const updatedEntry = await diaryService.getEntryDetail(entry.id)
      setEntryData(updatedEntry)

      toast.success("Reaction added! 💕")
    } catch (error) {
      toast.error("Failed to add reaction")
    } finally {
      setLoading(false)
    }
  }

  const getMoodEmoji = (mood) => {
    const moodMap = {
      happy: "😊",
      love: "💕",
      excited: "🎉",
      peaceful: "😌",
      thoughtful: "🤔",
      grateful: "🙏",
      nostalgic: "🌅",
      hopeful: "🌟",
      missing: "💭",
      dreamy: "✨",
    }
    return moodMap[mood] || "💭"
  }

  return (
    <div>
      {/* Back Button */}
      <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
        <span className="mr-2">←</span>
        Back to Entries
      </button>

      {/* Entry Content */}
      <div className="diary-card p-8">
        {/* Entry Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-gray-800">{entryData.author_name || "Anonymous"}</span>
              {entryData.mood && <span className="text-2xl">{getMoodEmoji(entryData.mood)}</span>}
            </div>
            <span className="text-sm text-gray-500">{formatDate(entryData.created_at)}</span>
          </div>

          {entryData.title && <h1 className="text-2xl font-bold text-gray-800 mb-4">{entryData.title}</h1>}
        </div>

        {/* Entry Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entryData.content}</p>
        </div>

        {/* Reactions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">React to this entry</h3>

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
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">Reactions:</h4>
              <div className="flex flex-wrap gap-2">
                {entryData.reactions.map((reaction) => (
                  <div
                    key={reaction.id}
                    className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{reaction.reaction_emoji}</span>
                    <span className="text-gray-600">{reaction.user_display_name}</span>
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
