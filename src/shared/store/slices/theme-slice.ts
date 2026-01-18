export type Theme = 'light' | 'dark' | 'system'

export interface ThemeSlice {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const createThemeSlice = (
  set: (partial: Partial<ThemeSlice>) => void
): ThemeSlice => ({
  theme: 'system',
  setTheme: (theme: Theme) => set({ theme })
})
