import { createReducer } from 'typesafe-actions'
import { ActionTypes } from '../types'

import { loginUserSuccess, logout, registerUserSuccess } from '../actions'

export type AuthState = {
  loading: boolean
  token: string
}

const initialState = {
  loading: false,
  token: '',
}
export const authReducer = createReducer<AuthState, ActionTypes>(initialState)
  .handleAction(loginUserSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    token: payload.token,
  }))
  .handleAction(registerUserSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    token: payload.token,
  }))
  .handleAction(logout, () => ({
    ...initialState,
  }))
