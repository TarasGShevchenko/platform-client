import { IPost, RootState } from '../types'
import { createSelector } from 'reselect'

// export const getPosts = (state: RootState): IPost[] => state.posts.posts
export const getPosts = createSelector(
  (state: RootState) => state.posts.posts,
  (posts) => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
)
export const getMyPosts = createSelector(
  (state: RootState) => state.posts.myPosts,
  (posts) => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
)
export const getCurrentPost = (state: RootState): IPost | null => state.posts.currentPost
