import React from 'react'
import { Link } from 'react-router-dom'

import { buildTUrl } from '../../utils/history'
import t from '../../utils/i18n'

const getLinkDestiny = (to) => {
  if (typeof to === 'string') return buildTUrl({ key: to })
  return buildTUrl(to)
}

const TLink = ({ to, className, children, titleKey = '' }) => (
  <Link to={getLinkDestiny(to)} className={className} title={titleKey ? t(titleKey) : ''}>
    {children}
  </Link>
)

export default TLink
