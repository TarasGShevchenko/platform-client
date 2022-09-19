import { createAction } from 'typesafe-actions'
import { IUser } from '../types'

// export const getMeRequest = createAction('@@users/getMeRequest')()
export const getUsers = createAction('@@users/getUsers')()
export const getUsersSuccess = createAction('@@users/getUsersSuccess')<IUser[]>()

export const getUserByUsername = createAction('@@users/getUserByEmail')<IUser>()
// export const getUserByEmail = createAction('@@users/getUserByEmail')<IUser>()
