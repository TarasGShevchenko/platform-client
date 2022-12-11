import React from 'react'
import { CircularProgress, styled } from '@mui/material'

const LoaderContainer = styled('div')(() => ({
  margin: '10px auto',
  textAlign: 'center',
}))
export const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  )
}
