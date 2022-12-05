import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { selectLogoAction } from '../../store/actions'

import stock from '../../assets/stock.png'
import avatar from '../../assets/avatar.png'
import hackerj from '../../assets/hackerj.png'
import hackerm from '../../assets/hackerm.png'
import hackers from '../../assets/hackers.png'
import kitty from '../../assets/kitty.png'
import zombie from '../../assets/zombie.png'
import superhero from '../../assets/superhero.png'
import './LogoPicker.css'

const LOGOS = { stock, hackers, hackerm, hackerj, avatar, zombie, superhero, kitty }
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
    <div className="logo-picker-container">
      {Object.values(LOGOS).map((img, i) => (
        <React.Fragment key={i}>
          <input type="radio" name="logo" id={`${keys[i]}`} value={`${keys[i]}`} onChange={selectLogo} />
          <label className="logo-picker-label" htmlFor={`${keys[i]}`}>
            <img className="logo-picker-item" src={img} alt={`${img}`} />
          </label>
        </React.Fragment>
      ))}
    </div>
  )
}
