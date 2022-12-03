import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

import { PostItem } from '../../components/PostItem'
import { getUser, tokenSelector } from '../../store/selectors'
import { PostApi } from '../../api'

import './PostsPage.css'

export const PostsPage = () => {
  const user = useSelector(getUser)
  const token = useSelector(tokenSelector)
  const { data, isLoading } = useQuery(
    'userPosts',
    () => user && PostApi.getUserPosts(String(user.id), token).then((res) => res),
  )

  if (isLoading) return <div className="post-item-no-posts">Loading...</div>
  if (!data) return <div className="post-item-no-posts">No posts.</div>

  return (
    <div className="posts-container">
      {data
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post, idx) => (
          <PostItem post={post} key={idx} username={user?.username || 'de'} />
        ))}
    </div>
  )
}
