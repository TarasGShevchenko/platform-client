import React, { FC, useCallback } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'

import { getUser, getUsersSelector, tokenSelector } from '../../store/selectors'
import './CommentItem.css'
import { IComment } from '../../store/types'
import { CommentsApi } from '../../api'
import { Avatar } from '../Avatar'

interface IProps {
  comment: Partial<IComment>
  func: () => void
}
export const CommentItem: FC<IProps> = ({ comment: { id, content, userId, postId, createdAt }, func }) => {
  const user = useSelector(getUser)
  const users = useSelector(getUsersSelector)
  const token = useSelector(tokenSelector)
  const currentUser = users.find((us) => us.id === userId)
  const deleteComment = useCallback(async () => {
    id && (await CommentsApi.deleteComment(id.toString(), token))
    func()
  }, [func, id, token])

  return (
    <div className="comment">
      <div className="comment-container">
        {currentUser && <Avatar username={currentUser?.username} />}
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
