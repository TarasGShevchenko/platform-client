import { createReducer } from 'typesafe-actions'
import { ActionTypes, IUser } from '../types'

import { loginUserSuccess, logout, registerUserSuccess } from '../actions'

export type AuthState = {
  loading: boolean
  token: string
  me: IUser | null
}

const initialState = {
  loading: false,
  token: '',
  me: null,
}
export const authReducer = createReducer<AuthState, ActionTypes>(initialState)
  .handleAction(loginUserSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    token: payload.token,
    me: payload.user,
  }))
  .handleAction(registerUserSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    token: payload.token,
    me: payload.user,
  }))
  .handleAction(logout, () => ({
    ...initialState,
  }))
