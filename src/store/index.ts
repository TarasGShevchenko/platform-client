import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from './redusers'
import { createEpicMiddleware } from 'redux-observable'

import { ActionTypes, RootState } from './types'
import { rootEpics } from './epics'
import { UserApi, AuthApi, PostApi } from '../api'

declare global {
  interface Window {
    store: unknown
  }
}

const epicMiddleware = createEpicMiddleware<ActionTypes, ActionTypes, RootState>({
  dependencies: {
    AuthApi,
    UserApi,
    PostApi,
  },
})

const store = createStore(rootReducer, compose(applyMiddleware(epicMiddleware)))

epicMiddleware.run(rootEpics)

export default store
