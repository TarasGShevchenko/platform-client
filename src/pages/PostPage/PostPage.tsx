import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { tokenSelector } from '../../store/selectors'
import { PostApi } from '../../api'
import { Loader } from '../../components/Loader'
import { Comments } from '../../components/Comments'
import { PostItem } from '../../components/PostItem'

export const PostPage = () => {
  const token = useSelector(tokenSelector)
  const { id } = useParams()
  const { data: post, refetch } = useQuery('post', () =>
    id ? PostApi.getPostById(id, token).then((res) => res) : null,
  )
  if (!post) return <Loader />

  return (
    <>
      <PostItem post={post} postPage={true} reloadPosts={refetch} />
      <Comments post={post} />
    </>
  )
}
