export type LogoutParams = {
  refreshToken: string
}

export interface Logout {
  logout: (params: LogoutParams) => Promise<void>
}
