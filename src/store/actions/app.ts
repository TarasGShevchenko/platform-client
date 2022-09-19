import { createAction } from 'typesafe-actions'

export const initialize = createAction('@@app/initialize')<void>()

export const setUsersFilter = createAction('@@app/setUsersFilter')<string>()
