import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { logout } from '../../store/actions'
import { checkIsAuth } from '../../store/selectors'
import './Navbar.css'
import { Link } from '../../enums'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activeStyles = {
    opacity: 1,
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
      <span className="logo">Platform</span>
      {isAuth && (
        <ul className="navbar-ul">
          <li className="navbar-list">
            <NavLink to={Link.home} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <span className="material-symbols-outlined">home</span>
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.posts} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <span className="material-symbols-outlined">image</span>
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.new} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <span className="material-symbols-outlined">add_a_photo</span>
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.users} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <span className="material-symbols-outlined">group</span>
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.profile} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <span className="material-symbols-outlined">account_circle</span>
              </span>
            </NavLink>
          </li>
        </ul>
      )}
      <div className="navbar-button">
        {isAuth ? (
          <div className="navbar-action" onClick={handleLogout}>
            Log out
          </div>
        ) : (
          <div className="navbar-action" onClick={handleLogin}>
            Log in
          </div>
        )}
      </div>
    </div>
  )
}
