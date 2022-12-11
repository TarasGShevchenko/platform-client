import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { styled } from '@mui/material'

import { PostItem } from '../../components/PostItem'
import { Loader } from '../../components/Loader'
import { PostApi } from '../../api'

const MainContainer = styled('div')(() => ({
  margin: 'auto',
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'column',
}))

const MainNoPosts = styled('div')(() => ({
  color: 'white',
  textAlign: 'center',
  padding: 10,
}))

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
  if (!posts) return <MainNoPosts>No posts.</MainNoPosts>

  return (
    <MainContainer>
      {posts.map((post, idx) => (
        <PostItem post={post} main={true} key={idx} reloadPosts={refetch} />
      ))}
    </MainContainer>
  )
}
