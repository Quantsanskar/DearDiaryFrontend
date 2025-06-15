"use client"

import { useState } from "react"
import EntryDetail from "./EntryDetail"
import { formatDate, formatShortDate } from "../utils/dateUtils"

export default function EntryList({ entries, user, onEntriesUpdate }) {
  const [selectedEntry, setSelectedEntry] = useState(null)

  const handleEntrySelect = (entry) => {
    if (entry.is_unlocked) {
      setSelectedEntry(entry)
    }
  }

  const handleBackToList = () => {
    setSelectedEntry(null)
    onEntriesUpdate()
  }

  const getEntryPreview = (content) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content
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

  if (selectedEntry) {
    return <EntryDetail entry={selectedEntry} user={user} onBack={handleBackToList} />
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => handleEntrySelect(entry)}
          className={`entry-card ${entry.is_unlocked ? "cursor-pointer" : "opacity-60"} ${
            !entry.is_read && entry.author_name !== user.display_name ? "ring-2 ring-pink-300" : ""
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{entry.author_name || "Anonymous"}</span>
              {entry.mood && <span className="text-lg">{getMoodEmoji(entry.mood)}</span>}
            </div>
            <div className="text-xs text-gray-500">
              {entry.is_unlocked ? formatShortDate(entry.created_at) : "🔒 Locked"}
            </div>
          </div>

          {entry.title && <h3 className="font-semibold text-gray-800 mb-2">{entry.title}</h3>}

          {entry.is_unlocked ? (
            <p className="text-gray-600 text-sm mb-3">{getEntryPreview(entry.content)}</p>
          ) : (
            <div className="text-center py-4">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-gray-500">
                {entry.unlock_at ? `Unlocks ${formatDate(entry.unlock_at)}` : "This entry is locked"}
              </p>
            </div>
          )}

          {entry.is_unlocked && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {Object.entries(entry.reaction_counts || {}).map(([type, count]) => (
                  <span key={type} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {type === "heart" && "💖"}
                    {type === "star" && "⭐"}
                    {type === "hug" && "🤗"}
                    {type === "smile" && "😊"}
                    {type === "love" && "💕"}
                    {count}
                  </span>
                ))}
              </div>
              {!entry.is_read && entry.author_name !== user.display_name && (
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">New</span>
              )}
            </div>
          )}
        </div>
      ))}

      {entries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No entries yet</h3>
          <p className="text-gray-600">Start writing your first entry to begin your diary journey</p>
        </div>
      )}
    </div>
  )
}
