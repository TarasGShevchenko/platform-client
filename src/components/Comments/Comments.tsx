import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { styled } from '@mui/material'

import { getMeSelector, tokenSelector } from '../../store/selectors'
import { IPost } from '../../store/types'
import { CommentsApi } from '../../api'
import { Loader } from '../Loader'
import { CommentItem } from '../CommentItem'

const CommentsContainer = styled('div')(() => ({
  width: '100%',
  maxHeight: 320,
  padding: '10px 20px',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
}))

const CommentsForm = styled('form')(() => ({
  display: 'flex',
  gap: 8,
  margin: 10,
}))

const CommentsInput = styled('input')(() => ({
  color: 'black',
  width: '100%',
  borderRadius: 5,
  background: 'rgba(255, 255, 255, 0.5)',
  borderWidth: 1,
  padding: 8,
  outline: 'none',
  ['&::placeholder']: {
    color: 'rgb(55 65 81)',
  },
}))

const CommentsSubmit = styled('button')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgb(75 85 99)',
  color: 'white',
  border: 'none',
  borderRadius: 5,
  padding: '8px 16px',
  cursor: 'pointer',
}))

const CommentsWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
}))

interface IProps {
  post: IPost
}
export const Comments: FC<IProps> = ({ post }) => {
  const [comment, setComment] = useState('')
  const token = useSelector(tokenSelector)
  const me = useSelector(getMeSelector)
  const { data, isLoading, refetch } = useQuery('comments', () =>
    CommentsApi.getPostComments(post.id.toString(), token).then((res) => res),
  )

  const addCommentHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (post && me) {
        try {
          const data = new FormData()
          data.append('content', comment)
          data.append('userId', me.id.toString())
          data.append('postId', post.id.toString())
          await CommentsApi.createComment(data, token)
          await refetch()
          setComment('')
        } catch (error) {
          console.log(error)
        }
      }
    },
    [comment, post, refetch, token, me],
  )

  const typingComment = useCallback((e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value), [])

  const comments = useMemo(
    () => data && data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [data],
  )

  useEffect(() => {
    refetch()
  }, [refetch, post])

  return (
    <CommentsContainer>
      <CommentsForm onSubmit={addCommentHandler}>
        <CommentsInput type="text" value={comment} onChange={typingComment} placeholder="Comment" maxLength={120} />
        <CommentsSubmit type="submit" className="comments-button">
          Submit
        </CommentsSubmit>
      </CommentsForm>

      <CommentsWrapper>
        {isLoading || !comments ? (
          <Loader />
        ) : (
          comments.map((cmt) => <CommentItem key={cmt.id} comment={cmt} func={refetch} />)
        )}
      </CommentsWrapper>
    </CommentsContainer>
  )
}
