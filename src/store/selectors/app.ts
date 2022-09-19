import { RootState } from '../types'

// export const initialize = (state: RootState): boolean => state.app.loading
export const usersFilterSelector = (state: RootState): string => state.app.usersFilter
