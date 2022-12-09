import { createAction, createAsyncAction } from 'typesafe-actions'

import { UserSuccess } from '../types'

export const {
  request: loginUserRequest,
  success: loginUserSuccess,
  failure: loginUserFailure,
} = createAsyncAction('LOGIN_USER_REQUEST', 'LOGIN_USER_SUCCESS', 'LOGIN_USER_FAILURE')<
  { username: string; password: string },
  UserSuccess,
  unknown
>()
export const {
  request: registerUserRequest,
  success: registerUserSuccess,
  failure: registerUserFailure,
} = createAsyncAction('REGISTER_USER_REQUEST', 'REGISTER_USER_SUCCESS', 'REGISTER_USER_FAILURE')<
  { username: string; email: string; password: string },
  UserSuccess,
  unknown
>()
export const logout = createAction('@@auth/logout')()
