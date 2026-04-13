import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IDashboardStore {
  last_team_id: string | null
  setLastTeamId: (teamId: string) => void
  reset: () => void
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
}

export const useDashboardStore = create<IDashboardStore>()(
  persist(
    (set) => ({
      last_team_id: null,
      hasHydrated: false,

      setLastTeamId: (teamId) =>
        set(() => ({
          last_team_id: teamId,
        })),

      reset: () =>
        set(() => ({
          last_team_id: null,
        })),

      setHasHydrated: (value) =>
        set(() => ({
          hasHydrated: value,
        })),
    }),
    {
      name: "dashboard-persistence-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

export const useDashboardHydrated = () => useDashboardStore((state) => state.hasHydrated)
