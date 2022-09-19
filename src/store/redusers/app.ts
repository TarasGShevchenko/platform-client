import { createReducer } from 'typesafe-actions'

import { ActionTypes } from '../types'
import { initialize, setUsersFilter } from '../actions'

export type AppState = {
  loading: boolean
  usersFilter: string
}

const initialState = {
  loading: false,
  usersFilter: '',
}
export const appReducer = createReducer<AppState, ActionTypes>(initialState)
  .handleAction(initialize, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(setUsersFilter, (state, { payload }) => ({
    ...state,
    usersFilter: payload,
  }))
