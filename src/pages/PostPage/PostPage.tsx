import React, { ChangeEvent } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCurrentPostRequest } from '../../store/actions'
import { getCurrentPost, tokenSelector } from '../../store/selectors'
import './PostPage.css'
import { PostApi } from '../../api'

export const PostPage = () => {
  const [comment, setComment] = useState('')

  const token = useSelector(tokenSelector)
  const post = useSelector(getCurrentPost)
  // const comments = useSelector(getComments)
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const removePostHandler = useCallback(async () => {
    id && (await PostApi.deletePost(id, token))
    // id && dispatch(deleteCurrentPostRequest({ id }))
    toast('Post was deleted')
    navigate('/posts')
  }, [id, navigate, token])

  // const handleSubmit = useCallback(() => {
  //   try {
  //     const postId = id
  // const author = user?.username
  // author && postId && dispatch(createCommentRequest({ author, postId, comment }))
  // setComment('')
  // } catch (error) {
  //   console.log(error)
  // }
  // }, [comment, dispatch, id, user])

  const backToHome = useCallback(() => navigate('/'), [navigate])
  const goToEdit = useCallback(() => navigate(`/posts/${id}/edit`), [id, navigate])
  const typingComment = useCallback((e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value), [])

  useEffect(() => {
    id && dispatch(getCurrentPostRequest({ id }))
  }, [dispatch, id])

  // useEffect(() => {
  //   id && dispatch(getPostCommentsRequest(id))
  // }, [dispatch, id])

  if (!post) {
    return <div className="post-loading">Loading...</div>
  }
  return (
    <div>
      <button className="post-button-back" onClick={backToHome}>
        Back
      </button>

      <div className="post-container">
        <div className="post-wrapper">
          <div className="post-wrapper-photo-container">
            <div className={post.image ? 'post-wrapper-photo' : 'post-wrapper-photo empty'}>
              {post.image && <img src={`http://localhost:8000/${post.image}`} alt="img" className="post-wrapper-img" />}
            </div>
          </div>
          <div className="post-wrapper-info">
            <div className="post-wrapper-username">{post.author.username}</div>
            <div className="post-wrapper-date">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="post-wrapper-title">{post.title}</div>
          <p className="post-wrapper-text">{post.content}</p>
          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="post-wrapper-icons">
              <button className="post-wrapper-icons-button">{/*<AiFillEye /> <span>{post.views}</span>*/}</button>
              <button className="post-wrapper-icons-button">
                {/*<AiOutlineMessage /> <span>{post.comments?.length || 0} </span>*/}
              </button>
            </div>
            {/*{user?._id === post.author && (*/}
            <div className="post-wrapper-user-icons">
              <button className="post-wrapper-user-icons-button" onClick={goToEdit}>
                <AiTwotoneEdit />
              </button>
              <button className="post-wrapper-user-icons-button" onClick={removePostHandler}>
                <AiFillDelete />
              </button>
            </div>
            {/*)}*/}
          </div>
        </div>
        <div className="post-comment-container">
          <form className="post-comment-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={typingComment}
              placeholder="Comment"
              className="post-comment-input"
            />
            <button type="submit" className="post-comment-button">
              Отправить
            </button>
          </form>

          {/*{comments?.map((cmt) => (*/}
          {/*  <CommentItem key={cmt._id} cmt={cmt} postId={post._id} />*/}
          {/*))}*/}
        </div>
      </div>
    </div>
  )
}
