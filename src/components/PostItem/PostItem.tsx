import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'

import { IPost } from '../../store/types'
import { Avatar } from '../Avatar'
import { PostApi } from '../../api'
import { getMeSelector, tokenSelector } from '../../store/selectors'
import { selectUserAction } from '../../store/actions'
import { Link } from '../../enums'

import './PostItem.css'

interface IProps {
  post: IPost
  reloadPosts?: () => void
  postPage?: boolean
  main?: boolean
}

export const PostItem: FC<IProps> = ({
  post: { id, userId, content, image, title, author, commentCount, updatedAt },
  reloadPosts,
  postPage,
  main,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const me = useSelector(getMeSelector)
  const token = useSelector(tokenSelector)

  const goToUserPosts = useCallback(() => {
    navigate(!token ? `${Link.login}` : `${Link.profile}/${author.username}`)
    dispatch(selectUserAction({ id: author.id, username: author.username }))
  }, [author.id, author.username, dispatch, navigate, token])

  const goToCurrentPost = useCallback(() => {
    navigate(!token ? `${Link.login}` : `${Link.posts}/${id}`)
  }, [id, navigate, token])

  const removePostHandler = useCallback(async () => {
    await PostApi.deletePost(id.toString(), token)
    toast('Post was deleted')
    reloadPosts && reloadPosts()
  }, [id, token, reloadPosts])

  return (
    <div className="post-item-container">
      <div className="post-item-wrapper">
        <div className="post-item-wrapper-photo-container">
          <div className={image ? 'post-item-wrapper-photo' : 'post-item-wrapper-photo empty'}>
            {image && (
              <img src={`${process.env.REACT_APP_API_URL}${image}`} alt="img" className="post-item-wrapper-img" />
            )}
          </div>
        </div>
        <div className="post-item-wrapper-info">
          <div className="post-item-wrapper-info-user" onClick={goToUserPosts}>
            <Avatar
              id={userId}
              avatarLogo={author.avatarLogo}
              avatarBackground={author.avatarBackground}
              username={author.username}
            />
            <div className="post-item-wrapper-username">{author.username}</div>
          </div>
          <div className="post-item-wrapper-date">
            <Moment date={updatedAt} format="D MMM YYYY" />
            <br />
            <Moment date={updatedAt} format="h:mm a " style={{ fontSize: 12 }} />
          </div>
        </div>
        <div className="post-item-wrapper-inner">
          <div className="post-item-wrapper-title">
            <div className="post-item-wrapper-span">Title:</div>
            &nbsp;
            {title}
          </div>
          <div className="post-item-wrapper-text">
            <div className="post-item-wrapper-span">Content:</div>
            &nbsp;
            {content}
          </div>
        </div>
        <div className="post-item-wrapper-actions">
          {!postPage && (
            <div className="post-item-wrapper-content-view" onClick={goToCurrentPost}>
              View comments...({commentCount || 0})
            </div>
          )}
          {!main && me?.id === author.id && (
            <div className="post-item-wrapper-user-icons">
              <button className="post-item-wrapper-user-icons-button" onClick={removePostHandler}>
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
