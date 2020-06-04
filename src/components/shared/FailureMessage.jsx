import React from 'react'
import t from '../../utils/i18n'

import './FailureMessage.styl'

const FailureMessage = (props) => {
  console.warn(props)
  return (
    <div className='failure-message'>
      <strong>{t('error')}</strong>
      {props && (typeof props.message === 'string') && (
        <p>{props.message}</p>
      )}
    </div>
  )
}

export default FailureMessage
