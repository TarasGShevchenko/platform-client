import { createAsyncAction } from 'typesafe-actions'
import { IPost } from '../types'

export const {
  request: createPostRequest,
  success: createPostSuccess,
  failure: createPostFailure,
} = createAsyncAction('@@post/createPostRequest', '@@post/createPostSuccess', '@@post/createPostFailure')<
  FormData,
  IPost,
  unknown
>()
