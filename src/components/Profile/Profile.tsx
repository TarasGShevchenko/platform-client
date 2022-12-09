import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { AiOutlineMore } from 'react-icons/ai'

import { selectedBackgroundSelector, selectedLogoSelector, tokenSelector } from '../../store/selectors'
import { UserApi } from '../../api'
import { Avatar } from '../Avatar'
import { Loader } from '../Loader'
import { LogoPicker } from '../LogoPicker'
import { BackgroundPicker } from '../BackgroundPicker'

import './Profile.css'
import { IUser } from '../../store/types'

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
    <div className="prof-container">
      <form className={`prof-setting-form${openForm ? ' open-form' : ''}`}>
        <div className="prof-setting-title">Choose avatar</div>
        <LogoPicker />
        <div className="prof-setting-title">Choose background</div>
        <BackgroundPicker />
        <div className="prof-setting-actions">
          <div className="prof-setting-btn" onClick={updateAvatar}>
            Update avatar
          </div>
          <div className="prof-setting-btn" onClick={closeChangeAvatarModal}>
            Close
          </div>
        </div>
      </form>
      {token && (
        <div className="prof-menu" onClick={openSettingAvatar}>
          <AiOutlineMore size={'2em'} />
        </div>
      )}
      <div className={`prof-menu-option${open ? ' open' : ''}`}>
        <button className="prof-menu-select" onClick={openChangeAvatarModal}>
          Change avatar
        </button>
        <hr />
        <button className="prof-menu-select" onClick={closeSettingAvatar}>
          Cancel
        </button>
      </div>
      <Avatar
        id={user.id}
        avatarLogo={user.avatarLogo}
        avatarBackground={user.avatarBackground}
        username={user.username}
        isProfile={true}
      />
      <h1 className="prof-title">{user.username}</h1>
      <div className="prof-content">
        <div className="prof-row">
          <div>Email: </div>
          <div>{user.email}</div>
        </div>
        <div className="prof-row">
          <div>Role: </div>
          <div>
            {user.roles.map((role) => (
              <div key={role.id}>{role.value}</div>
            ))}
          </div>
        </div>
        <div className="prof-row">
          <div>Posts: </div>
          <div>{user.posts.length}</div>
        </div>
        <div className="prof-row">
          <div>Register date: </div>
          <Moment date={user.createdAt} format="D MMM YYYY" />
        </div>
      </div>
    </div>
  )
}
