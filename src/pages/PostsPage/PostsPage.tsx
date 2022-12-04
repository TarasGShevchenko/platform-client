import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { PostItem } from '../../components/PostItem'
import { Loader } from '../../components/Loader'
import { tokenSelector } from '../../store/selectors'
import { PostApi } from '../../api'

import './PostsPage.css'

export const PostsPage = () => {
  const token = useSelector(tokenSelector)
  const { id } = useParams()
  const {
    data,
    isLoading,
    refetch: reloadPosts,
  } = useQuery('userPosts', () => (id ? PostApi.getUserPosts(id, token).then((res) => res) : null))

  const posts = useMemo(
    () => data && data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [data],
  )

  if (isLoading) return <Loader />
  if (!posts) return <div className="post-item-no-posts">No posts.</div>

  return (
    <div className="posts-container">
      {posts.map((post, idx) => (
        <PostItem post={post} reloadPosts={reloadPosts} key={idx} />
      ))}
    </div>
  )
}
