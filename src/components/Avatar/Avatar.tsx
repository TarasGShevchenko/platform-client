import React, { FC, useMemo } from 'react'

import stock from '../../assets/stock.png'
import avatar from '../../assets/avatar.png'
import hackerj from '../../assets/hackerj.png'
import hackerm from '../../assets/hackerm.png'
import hackers from '../../assets/hackers.png'
import kitty from '../../assets/kitty.png'
import zombie from '../../assets/zombie.png'
import superhero from '../../assets/superhero.png'

import './Avatar.css'

type AvatarProps = {
  username: string
  id: number
  avatarLogo: string
  avatarBackground: string
  isProfile?: boolean
}

const defaultColors = ['#dd97ff', '#8a33f7', '#4c50ff', '#4cfff0', '#4cff74', '#a2af00', '#ff6161']

export const Avatar: FC<AvatarProps> = ({ avatarLogo, avatarBackground, isProfile }) => {
  const getUserLogo = useMemo(
    () => ({ hackers, hackerm, hackerj, avatar, zombie, superhero, kitty, stock }[avatarLogo] || stock),
    [avatarLogo],
  )

  const color = useMemo(() => {
    const index = Math.floor(Math.random() * 7)
    return defaultColors[index]
  }, [])
  return (
    <div className={`avatar-container${isProfile ? ' large' : ''}`} style={{ background: avatarBackground || color }}>
      <img className="avatar-img" src={getUserLogo} alt={`${avatarLogo || 'stock'}`} />
    </div>
  )
}
