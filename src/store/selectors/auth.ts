import { RootState } from '../types'

export const checkIsAuth = (state: RootState): boolean => Boolean(state.auth.token)
export const tokenSelector = (state: RootState): string => state.auth.token
