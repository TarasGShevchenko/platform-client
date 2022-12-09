import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUserRequest } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import { Link } from '../../enums'

import './LoginPage.css'

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
    <form onSubmit={(e) => e.preventDefault()} className="login-container">
      <h1 className="login-title">Authorization</h1>
      <label className="login-label">
        Username:
        <input type="text" value={username} onChange={typingUsername} placeholder="Username" className="login-input" />
      </label>
      <label className="login-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={typingPassword}
          placeholder="Password"
          className="login-input"
          autoComplete="on"
        />
      </label>
      <div className="login-actions">
        <button type="submit" onClick={handleSubmit} className="login-actions-button">
          Login
        </button>
        <NavLink to={'/register'} className="login-actions-link">
          Registration
        </NavLink>
      </div>
    </form>
  )
}
