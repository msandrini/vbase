import React from 'react'
import cx from 'classnames'

import TLink from './TLink'
import t from '../../utils/i18n'

const getLinkObj = (infoKey, id) => ({ key: 'info', rest: `${t(`url__${infoKey}`)}/${id}` })

const InfoLink = ({ infoKey, id, extraClasses = '', children }) => (
  <TLink to={getLinkObj(infoKey, id)} className={cx(['info-link', extraClasses])}>
    {children}
  </TLink>
)

export default InfoLink
