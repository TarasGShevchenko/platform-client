import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { MdPhotoCamera } from 'react-icons/md'
import { ImUsers } from 'react-icons/im'
import { VscAccount } from 'react-icons/vsc'

import { WebsiteLogo } from '../WebsiteLogo'
import { Sign } from '../Sign'
import { checkIsAuth, getMeSelector } from '../../store/selectors'
import { Link } from '../../enums'

import './Navbar.css'
import { selectUserAction } from '../../store/actions'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const me = useSelector(getMeSelector)
  const dispatch = useDispatch()

  const goToMyProfile = useCallback(() => {
    me && dispatch(selectUserAction({ id: me.id, username: me.username }))
  }, [dispatch, me])

  return (
    <>
      <div className="navbar-container">
        <WebsiteLogo />
        {isAuth && (
          <ul className="navbar-ul">
            <li className="navbar-list">
              <NavLink to={Link.home} className="nav-link">
                <span className="navbar-icon">
                  <FiHome />
                </span>
              </NavLink>
            </li>
            <li className="navbar-list">
              <NavLink to={Link.new} className="nav-link">
                <span className="navbar-icon">
                  <MdPhotoCamera />
                </span>
              </NavLink>
            </li>
            <li className="navbar-list">
              <NavLink to={Link.users} className="nav-link">
                <span className="navbar-icon">
                  <ImUsers />
                </span>
              </NavLink>
            </li>
            <li className="navbar-list">
              <NavLink to={`${Link.profile}/${me?.username}`} className="nav-link" onClick={goToMyProfile}>
                <span className="navbar-icon">
                  <VscAccount />
                </span>
              </NavLink>
            </li>
          </ul>
        )}
        <Sign />
      </div>
    </>
  )
}
