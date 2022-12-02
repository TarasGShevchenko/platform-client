import React, { FC } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { IPost } from '../../store/types'
import { Avatar } from '../Avatar'

import './PostItem.css'

type PostItemProps = {
  post: IPost
  username: string
}

export const PostItem: FC<PostItemProps> = ({ post, username }) => {
  if (!post) {
    return <div className="post-item-no-posts">Loading...</div>
  }
  return (
    <Link to={`/posts/${post.id}`} className="post-item-link">
      <div className="post-item-container">
        <div className={post.image ? 'post-item-photo' : 'post-item-photo empty'}>
          {post.image && <img src={`http://localhost:8000/${post.image}`} alt="img" className="post-item-img" />}
        </div>
        <div className="post-item-info">
          <div className="post-item-info-user">
            <Avatar username={username} />
            {username}
          </div>
          <div className="post-item-info-like">
            {/*<div onClick={onLikePost}>{liked ? <FcLike /> : <AiOutlineHeart />}</div>*/}
            {/*&nbsp;{post.likes > 0 && post.likes}*/}
          </div>
          <div className="post-item-info-date">
            <Moment date={post.updatedAt} format="D MMM YYYY" />
            <br />
            <Moment date={post.updatedAt} format="h:mm a " style={{ fontSize: 12 }} />
          </div>
        </div>
        <div className="post-item-title">{post.title}</div>
        <p className="post-item-text">{post.content}</p>

        <div className="post-item-icons">
          <button className="post-item-icons-button">{/*<AiFillEye /> <span>{post.views}</span>*/}</button>
          <button className="post-item-icons-button">
            {/*<AiOutlineMessage /> <span>{post.comments?.length || 0} </span>*/}
          </button>
        </div>
      </div>
    </Link>
  )
}
