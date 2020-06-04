import React from 'react'
import reactStringReplace from 'react-string-replace'

import './Title.styl'

const renderProcessedTitle = title => {
  if (typeof title === 'string' && title.indexOf('*')) {
    return reactStringReplace(title, /\*([^\*]+)\*/g, // eslint-disable-line no-useless-escape
      (match, index) => <strong key={index}>{match}</strong>)
  }
  return title
}

const Title = (props) => (
  <hgroup className='title'>
    <h2>{props.main}</h2>
    {props.sub && (
      <h3>{renderProcessedTitle(props.sub)}</h3>
    )}
    {props.details && (
      <h4>
        {props.details.map((d, i) => (
          <div key={i}>{renderProcessedTitle(d)}</div>
        ))}
      </h4>
    )}
    <div className='ball' />
  </hgroup>
)

export default Title
