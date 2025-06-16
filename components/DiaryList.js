"use client"

export default function DiaryList({ diaries, onDiarySelect, user }) {
  const getDiaryIcon = (diary) => {
    if (diary.diary_type === "shared") return "👥"
    if (diary.owner?.username === user.username) return "📝"
    return "👁️"
  }

  const getDiaryDescription = (diary) => {
    if (diary.diary_type === "shared") return "Shared diary - collaborative writing"
    if (diary.owner?.username === user.username) return "Personal diary - private entries"
    return `${diary.owner?.display_name || diary.owner?.username}'s diary - read only`
  }

  const getDiaryTypeColor = (diary) => {
    if (diary.diary_type === "shared") return "bg-blue-900/30 border-blue-700/50 hover:border-blue-600"
    if (diary.owner?.username === user.username) return "bg-gray-800/50 border-gray-700 hover:border-gray-600"
    return "bg-gray-800/30 border-gray-700 hover:border-gray-600"
  }

  if (diaries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-4xl text-gray-400">📚</span>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">No diaries yet</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Your diaries will appear here once they're created. Start your journaling journey today.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Create Your First Diary
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diaries.map((diary) => (
          <div
            key={diary.id}
            onClick={() => onDiarySelect(diary)}
            className={`${getDiaryTypeColor(diary)} border-2 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm`}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-6 bg-gray-700/50 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-3xl">{getDiaryIcon(diary)}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {diary.title}
              </h3>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{getDiaryDescription(diary)}</p>

              <div className="flex justify-between items-center text-xs">
                <span className="bg-gray-700/50 text-gray-300 px-3 py-2 rounded-full font-medium">
                  {diary.entry_count} entries
                </span>
                {diary.unread_count > 0 && (
                  <span className="bg-blue-600 text-white px-3 py-2 rounded-full font-medium animate-pulse">
                    {diary.unread_count} new
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
