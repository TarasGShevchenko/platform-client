import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'

import { getUser } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'

import './ProfilePage.css'

export const ProfilePage: FC = () => {
  const user = useSelector(getUser)

  if (!user) return <div>Loading...</div>
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
