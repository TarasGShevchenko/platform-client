import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { styled } from '@mui/material'

import { filteredUsers, usersFilterSelector } from '../../store/selectors'
import { Avatar } from '../../components/Avatar'
import { selectUserAction, setUsersFilter } from '../../store/actions'
import { Loader } from '../../components/Loader'

const UsersContainer = styled('div')(() => ({
  margin: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: 700,
  minWidth: 320,
  minHeight: 400,
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  zIndex: 10,
  backdropFilter: 'blur(25px)',
}))
const SearchInput = styled('input')(() => ({
  margin: 16,
  maxWidth: 350,
  minHeight: 50,
  padding: '10px 10px',
  fontSize: 18,
}))
const UsersList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  overflow: 'scroll',
  margin: 20,
  padding: '20px 0',
}))
const UserItem = styled('div')(() => ({
  cursor: 'pointer',
  width: '80%',
  minHeight: 60,
  position: 'relative',
  display: 'flex',
  padding: 10,
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: 10,
  margin: '10px 0',
  transition: '0.5s',
  overflow: 'hidden',
  ['&:hover']: {
    color: '#333',
    background: '#fff',
    boxShadow: '-15px 30px 10px rgba(0, 0, 0, 0.5)',
    transform: 'scale(1.05) translateX(10px) translateY(-10px)',
    zIndex: 1000,
  },
  ['&:hover span']: {
    right: 20,
  },
  ['&:hover div']: {
    color: '#333',
  },
}))

const UserContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: '#fff',
}))

const UserUsername = styled('div')(() => ({
  lineHeight: '1.2rem',
  fontWeight: 600,
  transition: '0.5s',
}))
const UserCreated = styled(Moment)(() => ({
  fontSize: '0.65rem',
  transition: '0.5s',
}))

const UserId = styled('span')(() => ({
  position: 'absolute',
  right: -50,
  color: '#03a9f4',
  transition: '0.5s',
  fontSize: '1.5rem',
  fontWeight: 700,
}))

const UserIdNum = styled('small')(() => ({
  opacity: 0.25,
  fontWeight: 700,
}))

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

  if (!users) return <Loader />
  return (
    <UsersContainer>
      <SearchInput type="text" value={value} placeholder="Type username..." onChange={changeHandle} />
      <UsersList>
        {users.map((user) => (
          <UserItem key={user.id} onClick={goToThisUser} data-id={user.id} data-username={user.username}>
            <Avatar
              id={user.id}
              avatarLogo={user.avatarLogo}
              avatarBackground={user.avatarBackground}
              username={user.username}
            />
            <UserContent>
              <UserUsername>{user.username}</UserUsername>
              <UserCreated date={user.createdAt} format={'MMM Do YY'} />
            </UserContent>
            <UserId>
              <UserIdNum>#</UserIdNum>
              {user.id}
            </UserId>
          </UserItem>
        ))}
      </UsersList>
    </UsersContainer>
  )
}
