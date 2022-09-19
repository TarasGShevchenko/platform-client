import { combineReducers } from 'redux'

import { appReducer } from './app'
import { usersReducer } from './users'
import { authReducer } from './auth'
import { postsReducer } from './posts'

export const rootReducer = combineReducers({
  app: appReducer,
  users: usersReducer,
  auth: authReducer,
  posts: postsReducer,
})
