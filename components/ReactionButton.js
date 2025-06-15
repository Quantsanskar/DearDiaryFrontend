"use client"

export default function ReactionButton({ reaction, count, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="reaction-button flex items-center space-x-2 group"
      title={`React with ${reaction.label}`}
    >
      <span className="text-xl group-hover:scale-125 transition-transform">{reaction.emoji}</span>
      {count > 0 && <span className="text-sm text-gray-600">{count}</span>}
    </button>
  )
}
