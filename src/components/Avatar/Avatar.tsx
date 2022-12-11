import React, { FC, useMemo } from 'react'
import { styled } from '@mui/material'

import stock from '../../assets/stock.png'
import avatar from '../../assets/avatar.png'
import hackerj from '../../assets/hackerj.png'
import hackerm from '../../assets/hackerm.png'
import hackers from '../../assets/hackers.png'
import kitty from '../../assets/kitty.png'
import zombie from '../../assets/zombie.png'
import superhero from '../../assets/superhero.png'

type AvatarProps = {
  username: string
  id: number
  avatarLogo: string
  avatarBackground: string
  isProfile?: boolean
}

const defaultColors = ['#dd97ff', '#8a33f7', '#4c50ff', '#4cfff0', '#4cff74', '#a2af00', '#ff6161']

const AvatarContainer = styled('div')<{ large: boolean }>(({ large }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: large ? 200 : 40,
  height: large ? 200 : 40,
  background: 'rgb(147 197 253)',
  border: `${large ? 5 : 2}px solid white`,
  borderRadius: 9999,
  flexShrink: 0,
  marginRight: 16,
  ...(large && {
    margin: 32,
    fontSize: 80,
  }),
}))

const AvatarImg = styled('img')(() => ({
  width: '100%',
}))

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
    <AvatarContainer large={!!isProfile} style={{ background: avatarBackground || color }}>
      <AvatarImg src={getUserLogo} alt={`${avatarLogo || 'stock'}`} />
    </AvatarContainer>
  )
}
