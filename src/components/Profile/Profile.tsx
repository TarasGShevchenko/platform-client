import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { AiOutlineMore } from 'react-icons/ai'
import { styled } from '@mui/material'

import { selectedBackgroundSelector, selectedLogoSelector, tokenSelector } from '../../store/selectors'
import { UserApi } from '../../api'
import { Avatar } from '../Avatar'
import { Loader } from '../Loader'
import { LogoPicker } from '../LogoPicker'
import { BackgroundPicker } from '../BackgroundPicker'
import { IUser } from '../../store/types'

const ProfileContainer = styled('div')(() => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  marginBottom: 20,
  minWidth: 350,
  minHeight: 400,
  background: 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 10,
  zIndex: 10,
  backdropFilter: 'blur(25px)',
}))

const Settings = styled('form')<{ open: boolean }>(({ open }) => ({
  display: 'none',
  ...(open && {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 20,
    minWidth: 300,
    minHeight: 420,
    background: 'white',
    boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    backdropFilter: 'blur(5px)',
    zIndex: 99,
  }),
}))
const SettingsTitle = styled('div')(() => ({
  fontSize: 18,
  fontWeight: 600,
  margin: '10px auto',
}))
const SettingsAction = styled('div')(() => ({
  display: 'flex',
  margin: 10,
}))
const SettingsActionBtn = styled('div')(() => ({
  fontSize: 18,
  textAlign: 'center',
  margin: 10,
  padding: '5px 10px',
  width: '100%',
  maxWidth: 300,
  background: 'rgba(255, 255, 255, 0.2)',
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 5,
  backdropFilter: 'blur(10px)',
  cursor: 'pointer',
  ['&:hover']: {
    background: 'white',
  },
}))

const Menu = styled('div')(() => ({
  color: 'white',
  position: 'absolute',
  top: 20,
  right: 20,
  cursor: 'pointer',
  ['&:hover']: {
    color: '#5da6ff',
  },
}))

const MenuOption = styled('div')<{ open: boolean }>(({ open }) => ({
  display: 'none',
  ...(open && {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 20,
    right: 50,
    width: 150,
    background: 'white',
    borderRadius: 5,
  }),
  ['& hr']: {
    width: '60%',
    margin: 'auto',
  },
}))

const MenuSelect = styled('button')(() => ({
  width: '100%',
  height: 40,
  borderRadius: 5,
  border: 'none',
  fontSize: 18,
  cursor: 'pointer',
  ['&:hover']: {
    color: '#5da6ff',
  },
}))

const ProfileTitle = styled('h1')(() => ({
  color: 'white',
  textAlign: 'center',
}))
const ProfileContent = styled('div')(() => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 350,
}))
const ProfileRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  color: 'white',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
}))

export const Profile: FC<{ user: IUser; reloadUser: () => void; reloadPosts: () => void }> = ({
  user,
  reloadUser,
  reloadPosts,
}) => {
  const [open, setOpen] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const logo = useSelector(selectedLogoSelector)
  const background = useSelector(selectedBackgroundSelector)
  const token = useSelector(tokenSelector)

  const openSettingAvatar = useCallback(() => {
    setOpen(!open)
  }, [open])
  const closeSettingAvatar = useCallback(() => {
    setOpen(!open)
  }, [open])
  const openChangeAvatarModal = useCallback(() => {
    setOpenForm(!openForm)
    closeSettingAvatar()
  }, [closeSettingAvatar, openForm])
  const closeChangeAvatarModal = useCallback(() => {
    setOpenForm(!openForm)
  }, [openForm])

  const updateAvatar = useCallback(() => {
    UserApi.updateUser(user.id.toString(), token, logo, background)
    closeChangeAvatarModal()
    reloadUser()
    reloadPosts()
  }, [background, closeChangeAvatarModal, logo, reloadPosts, reloadUser, token, user.id])

  if (!user) return <Loader />
  return (
    <ProfileContainer>
      <Settings open={openForm}>
        <SettingsTitle>Choose avatar</SettingsTitle>
        <LogoPicker />
        <SettingsTitle>Choose background</SettingsTitle>
        <BackgroundPicker />
        <SettingsAction>
          <SettingsActionBtn onClick={updateAvatar}>Update avatar</SettingsActionBtn>
          <SettingsActionBtn onClick={closeChangeAvatarModal}>Close</SettingsActionBtn>
        </SettingsAction>
      </Settings>
      {token && (
        <Menu onClick={openSettingAvatar}>
          <AiOutlineMore size={'2em'} />
        </Menu>
      )}
      <MenuOption open={open}>
        <MenuSelect onClick={openChangeAvatarModal}>Change avatar</MenuSelect>
        <hr />
        <MenuSelect onClick={closeSettingAvatar}>Cancel</MenuSelect>
      </MenuOption>
      <Avatar
        id={user.id}
        avatarLogo={user.avatarLogo}
        avatarBackground={user.avatarBackground}
        username={user.username}
        isProfile={true}
      />
      <ProfileTitle>{user.username}</ProfileTitle>
      <ProfileContent>
        <ProfileRow>
          <div>Email: </div>
          <div>{user.email}</div>
        </ProfileRow>
        <ProfileRow>
          <div>Role: </div>
          <div>
            {user.roles.map((role) => (
              <div key={role.id}>{role.value}</div>
            ))}
          </div>
        </ProfileRow>
        <ProfileRow>
          <div>Posts: </div>
          <div>{user.posts.length}</div>
        </ProfileRow>
        <ProfileRow>
          <div>Register date: </div>
          <Moment date={user.createdAt} format="D MMM YYYY" />
        </ProfileRow>
      </ProfileContent>
    </ProfileContainer>
  )
}
