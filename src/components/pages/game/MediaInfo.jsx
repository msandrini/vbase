import React from 'react'

import InfoLink from '../../shared/InfoLink'
import t, { lang } from '../../../utils/i18n'
import './MediaInfo.styl'

const renderAddOns = addOns => {
  if (!addOns || !addOns.length) return t('no-expansions-or-peripherals')

  const addOnsObj = { chip: [], peripheral: [] }
  for (const a of addOns) {
    addOnsObj[a.type].push(
      <InfoLink infoKey='addon' id={a.id} key={a.id}>
        {a.title[lang]}
      </InfoLink>
    )
  }
  const returnArray = []
  if (addOnsObj.peripheral) {
    returnArray.push(
      <span key='1'>
        {t('cartridge-supports')}
        {' '}
        {addOnsObj.peripheral}
      </span>
    )
  }
  if (addOnsObj.chip) {
    returnArray.push(
      <span key='2'>
        {returnArray.length ? ' ' + t('and-contains') : t('cartridge-contains')}
        {' '}
        {addOnsObj.chip}
      </span>
    )
  }
  return returnArray
}

const GameMediaInfo = props => (
  <aside className='media-info'>
    <div className='ball'>
      <strong>{props.mediaSize}</strong>
      <small>Mbits</small>
    </div>
    <p>{renderAddOns(props.addOns)}</p>
  </aside>
)

export default GameMediaInfo
