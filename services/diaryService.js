import api from "./api"

export const diaryService = {
  async getDiaries() {
    try {
      const response = await api.get("/diary/diaries/")
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async getDiaryEntries(diaryId) {
    try {
      const response = await api.get(`/diary/diaries/${diaryId}/entries/`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async createEntry(diaryId, entryData) {
    try {
      const response = await api.post(`/diary/diaries/${diaryId}/entries/create/`, entryData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async getEntryDetail(entryId) {
    try {
      const response = await api.get(`/diary/entries/${entryId}/`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async addReaction(entryId, reactionType) {
    try {
      const response = await api.post(`/diary/entries/${entryId}/react/`, {
        reaction_type: reactionType,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async markEntryRead(entryId) {
    try {
      const response = await api.post(`/diary/entries/${entryId}/read/`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}
