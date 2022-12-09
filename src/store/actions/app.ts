import { createAction } from 'typesafe-actions'

export const initialize = createAction('@@app/initialize')<void>()
export const selectUserAction = createAction('@@app/selectUser')<{ id: number; username: string }>()
export const setUsersFilter = createAction('@@app/setUsersFilter')<string>()
export const selectLogoAction = createAction('@@app/selectLogo')<string>()
export const selectBackgroundAction = createAction('@@app/selectBackground')<string>()
