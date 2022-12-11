import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material'

import { selectBackgroundAction } from '../../store/actions'

const DEFAULT_COLORS = ['#dd97ff', '#8a33f7', '#4c50ff', '#e400ec', '#4cff74', '#a2af00', '#ff6161', '#ff6666']

const BGPickerContainer = styled('div')(() => ({
  maxWidth: 340,
  maxHeight: 140,
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  margin: 8,
}))

const BGPickerInput = styled('input')(() => ({
  display: 'none',
  ['&:checked + label']: {
    border: '4px solid #0076ff',
    boxShadow: '0 0 10px 5px #5da6ff',
  },
}))
const BGPickerLabel = styled('label')(() => ({
  width: 'calc(25% - 40px)',
  cursor: 'pointer',
  padding: 2,
  margin: '5px 20px',
  border: '1px solid black',
  height: 40,
  ['&:hover']: {
    border: '4px solid #0076ff',
    boxShadow: '0 0 10px 5px #5da6ff',
  },
}))

export const BackgroundPicker = () => {
  const dispatch = useDispatch()

  const selectColor = useCallback(
    (event: ChangeEvent) => {
      dispatch(selectBackgroundAction(event.target.id))
    },
    [dispatch],
  )

  return (
    <BGPickerContainer>
      {DEFAULT_COLORS.map((color, i) => (
        <React.Fragment key={i}>
          <BGPickerInput
            className="background-picker-input"
            type="radio"
            name="background"
            id={color}
            value={color}
            onChange={selectColor}
          />
          <BGPickerLabel htmlFor={color} style={{ backgroundColor: color }} />
        </React.Fragment>
      ))}
    </BGPickerContainer>
  )
}
