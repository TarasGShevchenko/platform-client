import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material'

import { selectLogoAction } from '../../store/actions'

import stock from '../../assets/stock.png'
import avatar from '../../assets/avatar.png'
import hackerj from '../../assets/hackerj.png'
import hackerm from '../../assets/hackerm.png'
import hackers from '../../assets/hackers.png'
import kitty from '../../assets/kitty.png'
import zombie from '../../assets/zombie.png'
import superhero from '../../assets/superhero.png'

const LOGOS = { stock, hackers, hackerm, hackerj, avatar, zombie, superhero, kitty }

const LogoPickerContainer = styled('div')(() => ({
  maxWidth: 340,
  maxHeight: 140,
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  margin: 8,
}))

const LogoPickerInput = styled('input')(() => ({
  display: 'none',
  ['&:checked + label']: {
    border: '4px solid #0076ff',
    boxShadow: '0 0 10px 5px #5da6ff',
    borderRadius: '50%',
  },
}))
const LogoPickerImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
}))
const LogoPickerLabel = styled('label')(() => ({
  width: 'calc(25% - 20px)',
  cursor: 'pointer',
  padding: 2,
  margin: 4,
  ['&:hover']: {
    border: '4px solid #0076ff',
    boxShadow: '0 0 10px 5px #5da6ff',
    borderRadius: '50%',
  },
}))

export const LogoPicker = () => {
  const dispatch = useDispatch()
  const keys = Object.keys(LOGOS)

  const selectLogo = useCallback(
    (event: ChangeEvent) => {
      dispatch(selectLogoAction(event.target.id))
    },
    [dispatch],
  )

  return (
    <LogoPickerContainer>
      {Object.values(LOGOS).map((img, i) => (
        <React.Fragment key={i}>
          <LogoPickerInput type="radio" name="logo" id={`${keys[i]}`} value={`${keys[i]}`} onChange={selectLogo} />
          <LogoPickerLabel className="logo-picker-label" htmlFor={`${keys[i]}`}>
            <LogoPickerImg src={img} alt={`${img}`} />
          </LogoPickerLabel>
        </React.Fragment>
      ))}
    </LogoPickerContainer>
  )
}
