import { createReducer } from 'typesafe-actions'

import { ActionTypes } from '../types'
import { initialize, selectBackgroundAction, selectLogoAction, setUsersFilter } from '../actions'

export type AppState = {
  loading: boolean
  usersFilter: string
  selectedLogo: string
  selectedBackground: string
}

const initialState = {
  loading: false,
  usersFilter: '',
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
