import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'

import { getUsername, tokenSelector } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'

import './ProfilePage.css'
import { useQuery } from 'react-query'
import { UserApi } from '../../api'

export const ProfilePage: FC = () => {
  const username = useSelector(getUsername)
  const token = useSelector(tokenSelector)
  const { data, isLoading } = useQuery('user', () => UserApi.getUserByUsername(username, token))

  if (isLoading || !data) return <div>Loading...</div>
  return (
    <div className="prof-container">
      <Avatar username={data.username} isProfile={true} />
      <h1 className="prof-title">{data.username}</h1>
      <div className="prof-content">
        <div className="prof-row">
          <div>Email: </div>
          <div>{data.email}</div>
        </div>
        <div className="prof-row">
          <div>Role: </div>
          <div>
            {data.roles.map((role) => (
              <div key={role.id}>{role.value}</div>
            ))}
          </div>
        </div>
        <div className="prof-row">
          <div>Posts: </div>
          <div>{data.posts.length}</div>
        </div>
        <div className="prof-row">
          <div>Register date: </div>
          <Moment date={data.createdAt} format="D MMM YYYY" />
        </div>
      </div>
    </div>
  )
}
