import { createReducer } from 'typesafe-actions'
import { ActionTypes, IUser } from '../types'
import { getUsersSuccess } from '../actions'

export type UserState = {
  users: IUser[]
}

const initialState = {
  users: [],
}
export const usersReducer = createReducer<UserState, ActionTypes>(initialState).handleAction(
  getUsersSuccess,
  (state, { payload }) => ({
    ...state,
    users: payload,
  }),
)
