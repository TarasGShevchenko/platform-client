import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'

import { PostItem } from '../../components/PostItem'
import { Loader } from '../../components/Loader'
import { PostApi } from '../../api'

import './mainPage.css'

export const MainPage = () => {
  const { data, isLoading, refetch } = useQuery('posts', () => PostApi.getPosts().then((res) => res))

  const posts = useMemo(
    () => data && data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [data],
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return <Loader />
  if (!posts) return <div className="no-posts">No posts.</div>

  return (
    <div className="main-container">
      {posts.map((post, idx) => (
        <PostItem post={post} main={true} key={idx} />
      ))}
    </div>
  )
}
