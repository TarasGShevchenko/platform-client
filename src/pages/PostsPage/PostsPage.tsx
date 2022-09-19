import React from 'react'
import { useSelector } from 'react-redux'

import { PostItem } from '../../components/PostItem'
import { getMyPosts, getUser } from '../../store/selectors'

import './PostsPage.css'

export const PostsPage = () => {
  const posts = useSelector(getMyPosts)
  const user = useSelector(getUser)
  if (!posts && user) {
    return <div className="post-item-no-posts">Loading...</div>
  }
  return (
    <div className="posts-container">
      {posts.map((post, idx) => (
        <PostItem post={post} key={idx} username={user?.username || 'de'} />
      ))}
    </div>
  )
}
