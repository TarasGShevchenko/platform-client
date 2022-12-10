import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth } from '../../store/selectors'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BiLogIn, BiLogOut } from 'react-icons/bi'

import { logout } from '../../store/actions'
import { Link } from '../../enums'

import './Sign.css'
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
    <div className="sign-button">
      {isAuth ? (
        <div className="sign-action" onClick={handleLogout}>
          <BiLogOut />
        </div>
      ) : (
        <div className="sign-action" onClick={handleLogin}>
          <BiLogIn />
        </div>
      )}
    </div>
  )
}
