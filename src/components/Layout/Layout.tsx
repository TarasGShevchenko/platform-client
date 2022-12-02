import React, { FC, ReactNode } from 'react'

import { Navbar } from '../Navbar'
import './Layout.css'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">{children}</div>
    </React.Fragment>
  )
}
