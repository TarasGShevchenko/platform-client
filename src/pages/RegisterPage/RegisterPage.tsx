import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'

import { registerUserRequest } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import { Link } from '../../enums'

const RegisterContainer = styled('form')(() => ({
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

const RegisterTitle = styled('h1')(() => ({
  color: 'white',
  textAlign: 'center',
}))

const RegisterLabel = styled('label')(() => ({
  color: 'rgb(156 163 175)',
}))

const RegisterInput = styled('input')(() => ({
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

const RegisterActions = styled('div')(() => ({
  display: 'flex',
  gap: 32,
  marginTop: 16,
  justifyContent: 'center',
}))

const RegisterSubmit = styled('button')(() => ({
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

const RegisterLink = styled(NavLink)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}))

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  const typingUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), [])

  const typingEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])

  const typingPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])

  const handleSubmit = useCallback(() => {
    try {
      dispatch(registerUserRequest({ username, email, password }))
      setPassword('')
      setEmail('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, username, password, email])

  useEffect(() => {
    if (isAuth) navigate(Link.home)
  }, [isAuth, navigate])

  return (
    <RegisterContainer onSubmit={(e) => e.preventDefault()}>
      <RegisterTitle>Registration</RegisterTitle>
      <RegisterLabel>
        Username:
        <RegisterInput type="text" value={username} onChange={typingUsername} placeholder="Username" />
      </RegisterLabel>
      <RegisterLabel>
        Email:
        <RegisterInput type="text" value={email} onChange={typingEmail} placeholder="Email" />
      </RegisterLabel>
      <RegisterLabel>
        Password:
        <RegisterInput
          type="password"
          value={password}
          onChange={typingPassword}
          placeholder="Password"
          autoComplete="on"
        />
      </RegisterLabel>
      <RegisterActions>
        <RegisterSubmit type="submit" onClick={handleSubmit}>
          Submit
        </RegisterSubmit>
        <RegisterLink to={Link.login}>To login</RegisterLink>
      </RegisterActions>
    </RegisterContainer>
  )
}
