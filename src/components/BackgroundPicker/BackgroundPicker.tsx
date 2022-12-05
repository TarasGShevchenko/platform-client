import React, { ChangeEvent, useCallback } from 'react'

import './BackgroundPicker.css'
import { useDispatch } from 'react-redux'
import { selectBackgroundAction } from '../../store/actions'

const DEFAULT_COLORS = ['#dd97ff', '#8a33f7', '#4c50ff', '#e400ec', '#4cff74', '#a2af00', '#ff6161', '#ff6666']
export const BackgroundPicker = () => {
  const dispatch = useDispatch()

  const selectColor = useCallback(
    (event: ChangeEvent) => {
      dispatch(selectBackgroundAction(event.target.id))
    },
    [dispatch],
  )

  return (
    <div className="background-picker-container">
      {DEFAULT_COLORS.map((color, i) => (
        <React.Fragment key={i}>
          <input
            className="background-picker-input"
            type="radio"
            name="background"
            id={color}
            value={color}
            onChange={selectColor}
          />
          <label className="background-picker-label" htmlFor={color} style={{ backgroundColor: color }} />
        </React.Fragment>
      ))}
    </div>
  )
}
