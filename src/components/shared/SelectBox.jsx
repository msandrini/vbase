import React from 'react'
import Icon from './Icon'

const SelectBox = ({
  subLabel,
  onChange,
  value,
  name,
  children
}) => (
  <div className='select-box'>
    {!!subLabel && <span>{subLabel}</span>}
    <select onChange={onChange} value={value} name={name}>
      {children}
    </select>
    <Icon size='10' type='downarrow' />
  </div>
)

export default SelectBox
