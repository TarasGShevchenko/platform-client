import React, { FC, useMemo } from 'react'

import './Avatar.css'

type AvatarProps = {
  username: string
  isProfile?: boolean
}

const defaultColors = ['#dd97ff', '#8a33f7', '#4c50ff', '#4cfff0', '#4cff74', '#a2af00', '#ff6161']

export const Avatar: FC<AvatarProps> = ({ username, isProfile }) => {
  const avatar = username.trim().toUpperCase().split('').slice(0, 2)
  const color = useMemo(() => {
    const index = Math.floor(Math.random() * 7)
    return defaultColors[index]
  }, [])
  return (
    <div className={`avatar-container${isProfile ? ' large' : ''}`} style={{ background: color }}>
      {avatar}
    </div>
  )
}
