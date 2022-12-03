import React, { ChangeEvent, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'

import { CommentItem } from '../../components/CommentItem'
import { getUser, tokenSelector } from '../../store/selectors'
import './PostPage.css'
import { CommentsApi, PostApi } from '../../api'
import { Loader } from '../../components/Loader'

export const PostPage = () => {
  const [comment, setComment] = useState('')
  const token = useSelector(tokenSelector)
  const user = useSelector(getUser)
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: post } = useQuery('post', () => (id ? PostApi.getPostById(id, token).then((res) => res) : null))
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery('comments', () => (id ? CommentsApi.getPostComments(id, token).then((res) => res) : null))

  const removePostHandler = useCallback(async () => {
    id && (await PostApi.deletePost(id, token))
    toast('Post was deleted')
    navigate('/posts')
  }, [id, navigate, token])

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
            <Moment date={post.updatedAt} format="D MMM YYYY" />
            <br />
            <Moment date={post.updatedAt} format="h:mm a " style={{ fontSize: 12 }} />
          </div>
        </div>
        <div className="post-wrapper-content">
          <div className="post-wrapper-inner">
            <div className="post-wrapper-title">{post.title}</div>
            <p className="post-wrapper-text">{post.content}</p>
          </div>
          {user?.id === post.author.id && (
            <div className="post-wrapper-user-icons">
              <button className="post-wrapper-user-icons-button" onClick={removePostHandler}>
                <FaTrash />
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
            max={120}
            className="post-comment-input"
          />
          <button type="submit" className="post-comment-button">
            Submit
          </button>
        </form>

        <div className="post-comment-wrapper">
          {isLoading || !comments ? (
            <Loader />
          ) : (
            comments
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((cmt) => <CommentItem key={cmt.id} comment={cmt} func={refetch} />)
          )}
        </div>
      </div>
    </div>
  )
}
