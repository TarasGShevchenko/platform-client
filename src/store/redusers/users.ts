import { createReducer } from 'typesafe-actions'
import { ActionTypes, IUser } from '../types'
import { getUserByUsername, getUsersSuccess } from '../actions'

export type UserState = {
  loading: boolean
  users: IUser[]
  thisUser: IUser | null
}

const initialState = {
  loading: false,
  users: [],
  thisUser: null,
}
export const usersReducer = createReducer<UserState, ActionTypes>(initialState)
  .handleAction(getUsersSuccess, (state, { payload }) => ({
    ...state,
    loading: true,
    users: payload,
  }))
  .handleAction(getUserByUsername, (state, { payload }) => ({
    ...state,
    thisUser: payload,
  }))
