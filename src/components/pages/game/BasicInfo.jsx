import React from 'react'
import InfoLink from '../../shared/InfoLink'

import './BasicInfo.styl'

const renderCompanies = companies => companies.map(c => (
  <InfoLink id={c.id} infoKey='company' extraClasses='company' key={c.id}>
    {c.title}
  </InfoLink>
))

const GameBasicInfo = props => (
  <div className='basic-info'>
    {renderCompanies(props.companies)}
    <span className='year'>{props.year}</span>
  </div>
)

export default GameBasicInfo
