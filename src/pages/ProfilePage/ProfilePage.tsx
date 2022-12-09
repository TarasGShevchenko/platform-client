import React, { FC, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

import { selectedUserSelector, tokenSelector } from '../../store/selectors'
import { PostApi, UserApi } from '../../api'
import { Loader } from '../../components/Loader'
import { PostItem } from '../../components/PostItem'
import { Profile } from '../../components/Profile'

import './ProfilePage.css'

export const ProfilePage: FC = () => {
  const token = useSelector(tokenSelector)
  const selectedUser = useSelector(selectedUserSelector)

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: reloadUser,
  } = useQuery('user', () => UserApi.getUserByUsername(selectedUser.username, token).then((res) => res))

  const {
    data: userPosts,
    isLoading: isLoadingPosts,
    refetch: reloadPosts,
  } = useQuery('userPosts', () => PostApi.getUserPosts(selectedUser.id.toString(), token).then((res) => res))

  useEffect(() => {
    reloadUser()
    reloadPosts()
  }, [reloadPosts, reloadUser, selectedUser])

  const posts = useMemo(
    () => userPosts && userPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [userPosts],
  )
  return (
    <>
      {isLoadingUser || !user ? <Loader /> : <Profile user={user} reloadUser={reloadUser} reloadPosts={reloadPosts} />}
      {isLoadingPosts || !posts ? (
        <Loader />
      ) : (
        posts.map((post, idx) => <PostItem post={post} reloadPosts={reloadPosts} key={idx} />)
      )}
    </>
  )
}
