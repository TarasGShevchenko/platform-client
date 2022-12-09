import { RootState } from '../types'

export const usersFilterSelector = (state: RootState): string => state.app.usersFilter
export const selectedLogoSelector = (state: RootState): string => state.app.selectedLogo
export const selectedBackgroundSelector = (state: RootState): string => state.app.selectedBackground
export const selectedUserSelector = (state: RootState) => state.app.selectedUser
