import { combineEpics } from 'redux-observable'

import auth from './auth'
import users from './users'
import posts from './posts'

export const rootEpics = combineEpics(...auth, ...users, ...posts)
