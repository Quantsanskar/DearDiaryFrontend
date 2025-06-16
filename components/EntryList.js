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
    return content.length > 120 ? content.substring(0, 120) + "..." : content
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

  if (selectedEntry) {
    return <EntryDetail entry={selectedEntry} user={user} onBack={handleBackToList} />
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => handleEntrySelect(entry)}
          className={`bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 ${
            entry.is_unlocked ? "cursor-pointer hover:shadow-md hover:border-blue-300" : "opacity-60"
          } ${!entry.is_read && entry.author_name !== user.display_name ? "ring-2 ring-blue-200 border-blue-300" : ""}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {(entry.author_name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900">{entry.author_name || "Anonymous"}</span>
                {entry.mood && <span className="ml-2 text-lg">{getMoodEmoji(entry.mood)}</span>}
              </div>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              {entry.is_unlocked ? (
                <span>{formatShortDate(entry.created_at)}</span>
              ) : (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Locked</span>
                </div>
              )}
            </div>
          </div>

          {entry.title && <h3 className="font-semibold text-gray-900 mb-3 text-lg">{entry.title}</h3>}

          {entry.is_unlocked ? (
            <p className="text-gray-700 mb-4 leading-relaxed">{getEntryPreview(entry.content)}</p>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500">
                {entry.unlock_at ? `Unlocks ${formatDate(entry.unlock_at)}` : "This entry is locked"}
              </p>
            </div>
          )}

          {entry.is_unlocked && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                {Object.entries(entry.reaction_counts || {}).map(([type, count]) => (
                  <span key={type} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    {type === "heart" && "💙"}
                    {type === "star" && "⭐"}
                    {type === "hug" && "🤗"}
                    {type === "smile" && "😊"}
                    {type === "love" && "💙"}
                    {count}
                  </span>
                ))}
              </div>
              {!entry.is_read && entry.author_name !== user.display_name && (
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">New</span>
              )}
            </div>
          )}
        </div>
      ))}

      {entries.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-400">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No entries yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">Start writing your first entry to begin your diary journey</p>
        </div>
      )}
    </div>
  )
}
