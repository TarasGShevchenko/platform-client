import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { registerUserRequest } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'

import './RegisterPage.css'

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
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <form onSubmit={(e) => e.preventDefault()} className="reg-container">
      <h1 className="reg-title">Registration</h1>
      <label className="reg-label">
        Username:
        <input type="text" value={username} onChange={typingUsername} placeholder="Username" className="reg-input" />
      </label>
      <label className="reg-label">
        Email:
        <input type="text" value={email} onChange={typingEmail} placeholder="Email" className="reg-input" />
      </label>
      <label className="reg-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={typingPassword}
          placeholder="Password"
          className="reg-input"
          autoComplete="on"
        />
      </label>
      <div className="reg-actions">
        <button type="submit" onClick={handleSubmit} className="reg-actions-button">
          Submit
        </button>
        <Link to={'/login'} className="reg-actions-link">
          To login
        </Link>
      </div>
    </form>
  )
}
