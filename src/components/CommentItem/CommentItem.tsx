import React, { FC, useCallback } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'

// import { Comment } from '../../store/types'
// import { removeComment } from '../../store/actions'
// import { getUser } from '../../store/selectors'
import './CommentItem.css'

interface ICommentProps {
  cmt: Comment
  postId: string
}

export const CommentItem: FC<ICommentProps> = ({ cmt, postId }) => {
  // const user = useSelector(getUser)
  const dispatch = useDispatch()
  // const avatar = cmt.author.trim().toUpperCase().split('').slice(0, 2)

  // const deleteComment = useCallback(() => {
  //   const commentId = cmt._id
  //   dispatch(removeComment({ commentId, postId }))
  // }, [cmt._id, dispatch, postId])

  return (
    <div className="comment">
      <div className="comment-container">
        <div className="comment-avatar">ad</div>
        {/*<div className="comment-text">{cmt.comment}</div>*/}
      </div>
      <div className="comment-date">
        {/*<Moment date={cmt.createdAt} format="D MMM YYYY" />*/}
        {/*{user?.username === cmt.author && (*/}
          <button className="comment-delete">
            delete
          </button>
        {/*)}*/}
      </div>
    </div>
  )
}
