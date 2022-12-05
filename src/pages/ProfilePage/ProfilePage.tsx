import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'
import { useQuery } from 'react-query'
import { AiOutlineMore } from 'react-icons/ai'

import { getUser, selectedBackgroundSelector, selectedLogoSelector, tokenSelector } from '../../store/selectors'
import { UserApi } from '../../api'
import { Avatar } from '../../components/Avatar'
import { Loader } from '../../components/Loader'

import './ProfilePage.css'
import { LogoPicker } from '../../components/LogoPicker'
import { BackgroundPicker } from '../../components/BackgroundPicker'

export const ProfilePage: FC = () => {
  const [open, setOpen] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const { username } = useParams()
  const { data, isLoading, refetch } = useQuery('user', () =>
    username ? UserApi.getUserByUsername(username, token) : null,
  )
  const currentUser = useSelector(getUser)
  const logo = useSelector(selectedLogoSelector)
  const background = useSelector(selectedBackgroundSelector)
  const token = useSelector(tokenSelector)
  const user = username ? data : currentUser

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

  const updateAvatar = useCallback(
    (event: any) => {
      event.preventDefault()
      currentUser && UserApi.updateUser(currentUser.id.toString(), token, logo, background)
      setOpenForm(false)
      refetch()
    },
    [background, currentUser, logo, refetch, token],
  )

  if (isLoading || !user) return <Loader />
  return (
    <div className="prof-container">
      <form className={`prof-setting-form${openForm ? ' open-form' : ''}`}>
        <div className="prof-setting-title">Choose avatar</div>
        <LogoPicker />
        <div className="prof-setting-title">Choose background</div>
        <BackgroundPicker />
        <button className="prof-setting-btn" onClick={updateAvatar}>
          Update avatar
        </button>
      </form>
      <div className="prof-menu" onClick={openSettingAvatar}>
        <AiOutlineMore size={'2em'} />
      </div>
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
