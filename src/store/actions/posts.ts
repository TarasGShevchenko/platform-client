import { createAsyncAction } from 'typesafe-actions'
import { IPost } from '../types'

export const {
  request: getAllPostsRequest,
  success: getAllPostsSuccess,
  failure: getAllPostsFailure,
} = createAsyncAction('@@post/getAllPostsRequest', '@@post/getAllPostsSuccess', '@@post/getAllPostsFailure')<
  void,
  IPost[],
  unknown
>()
export const {
  request: createPostRequest,
  success: createPostSuccess,
  failure: createPostFailure,
} = createAsyncAction('@@post/createPostRequest', '@@post/createPostSuccess', '@@post/createPostFailure')<
  FormData,
  IPost,
  unknown
>()
export const {
  request: getCurrentPostRequest,
  success: getCurrentPostSuccess,
  failure: getCurrentPostFailure,
} = createAsyncAction('@@post/getCurrentPostRequest', '@@post/getCurrentPostSuccess', '@@post/getCurrentPostFailure')<
  { id: string },
  IPost,
  unknown
>()
export const {
  request: deleteCurrentPostRequest,
  success: deleteCurrentPostSuccess,
  failure: deleteCurrentPostFailure,
} = createAsyncAction(
  '@@post/deleteCurrentPostRequest',
  '@@post/deleteCurrentPostSuccess',
  '@@post/deleteCurrentPostFailure',
)<{ id: string }, void, unknown>()
