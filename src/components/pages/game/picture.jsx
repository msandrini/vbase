import React from 'react'

import Icon from '../../shared/Icon'

import { IMAGEGAME_URL } from '../../../utils/constants'
import t from '../../../utils/i18n'
import './Picture.styl'

const getFilledArray = quantity => new Array(quantity + 1).join('-').split('')

const GamePicture = ({ total, gameId, current, onChangeImage }) => (
  <figure>
    <span className='overlay' />
    {getFilledArray(total).map((v, i) => (
      <img
        key={i}
        src={`${IMAGEGAME_URL}${gameId}/${i + 1}.png`}
        alt={t('image-of-the-gameplay') + ` #${i}`}
        className={current === (i + 1) ? 'chosen' : ''}
      />
    ))}
    {(total > 1) && (
      <div className='controls'>
        <a className='ball btn prev' title={t('previous')} onClick={() => { onChangeImage(-1) }}>
          <Icon size='14' type='prev' />
        </a>
        <a className='ball btn next' title={t('next')} onClick={() => { onChangeImage(1) }}>
          <Icon size='20' type='next' />
        </a>
      </div>
    )}
  </figure>
)

export default GamePicture
