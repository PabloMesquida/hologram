import { create } from 'zustand'

export const useHologramStore = create((set) => ({
  isAudioPlaying: false,
  setIsAudioPlaying: (isAudioPlaying) => set({ isAudioPlaying })
}))
