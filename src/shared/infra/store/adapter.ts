import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { PersistOptions } from 'zustand/middleware'

import {
  createThemeSlice,
  createSidebarSlice,
  createSessionSlice
} from './slices'
import type { ThemeSlice, SidebarSlice, SessionSlice } from './slices'

export type AppState = ThemeSlice & SidebarSlice & SessionSlice

type PersistedState = Pick<AppState, 'theme' | 'session'>

const PERSIST_CONFIG: PersistOptions<AppState, PersistedState> = {
  name: 'app-store',
  partialize: (state) => ({
    theme: state.theme,
    session: state.session
  })
}

const createAppState: StateCreator<
  AppState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  ...createThemeSlice(set),
  ...createSidebarSlice(set),
  ...createSessionSlice(set)
})

export const createAppStore = () =>
  create<AppState>()(
    devtools(persist(createAppState, PERSIST_CONFIG), { name: 'AppStore' })
  )
