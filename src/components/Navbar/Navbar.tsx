import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { MdPhotoCamera } from 'react-icons/md'
import { ImUsers } from 'react-icons/im'
import { VscAccount } from 'react-icons/vsc'
import { styled } from '@mui/material'

import { WebsiteLogo } from '../WebsiteLogo'
import { Sign } from '../Sign'
import { checkIsAuth, getMeSelector } from '../../store/selectors'
import { Link } from '../../enums'
import { selectUserAction } from '../../store/actions'

const NavbarContainer = styled('div')(() => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 10px',
  height: 80,
  zIndex: 9999,
  background: 'linear-gradient(to right, #060623, #000000)' || '#000000',
}))

const NavbarUl = styled('ul')(() => ({
  position: 'relative',
  display: 'flex',
  borderRadius: 10,
}))

const NavbarList = styled('li')(() => ({
  listStyle: 'none',
}))

const NavbarLink = styled(NavLink)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  textDecoration: 'none',
  color: '#fff',
  padding: '5px 30px',
  zIndex: 1000,
  ['&.active span']: {
    color: '#5da6ff',
    opacity: 1,
    paddingBottom: 8,
    borderBottom: '3px solid #5da6ff',
  },
  [theme.breakpoints.down('md')]: {
    padding: '5px 8px',
  },
}))

const NavbarIcon = styled('span')(() => ({
  display: 'flex',
  color: '#fff',
  padding: 12,
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.5em',
  pointerEvents: 'none',
  opacity: '40%',
  transition: '0.2s',
}))

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const me = useSelector(getMeSelector)
  const dispatch = useDispatch()

  const goToMyProfile = useCallback(() => {
    me && dispatch(selectUserAction({ id: me.id, username: me.username }))
  }, [dispatch, me])

  return (
    <NavbarContainer>
      <WebsiteLogo />
      {isAuth && (
        <NavbarUl>
          <NavbarList>
            <NavbarLink to={Link.home}>
              <NavbarIcon>
                <FiHome />
              </NavbarIcon>
            </NavbarLink>
          </NavbarList>
          <NavbarList>
            <NavbarLink to={Link.new}>
              <NavbarIcon>
                <MdPhotoCamera />
              </NavbarIcon>
            </NavbarLink>
          </NavbarList>
          <NavbarList>
            <NavbarLink to={Link.users}>
              <NavbarIcon>
                <ImUsers />
              </NavbarIcon>
            </NavbarLink>
          </NavbarList>
          <NavbarList>
            <NavbarLink to={`${Link.profile}/${me?.username}`} onClick={goToMyProfile}>
              <NavbarIcon>
                <VscAccount />
              </NavbarIcon>
            </NavbarLink>
          </NavbarList>
        </NavbarUl>
      )}
      <Sign />
    </NavbarContainer>
  )
}
