import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'

import { loginUserRequest } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import { Link } from '../../enums'

const LoginContainer = styled('form')(() => ({
  width: 400,
  margin: '20px auto',
  padding: 20,
  minWidth: 350,
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  zIndex: 10,
  backdropFilter: 'blur(25px)',
}))

const LoginTitle = styled('h1')(() => ({
  color: 'white',
  textAlign: 'center',
}))

const LoginLabel = styled('label')(() => ({
  color: 'rgb(156 163 175)',
}))

const LoginInput = styled('input')(() => ({
  width: '100%',
  background: 'gray',
  margin: '6px 0',
  borderRadius: 8,
  borderWidth: 1,
  padding: '4px 8px',
  outline: 'none',
  ['&::placeholder']: {
    color: 'rgb(55 65 81)',
  },
}))

const LoginActions = styled('div')(() => ({
  display: 'flex',
  gap: 32,
  marginTop: 16,
  justifyContent: 'center',
}))

const LoginSubmit = styled('button')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  border: 'none',
  background: 'rgb(75 85 99)',
  borderRadius: 2,
  padding: '4px 8px',
  cursor: 'pointer',
}))

const LoginLink = styled(NavLink)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}))

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  const typingUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), [])

  const typingPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])

  const handleSubmit = useCallback(() => {
    try {
      dispatch(loginUserRequest({ username, password }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, password, username])

  useEffect(() => {
    if (isAuth) navigate(Link.home)
  }, [isAuth, navigate])

  return (
    <LoginContainer onSubmit={(e) => e.preventDefault()}>
      <LoginTitle>Authorization</LoginTitle>
      <LoginLabel>
        Username:
        <LoginInput type="text" value={username} onChange={typingUsername} placeholder="Username" />
      </LoginLabel>
      <LoginLabel>
        Password:
        <LoginInput
          type="password"
          value={password}
          onChange={typingPassword}
          placeholder="Password"
          autoComplete="on"
        />
      </LoginLabel>
      <LoginActions>
        <LoginSubmit type="submit" onClick={handleSubmit}>
          Login
        </LoginSubmit>
        <LoginLink to={Link.register}>Registration</LoginLink>
      </LoginActions>
    </LoginContainer>
  )
}
