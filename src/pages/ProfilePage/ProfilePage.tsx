import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'

import { getUser, tokenSelector } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'

import './ProfilePage.css'
import { useQuery } from 'react-query'
import { UserApi } from '../../api'
import { useParams } from 'react-router-dom'

export const ProfilePage: FC = () => {
  const { username } = useParams()
  const { data, isLoading } = useQuery('user', () => (username ? UserApi.getUserByUsername(username, token) : null))
  const currentUser = useSelector(getUser)
  const token = useSelector(tokenSelector)
  const user = username ? data : currentUser

  if (isLoading || !user) return <div>Loading...</div>
  return (
    <div className="prof-container">
      <Avatar username={user.username} isProfile={true} />
      <h1 className="prof-title">{user.username}</h1>
      <div className="prof-content">
        <div className="prof-row">
          <div>Email: </div>
          <div>{user.email}</div>
        </div>
        <div className="prof-row">
          <div>Role: </div>
          <div>
            {user.roles.map((role) => (
              <div key={role.id}>{role.value}</div>
            ))}
          </div>
        </div>
        <div className="prof-row">
          <div>Posts: </div>
          <div>{user.posts.length}</div>
        </div>
        <div className="prof-row">
          <div>Register date: </div>
          <Moment date={user.createdAt} format="D MMM YYYY" />
        </div>
      </div>
    </div>
  )
}
