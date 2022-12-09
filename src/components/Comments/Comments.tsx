import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

import { getMeSelector, tokenSelector } from '../../store/selectors'
import { IPost } from '../../store/types'
import { CommentsApi } from '../../api'
import { Loader } from '../Loader'
import { CommentItem } from '../CommentItem'

import './Comments.css'

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
    <div className="comments-container">
      <form className="comments-form" onSubmit={addCommentHandler}>
        <input
          type="text"
          value={comment}
          onChange={typingComment}
          placeholder="Comment"
          maxLength={120}
          className="comments-input"
        />
        <button type="submit" className="comments-button">
          Submit
        </button>
      </form>

      <div className="comments-wrapper">
        {isLoading || !comments ? (
          <Loader />
        ) : (
          comments.map((cmt) => <CommentItem key={cmt.id} comment={cmt} func={refetch} />)
        )}
      </div>
    </div>
  )
}
