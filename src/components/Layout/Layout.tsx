import React, { FC, ReactNode } from 'react'
import { styled } from '@mui/material'

import { Navbar } from '../Navbar'

const LayoutContainer = styled('div')(() => ({
  maxWidth: 800,
  margin: 'auto',
}))

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <LayoutContainer>{children}</LayoutContainer>
    </React.Fragment>
  )
}
