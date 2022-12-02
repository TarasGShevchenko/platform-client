import React, { FC, ReactNode } from 'react'

import './Layout.css'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container">{children}</div>
    </React.Fragment>
  )
}
