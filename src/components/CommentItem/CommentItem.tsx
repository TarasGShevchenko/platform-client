import React, { FC, useCallback } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'

import { getUser, getUsersSelector, tokenSelector } from '../../store/selectors'
import './CommentItem.css'
import { IComment } from '../../store/types'
import { CommentsApi } from '../../api'

export const CommentItem: FC<Partial<IComment>> = ({ id, content, userId, postId, createdAt }) => {
  const user = useSelector(getUser)
  const users = useSelector(getUsersSelector)
  const token = useSelector(tokenSelector)
  const avatar = users
    .find((us) => us.id === userId)
    ?.username.toUpperCase()
    .split('')
    .slice(0, 2)
  const deleteComment = useCallback(
    async (e: any) => {
      e.preventDefault()
      id && (await CommentsApi.deleteComment(id.toString(), token))
    },
    [id, token],
  )

  return (
    <div className="comment">
      <div className="comment-container">
        <div className="comment-avatar">{avatar}</div>
        <div className="comment-text">{content}</div>
      </div>
      <div className="comment-date">
        <Moment date={createdAt} format="D MMM YYYY" />
        {user?.id === userId && (
          <button className="comment-delete" onClick={deleteComment}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}
