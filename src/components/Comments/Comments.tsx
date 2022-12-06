import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getUser, tokenSelector } from '../../store/selectors'
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
  const user = useSelector(getUser)
  const { id } = useParams()
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery('comments', () => (id ? CommentsApi.getPostComments(id, token).then((res) => res) : null))

  const addCommentHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (id && post && user) {
        try {
          const data = new FormData()
          data.append('content', comment)
          data.append('userId', user.id.toString())
          data.append('postId', id)
          await CommentsApi.createComment(data, token)
          await refetch()
          setComment('')
        } catch (error) {
          console.log(error)
        }
      }
    },
    [comment, id, post, refetch, token, user],
  )

  const typingComment = useCallback((e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value), [])

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
          comments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((cmt) => <CommentItem key={cmt.id} comment={cmt} func={refetch} />)
        )}
      </div>
    </div>
  )
}
