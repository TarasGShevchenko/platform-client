import { createAction } from 'typesafe-actions'
import { IUser } from '../types'

export const getUsersSuccess = createAction('@@users/getUsersSuccess')<IUser[]>()
