import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'

import { filteredUsers, usersFilterSelector } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'
import { selectUserAction, setUsersFilter } from '../../store/actions'

import './UsersPage.css'

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
    (event: React.MouseEvent<HTMLDivElement>) => {
      const id = event.currentTarget.dataset.id
      const username = event.currentTarget.dataset.username
      id && username && dispatch(selectUserAction({ id: +id, username }))
      navigate(`/profile/${username}`)
    },
    [dispatch, navigate],
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
          <div
            key={user.id}
            className="user-item"
            onClick={goToThisUser}
            data-id={user.id}
            data-username={user.username}
          >
            <Avatar
              id={user.id}
              avatarLogo={user.avatarLogo}
              avatarBackground={user.avatarBackground}
              username={user.username}
            />
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
