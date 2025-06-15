export const REACTION_TYPES = [
  { type: "heart", emoji: "💖", label: "Heart" },
  { type: "star", emoji: "⭐", label: "Star" },
  { type: "hug", emoji: "🤗", label: "Hug" },
  { type: "smile", emoji: "😊", label: "Smile" },
  { type: "love", emoji: "💕", label: "Love" },
]

export const MOOD_OPTIONS = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "love", emoji: "💕", label: "In Love" },
  { value: "excited", emoji: "🎉", label: "Excited" },
  { value: "peaceful", emoji: "😌", label: "Peaceful" },
  { value: "thoughtful", emoji: "🤔", label: "Thoughtful" },
  { value: "grateful", emoji: "🙏", label: "Grateful" },
  { value: "nostalgic", emoji: "🌅", label: "Nostalgic" },
  { value: "hopeful", emoji: "🌟", label: "Hopeful" },
  { value: "missing", emoji: "💭", label: "Missing You" },
  { value: "dreamy", emoji: "✨", label: "Dreamy" },
]

export const DIARY_TYPES = {
  PERSONAL: "personal",
  SHARED: "shared",
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login/",
    REGISTER: "/auth/register/",
    PROFILE: "/auth/profile/",
    UPDATE_PROFILE: "/auth/profile/update/",
    CHANGE_PASSWORD: "/auth/change-password/",
  },
  DIARY: {
    GET_DIARIES: "/diary/diaries/",
    GET_ENTRIES: (diaryId) => `/diary/diaries/${diaryId}/entries/`,
    CREATE_ENTRY: (diaryId) => `/diary/diaries/${diaryId}/entries/create/`,
    GET_ENTRY: (entryId) => `/diary/entries/${entryId}/`,
    ADD_REACTION: (entryId) => `/diary/entries/${entryId}/react/`,
    MARK_READ: (entryId) => `/diary/entries/${entryId}/read/`,
  },
}
