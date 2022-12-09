import { createReducer } from 'typesafe-actions'

import { ActionTypes } from '../types'
import { initialize, selectBackgroundAction, selectLogoAction, selectUserAction, setUsersFilter } from '../actions'

export type AppState = {
  loading: boolean
  usersFilter: string
  selectedUser: { id: number; username: string }
  selectedLogo: string
  selectedBackground: string
}

const initialState = {
  loading: false,
  usersFilter: '',
  selectedUser: { id: 0, username: '' },
  selectedLogo: '',
  selectedBackground: '',
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
  .handleAction(selectLogoAction, (state, { payload }) => ({
    ...state,
    selectedLogo: payload,
  }))
  .handleAction(selectBackgroundAction, (state, { payload }) => ({
    ...state,
    selectedBackground: payload,
  }))
  .handleAction(selectUserAction, (state, { payload }) => ({
    ...state,
    selectedUser: payload,
  }))
