import React from 'react'
import { styled } from '@mui/material'

import './BackgroundAnimation.css'

export const BackgroundAnimation = () => {
  return (
    <BGAnimation>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="stars4"></div>
    </BGAnimation>
  )
}

const BGAnimation = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -9999,
}))
