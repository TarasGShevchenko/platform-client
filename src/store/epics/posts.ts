import { filter, switchMap, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { EMPTY } from 'rxjs'
import { toast } from 'react-toastify'

import { RootEpic } from '../types'
import { createPostRequest, createPostSuccess } from '../actions'

export const CreatePostEpic: RootEpic = (action$, state$, { PostApi }) => {
  return action$.pipe(filter(isActionOf(createPostRequest))).pipe(
    switchMap(async ({ payload }) => {
      const data = await PostApi.createPost(payload, state$.value.auth.token)
      return createPostSuccess(data)
    }),
    catchError((err) => {
      toast.error(err)
      return EMPTY
    }),
  )
}

export default [CreatePostEpic]
