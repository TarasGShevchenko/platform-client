import React from 'react'
import { styled } from '@mui/material'

const LogoContainer = styled('div')(() => ({
  display: 'flex',
  position: 'relative',
  color: '#fff',
  padding: '6px 14px',
  fontSize: '1.8em',
  transition: '0.5s',
  cursor: 'pointer',
  borderRadius: 10,
  boxShadow: '0 0 5px #5da6ff, 0 0 10px #5da6ff, 0 0 15px #5da6ff, 0 0 20px #5da6ff',
  fontWeight: 700,
  ['&:hover']: {
    boxShadow: '0 0 10px #5da6ff, 0 0 20px #5da6ff, 0 0 30px #5da6ff, 0 0 40px #5da6ff',
  },
}))
export const WebsiteLogo = () => {
  return <LogoContainer>Platform</LogoContainer>
}
