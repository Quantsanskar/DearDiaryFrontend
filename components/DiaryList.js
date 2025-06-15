"use client"

export default function DiaryList({ diaries, onDiarySelect, user }) {
  const getDiaryIcon = (diary) => {
    if (diary.diary_type === "shared") return "💕"
    if (diary.owner?.username === user.username) return "📔"
    return "💌"
  }

  const getDiaryDescription = (diary) => {
    if (diary.diary_type === "shared") return "Our shared thoughts and feelings - both can write"
    if (diary.owner?.username === user.username) return "Your personal diary - only you can write"
    return `${diary.owner?.display_name || diary.owner?.username}'s diary - read only`
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diaries.map((diary) => (
          <div
            key={diary.id}
            onClick={() => onDiarySelect(diary)}
            className="diary-card p-6 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-4 floating-element">{getDiaryIcon(diary)}</div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">{diary.title}</h3>

              <p className="text-gray-600 text-sm mb-4">{getDiaryDescription(diary)}</p>

              <div className="flex justify-between text-xs text-gray-500">
                <span>{diary.entry_count} entries</span>
                {diary.unread_count > 0 && (
                  <span className="bg-pink-500 text-white px-2 py-1 rounded-full pulse-notification">
                    {diary.unread_count} new
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {diaries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No diaries yet</h3>
          <p className="text-gray-600">Your diaries will appear here once they're created</p>
        </div>
      )}
    </div>
  )
}
