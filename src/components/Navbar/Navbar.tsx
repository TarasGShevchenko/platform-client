import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { logout } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import './Navbar.css'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activeStyles = {
    color: 'white',
  }

  const handleLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const handleLogout = useCallback(() => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Logout')
    navigate('/login')
  }, [dispatch, navigate])

  return (
    <div className="navbar-container">
      <span className="logo">E</span>
      {isAuth && (
        <ul className="navbar-ul">
          <li>
            <NavLink to={'/'} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={'/posts'} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink to={'/new'} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              Add Posts
            </NavLink>
          </li>
          <li>
            <NavLink to={'/users'} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to={'/profile'} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              Profile
            </NavLink>
          </li>
        </ul>
      )}
      <div className="navbar-button">
        {isAuth ? <button onClick={handleLogout}>Log out</button> : <button onClick={handleLogin}>Log in</button>}
      </div>
    </div>
  )
}
