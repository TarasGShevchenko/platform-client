import { createSelector } from 'reselect'
import { escapeRegExp } from 'lodash'

import { RootState, IUser } from '../types'
import { usersFilterSelector } from './app'

export const getUsersSelector = (state: RootState): IUser[] => state.users.users

export const filteredUsers = createSelector(getUsersSelector, usersFilterSelector, (users, filter) => {
  return users.filter((user) => new RegExp(escapeRegExp(filter.replace('/', '')), 'i').test([user.username].join('|')))
})
