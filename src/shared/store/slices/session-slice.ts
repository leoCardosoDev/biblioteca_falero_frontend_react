export interface SessionUser {
  id: string
  name: string
}

export interface Session {
  token: string | null
  user: SessionUser | null
}

export interface SessionSlice {
  session: Session
  setSession: (session: Session) => void
  clearSession: () => void
}

const INITIAL_SESSION: Session = {
  token: null,
  user: null
}

export const createSessionSlice = (
  set: (partial: Partial<SessionSlice>) => void
): SessionSlice => ({
  session: INITIAL_SESSION,
  setSession: (session: Session) => set({ session }),
  clearSession: () => set({ session: INITIAL_SESSION })
})
