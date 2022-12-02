import React, { ChangeEvent, useCallback, useState, useEffect, FormEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'

import { CommentItem } from '../../components/CommentItem'
import { getCurrentPostRequest } from '../../store/actions'
import { getCurrentPost, getUser, tokenSelector } from '../../store/selectors'
import './PostPage.css'
import { CommentsApi, PostApi } from '../../api'
import { Loader } from '../../components/Loader'

export const PostPage = () => {
  const [comment, setComment] = useState('')
  const token = useSelector(tokenSelector)
  const post = useSelector(getCurrentPost)
  const user = useSelector(getUser)
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery('comments', () => post && CommentsApi.getPostComments(post.id.toString(), token).then((res) => res))

  const removePostHandler = useCallback(async () => {
    id && (await PostApi.deletePost(id, token))
    toast('Post was deleted')
    navigate('/posts')
  }, [id, navigate, token])

  const addCommentHandler = useCallback(async () => {
    if (id && post && user) {
      try {
        const data = new FormData()
        data.append('content', comment)
        data.append('userId', user.id.toString())
        data.append('postId', id)

        await CommentsApi.createComment(data, token)
        refetch()
      } catch (error) {
        console.log(error)
      }
    }
  }, [comment, id, post, refetch, token, user])

  const goToEdit = useCallback(() => navigate(`/posts/${id}/edit`), [id, navigate])
  const typingComment = useCallback((e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value), [])

  useEffect(() => {
    id && dispatch(getCurrentPostRequest({ id }))
  }, [dispatch, id])

  if (!post) return <Loader />

  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-wrapper-photo-container">
          <div className={post.image ? 'post-wrapper-photo' : 'post-wrapper-photo empty'}>
            {post.image && (
              <img src={`${process.env.REACT_APP_API_URL}${post.image}`} alt="img" className="post-wrapper-img" />
            )}
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
          {user?.id === post.author.id && (
            <div className="post-wrapper-user-icons">
              <button className="post-wrapper-user-icons-button" onClick={goToEdit}>
                <AiTwotoneEdit />
              </button>
              <button className="post-wrapper-user-icons-button" onClick={removePostHandler}>
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="post-comment-container">
        <form className="post-comment-form" onSubmit={addCommentHandler}>
          <input
            type="text"
            value={comment}
            onChange={typingComment}
            placeholder="Comment"
            className="post-comment-input"
          />
          <button type="submit" className="post-comment-button">
            Submit
          </button>
        </form>

        {isLoading || !comments ? (
          <Loader />
        ) : (
          comments.map((cmt) => <CommentItem key={cmt.id} comment={cmt} func={refetch} />)
        )}
      </div>
    </div>
  )
}
