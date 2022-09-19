import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostItem } from '../../components/PostItem'
import { getAllPostsRequest } from '../../store/actions'
import { getPosts } from '../../store/selectors'

import './mainPage.css'

export const MainPage = () => {
  const dispatch = useDispatch()
  const posts = useSelector(getPosts)
  useEffect(() => {
    dispatch(getAllPostsRequest())
  }, [dispatch])

  if (!posts.length) {
    return <div className="no-posts">No posts.</div>
  }

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="posts">
          {posts.map((post, idx) => (
            <PostItem key={idx} post={post} username={post.author.username} />
          ))}
        </div>
      </div>
    </div>
  )
}
