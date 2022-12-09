import { ActionType } from 'typesafe-actions'
import { Epic } from 'redux-observable'

import * as actions from '../actions'
import { UserApi, AuthApi, PostApi } from '../../api'
import { AppState } from '../redusers/app'
import { UserState } from '../redusers/users'
import { AuthState } from '../redusers/auth'

export type UserSuccess = {
  token: string
  user: IUser
}

export type IUser = {
  id: number
  username: string
  email: string
  password: string
  avatarLogo: string
  avatarBackground: string
  banned: boolean
  banReason: string | null
  createdAt: string
  updatedAt: string
  roles: IRole[]
  posts: IPost[]
}

export type IPost = {
  id: number
  title: string
  content: string
  image: string
  author: IUser
  userId: number
  commentCount: number
  createdAt: string
  updatedAt: string
}
export type IComment = {
  id: number
  content: string
  userId: number
  postId: number
  createdAt: string
  updatedAt: string
}

export type IRole = {
  id: number
  value: string
  description: string
  createdAt: string
  updatedAt: string
  UserRoles: IUserRole
}

export type IUserRole = {
  id: number
  roleId: number
  userId: number
}

export type Services = {
  AuthApi: typeof AuthApi
  UserApi: typeof UserApi
  PostApi: typeof PostApi
}

export type RootAction = ActionType<typeof actions>

export type RootState = {
  app: AppState
  users: UserState
  auth: AuthState
}
export type RootEpic = Epic<RootAction, RootAction, RootState, Services>
// Same that RootAction
export type ActionTypes = ActionType<typeof actions>
