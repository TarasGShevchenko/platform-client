import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import stock from '../../assets/stock.png'
import avatar from '../../assets/avatar.png'
import hackerj from '../../assets/hackerj.png'
import hackerm from '../../assets/hackerm.png'
import hackers from '../../assets/hackers.png'
import kitty from '../../assets/kitty.png'
import zombie from '../../assets/zombie.png'
import superhero from '../../assets/superhero.png'
import './LogoPicker.css'
import { selectLogoAction } from '../../store/actions'

export const LogoPicker = () => {
  const dispatch = useDispatch()

  const selectLogo = useCallback(
    (event: any) => {
      dispatch(selectLogoAction(event.target.id))
    },
    [dispatch],
  )

  return (
    <div className="logo-picker-container">
      <input type="radio" name="logo" id="stock" value="stock" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="stock">
        <img className="logo-picker-item" src={stock} alt="stock" />
      </label>

      <input type="radio" name="logo" id="avatar" value="avatar" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="avatar">
        <img className="logo-picker-item" src={avatar} alt="avatar" />
      </label>

      <input type="radio" name="logo" id="hackerj" value="hackerj" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="hackerj">
        <img className="logo-picker-item" src={hackerj} alt="hackerj" />
      </label>

      <input type="radio" name="logo" id="hackerm" value="hackerm" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="hackerm">
        <img className="logo-picker-item" src={hackerm} alt="hackerm" />
      </label>

      <input type="radio" name="logo" id="hackers" value="hackers" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="hackers">
        <img className="logo-picker-item" src={hackers} alt="hackers" />
      </label>

      <input type="radio" name="logo" id="kitty" value="kitty" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="kitty">
        <img className="logo-picker-item" src={kitty} alt="kitty" />
      </label>

      <input type="radio" name="logo" id="zombie" value="zombie" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="zombie">
        <img className="logo-picker-item" src={zombie} alt="zombie" />
      </label>

      <input type="radio" name="logo" id="superhero" value="superhero" onChange={selectLogo} />
      <label className="logo-picker-label" htmlFor="superhero">
        <img className="logo-picker-item" src={superhero} alt="superhero" />
      </label>
    </div>
  )
}
