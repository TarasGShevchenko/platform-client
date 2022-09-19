import { createReducer } from 'typesafe-actions'

import { ActionTypes, IPost } from '../types'
import { getAllPostsSuccess, getCurrentPostSuccess, getUserByUsername } from '../actions'

export type PostsState = {
  posts: IPost[]
  myPosts: IPost[]
  currentPost: IPost | null
}

const initialState = {
  posts: [],
  myPosts: [],
  currentPost: null,
}
export const postsReducer = createReducer<PostsState, ActionTypes>(initialState)
  .handleAction(getAllPostsSuccess, (state, { payload }) => ({
    ...state,
    posts: payload,
  }))
  .handleAction(getUserByUsername, (state, { payload }) => ({
    ...state,
    myPosts: payload.posts,
  }))
  .handleAction(getCurrentPostSuccess, (state, { payload }) => ({
    ...state,
    currentPost: payload,
  }))
