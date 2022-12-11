import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { styled } from '@mui/material'

import { IPost } from '../../store/types'
import { Avatar } from '../Avatar'
import { LikesApi, PostApi } from '../../api'
import { getMeSelector, tokenSelector } from '../../store/selectors'
import { selectUserAction } from '../../store/actions'
import { Link } from '../../enums'

const PostItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(1.5),
  padding: 20,
  minWidth: 320,
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  zIndex: 10,
  backdropFilter: 'blur(25px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}))
const PostItemPhotoContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '25%',
  flexGrow: 1,
}))

const PostItemPhoto = styled('div')<{ image: boolean }>(({ image }) => ({
  display: 'flex',
  borderRadius: 2,
  ...(!image && { height: 0 }),
}))

const PostItemPhotoImg = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
}))

const PostItemInfo = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 8,
}))

const PostItemInfoUser = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const PostItemInfoUsername = styled('div')(({ theme }) => ({
  color: 'white',
  opacity: 50,
  fontSize: 26,
  fontWeight: 700,
  cursor: 'pointer',
  ['&:hover']: {
    textDecoration: 'underline',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}))

const PostLikeContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const PostLike = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1.5em',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}))

const PostLikeCount = styled('span')(({ theme }) => ({
  paddingBottom: 6,
  fontSize: 24,
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}))

const PostDate = styled('div')(({ theme }) => ({
  opacity: 50,
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
  },
}))

const PostItemInner = styled('div')(() => ({
  width: '100%',
  paddingTop: 8,
  color: 'white',
  opacity: 60,
}))

const PostContentTitle = styled('div')(() => ({
  padding: '16px 6px 4px',
  wordBreak: 'break-all',
}))

const PostContentText = styled('div')(() => ({
  padding: '8px 6px',
  wordBreak: 'break-all',
}))

const PostContentSpan = styled('div')(() => ({
  padding: 6,
  fontSize: 14,
}))

const PostItemActions = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}))

const PostView = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'flex-end',
  paddingTop: 8,
  color: 'white',
  fontSize: 12,
  paddingLeft: 20,
  cursor: 'pointer',
  ['&:hover']: {
    color: '#5da6ff',
  },
}))

const PostUserIcons = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'flex-end',
  padding: '5px 20px',
  position: 'absolute',
  right: 20,
}))

const PostIconDelete = styled('button')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  color: 'white',
  transition: '0.5s',
  cursor: 'pointer',
  ['&:hover']: {
    color: '#e91e63',
    boxShadow: '0 0 60px #e91e63',
  },
}))

interface IProps {
  post: IPost
  reloadPosts?: () => void
  postPage?: boolean
  main?: boolean
}

export const PostItem: FC<IProps> = ({
  post: { id, userId, content, image, title, author, commentCount, postLikes, updatedAt },
  reloadPosts,
  postPage,
  main,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const me = useSelector(getMeSelector)
  const token = useSelector(tokenSelector)

  const isLiked = postLikes && postLikes?.some((like) => +like === me?.id)

  const likePost = useCallback(async () => {
    me && (await LikesApi.like(me.id, id, token))
    reloadPosts && reloadPosts()
  }, [id, me, reloadPosts, token])

  const unlikePost = useCallback(async () => {
    me && (await LikesApi.unlike(id, me.id, token))
    reloadPosts && reloadPosts()
  }, [id, me, reloadPosts, token])

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
    <PostItemContainer>
      <PostItemPhotoContainer>
        <PostItemPhoto image={!!image}>
          {image && <PostItemPhotoImg src={`${process.env.REACT_APP_API_URL}${image}`} alt="img" />}
        </PostItemPhoto>
      </PostItemPhotoContainer>
      <PostItemInfo>
        <PostItemInfoUser onClick={goToUserPosts}>
          <Avatar
            id={userId}
            avatarLogo={author.avatarLogo}
            avatarBackground={author.avatarBackground}
            username={author.username}
          />
          <PostItemInfoUsername>{author.username}</PostItemInfoUsername>
        </PostItemInfoUser>
        <PostLikeContainer>
          <PostLike>
            {isLiked ? <AiFillHeart color="#ff1800" onClick={unlikePost} /> : <AiOutlineHeart onClick={likePost} />}
          </PostLike>
          <PostLikeCount>{postLikes?.length || 0}</PostLikeCount>
        </PostLikeContainer>
        <PostDate>
          <Moment date={updatedAt} format="D MMM YYYY" />
          <br />
          <Moment date={updatedAt} format="h:mm a " style={{ fontSize: 12 }} />
        </PostDate>
      </PostItemInfo>
      <PostItemInner>
        <PostContentTitle>
          <PostContentSpan>Title:</PostContentSpan>
          &nbsp;
          {title}
        </PostContentTitle>
        <PostContentText>
          <PostContentSpan>Content:</PostContentSpan>
          &nbsp;
          {content}
        </PostContentText>
      </PostItemInner>
      <PostItemActions>
        {!postPage && <PostView onClick={goToCurrentPost}>View comments...({commentCount || 0})</PostView>}
        {!main && me?.id === author.id && (
          <PostUserIcons>
            <PostIconDelete onClick={removePostHandler}>
              <FaTrash />
            </PostIconDelete>
          </PostUserIcons>
        )}
      </PostItemActions>
    </PostItemContainer>
  )
}
