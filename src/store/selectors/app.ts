import { RootState } from '../types'

export const usersFilterSelector = (state: RootState): string => state.app.usersFilter
