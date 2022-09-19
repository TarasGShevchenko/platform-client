import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'

import { filteredUsers } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'
import { setUsersFilter } from '../../store/actions'

import './UsersPage.css'

export const UsersPage = () => {
  const [value, setValue] = useState('')
  const users = useSelector(filteredUsers)
  const dispatch = useDispatch()

  const changeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setUsersFilter(e.currentTarget.value))
      setValue(e.currentTarget.value)
    },
    [dispatch],
  )

  if (!users) return <div>Loading...</div>
  return (
    <div className="users-container">
      <input type="text" className="search-input" value={value} placeholder="Type username" onChange={changeHandle} />
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <Avatar username={user.username} />
          <div>{user.username}</div>
          <Moment date={user.createdAt} format={'MMM Do YY'} />
        </div>
      ))}
    </div>
  )
}
