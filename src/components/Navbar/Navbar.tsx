import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHome } from 'react-icons/fi'
import { FaPhotoVideo } from 'react-icons/fa'
import { MdPhotoCamera } from 'react-icons/md'
import { ImUsers } from 'react-icons/im'
import { VscAccount } from 'react-icons/vsc'
import { toast } from 'react-toastify'

import { logout } from '../../store/actions'
import { checkIsAuth, getUser } from '../../store/selectors'
import { Link } from '../../enums'

import './Navbar.css'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const user = useSelector(getUser)
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
                <FiHome />
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink
              to={`${Link.posts}/user/${user?.id}`}
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyles : {})}
            >
              <span className="navbar-icon">
                <FaPhotoVideo />
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.new} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <MdPhotoCamera />
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink to={Link.users} className="nav-link" style={({ isActive }) => (isActive ? activeStyles : {})}>
              <span className="navbar-icon">
                <ImUsers />
              </span>
            </NavLink>
          </li>
          <li className="navbar-list">
            <NavLink
              to={`${Link.profile}/${user?.username}`}
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyles : {})}
            >
              <span className="navbar-icon">
                <VscAccount />
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
