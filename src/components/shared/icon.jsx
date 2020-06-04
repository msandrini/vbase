import React from 'react'

const Icon = ({ size, type }) => (
  <span className='icon'>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width={size} height={size}>
      <use xlinkHref={'#icon_' + type} />
    </svg>
  </span>
)

export default Icon
