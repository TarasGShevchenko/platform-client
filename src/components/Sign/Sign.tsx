import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { styled } from '@mui/material'

import { logout } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import { Link } from '../../enums'

const SignContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  color: '#fff',
  marginLeft: 50,
  padding: 10,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}))

const SignAction = styled('div')(({ theme }) => ({
  fontSize: '1.5em',
  opacity: 0.5,
  transition: '0.5s',
  padding: 12,
  cursor: 'pointer',
  ['&:hover']: {
    color: '#5da6ff',
    opacity: 1,
    textShadow: '#5da6ff',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}))

export const Sign = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)
  const handleLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const handleLogout = useCallback(() => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Logout')
    navigate(Link.login)
  }, [dispatch, navigate])
  return (
    <SignContainer>
      {isAuth ? (
        <SignAction onClick={handleLogout}>
          <BiLogOut />
        </SignAction>
      ) : (
        <SignAction onClick={handleLogin}>
          <BiLogIn />
        </SignAction>
      )}
    </SignContainer>
  )
}
