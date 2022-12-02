import { filter, switchMap, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { EMPTY } from 'rxjs'
import { toast } from 'react-toastify'

import { RootEpic } from '../types'
import {
  createPostRequest,
  createPostSuccess,
  deleteCurrentPostRequest,
  deleteCurrentPostSuccess,
  getAllPostsRequest,
  getAllPostsSuccess,
  getCurrentPostRequest,
  getCurrentPostSuccess,
} from '../actions'

export const GetAllPostsEpic: RootEpic = (action$, state$, { PostApi }) => {
  return action$.pipe(filter(isActionOf(getAllPostsRequest))).pipe(
    switchMap(async () => {
      const data = await PostApi.getPosts()
      return getAllPostsSuccess(data)
    }),
    catchError((err) => {
      toast.error(err)
      return EMPTY
    }),
  )
}

export const GetPostByIdEpic: RootEpic = (action$, state$, { PostApi }) => {
  return action$.pipe(filter(isActionOf(getCurrentPostRequest))).pipe(
    switchMap(async ({ payload: { id } }) => {
      const data = await PostApi.getPostById(id, state$.value.auth.token)
      return getCurrentPostSuccess(data)
    }),
    catchError((err) => {
      toast.error(err)
      return EMPTY
    }),
  )
}
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

export const DeletePostEpic: RootEpic = (action$, state$, { PostApi }) => {
  return action$.pipe(filter(isActionOf(deleteCurrentPostRequest))).pipe(
    switchMap(async ({ payload: { id } }) => {
      await PostApi.deletePost(id, state$.value.auth.token)
      return deleteCurrentPostSuccess()
    }),
    catchError((err) => {
      toast.error(err)
      return EMPTY
    }),
  )
}

export default [GetAllPostsEpic, GetPostByIdEpic, CreatePostEpic, DeletePostEpic]
