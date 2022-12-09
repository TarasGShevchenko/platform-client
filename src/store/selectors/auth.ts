import { IUser, RootState } from '../types'

export const checkIsAuth = (state: RootState): boolean => Boolean(state.auth.token)
export const tokenSelector = (state: RootState): string => state.auth.token
export const getMeSelector = (state: RootState): IUser | null => state.auth.me
