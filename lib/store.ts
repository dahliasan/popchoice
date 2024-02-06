import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { movieResultsSchema } from '@/types/FormTypes'
import { z } from 'zod'

type Results = z.infer<typeof movieResultsSchema>
type State = {
  results: Results
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
