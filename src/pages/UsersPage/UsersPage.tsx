import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'

import { filteredUsers, usersFilterSelector } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'
import { setUsersFilter } from '../../store/actions'

import './UsersPage.css'
import { useNavigate } from 'react-router-dom'

export const UsersPage = () => {
  const users = useSelector(filteredUsers)
  const filter = useSelector(usersFilterSelector)
  const [value, setValue] = useState(filter || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setUsersFilter(e.currentTarget.value))
      setValue(e.currentTarget.value)
    },
    [dispatch],
  )

  const goToThisUser = useCallback(
    (username: string) => {
      navigate(`/profile/${username}`)
    },
    [navigate],
  )

  if (!users) return <div>Loading...</div>
  return (
    <div className="users-container">
      <input
        type="text"
        className="search-input"
        value={value}
        placeholder="Type username..."
        onChange={changeHandle}
      />
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item" onClick={() => goToThisUser(user.username)}>
            <Avatar username={user.username} />
            <div className="user-content">
              <div className="user-username">{user.username}</div>
              <Moment className="user-created" date={user.createdAt} format={'MMM Do YY'} />
            </div>
            <div className="rang">
              <small>#</small>
              {user.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
