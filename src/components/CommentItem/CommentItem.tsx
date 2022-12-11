import React, { FC, useCallback } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material'

import { getMeSelector, getUsersSelector, tokenSelector } from '../../store/selectors'
import { IComment } from '../../store/types'
import { CommentsApi } from '../../api'
import { Avatar } from '../Avatar'

const CommentContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 10,
  padding: '5px 20px',
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  backdropFilter: 'blur(25px)',
}))

const CommentWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}))

const CommentContent = styled('div')(() => ({
  display: 'flex',
  color: 'rgb(209 213 219)',
  wordBreak: 'break-all',
  width: 450,
  fontSize: 14,
}))

const CommentDate = styled('div')(() => ({
  display: 'flex',
  color: 'gray',
  fontSize: 10,
  flexDirection: 'column',
  alignItems: 'flex-end',
}))

const CommentDelete = styled('button')(() => ({
  color: 'white',
  fontSize: 10,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}))

interface IProps {
  comment: Partial<IComment>
  func: () => void
}
export const CommentItem: FC<IProps> = ({ comment: { id, content, userId, createdAt }, func }) => {
  const me = useSelector(getMeSelector)
  const users = useSelector(getUsersSelector)
  const token = useSelector(tokenSelector)
  const currentUser = users.find((us) => us.id === userId)
  const deleteComment = useCallback(async () => {
    id && (await CommentsApi.deleteComment(id.toString(), token))
    await func()
  }, [func, id, token])

  return (
    <CommentContainer>
      <CommentWrapper>
        {currentUser && (
          <Avatar
            id={currentUser.id}
            avatarLogo={currentUser.avatarLogo}
            avatarBackground={currentUser.avatarBackground}
            username={currentUser?.username}
          />
        )}
        <CommentContent>{content}</CommentContent>
      </CommentWrapper>
      <CommentDate>
        <Moment date={createdAt} format="D MMM YYYY" />
        {me?.id === userId && <CommentDelete onClick={deleteComment}>delete</CommentDelete>}
      </CommentDate>
    </CommentContainer>
  )
}
