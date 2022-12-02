import React from 'react'
import { useQuery } from 'react-query'

import { PostItem } from '../../components/PostItem'
import { PostApi } from '../../api'

import './mainPage.css'

export const MainPage = () => {
  const { data, isLoading } = useQuery('posts', () => PostApi.getPosts().then((res) => res))

  if (isLoading) return <div className="no-posts">Loading...</div>
  if (!data) return <div className="no-posts">No posts.</div>

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="posts">
          {data.map((post, idx) => (
            <PostItem key={idx} post={post} username={post.author.username} />
          ))}
        </div>
      </div>
    </div>
  )
}
