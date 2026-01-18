export interface SidebarSlice {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export const createSidebarSlice = (
  set: (
    partial:
      | Partial<SidebarSlice>
      | ((state: SidebarSlice) => Partial<SidebarSlice>)
  ) => void
): SidebarSlice => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebarOpen: (isOpen: boolean) => set({ isOpen })
})
