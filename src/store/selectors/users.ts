import { createSelector } from 'reselect'
import { escapeRegExp } from 'lodash'

import { RootState, IUser } from '../types'
import { usersFilterSelector } from './app'

export const getUsersSelector = (state: RootState): IUser[] => state.users.users
export const getUser = (state: RootState): IUser | null => state.users.thisUser
export const getUsername = createSelector(getUser, (user) => (user ? user.username : ''))

export const filteredUsers = createSelector(getUsersSelector, usersFilterSelector, (users, filter) => {
  return users.filter((user) => new RegExp(escapeRegExp(filter.replace('/', '')), 'i').test([user.username].join('|')))
})
