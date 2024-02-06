import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MovieResult } from '@/types/types'
import { z } from 'zod'

type State = {
  results: MovieResult[]
}

type Action = {
  updateResults: (results: State['results']) => void
}

export const useCompletionStore = create(
  persist<State & Action>(
    (set) => ({
      results: [],
      updateResults: (results: State['results']) => set({ results: results }),
    }),
    {
      name: 'completion-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
