"use client"

export default function ReactionButton({ reaction, count, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
      title={`React with ${reaction.label}`}
    >
      <span className="text-xl group-hover:scale-110 transition-transform">{reaction.emoji}</span>
      {count > 0 && <span className="text-sm font-medium text-gray-600">{count}</span>}
    </button>
  )
}
