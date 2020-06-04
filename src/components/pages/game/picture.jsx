import React, { useState } from 'react'

import Icon from '../../shared/Icon'

import { IMAGEGAME_URL } from '../../../utils/constants'
import t from '../../../utils/i18n'
import './Picture.styl'

const GamePicture = ({ total, gameId }) => {
  const [index, setIndex] = useState(0)

  const handleChangeImage = (increment) => {
    setIndex(index => index + increment)
  }

  const renderImageTags = () => {
    const imageTags = []
    for (let i = 0; i <= total; i++) {
      imageTags.push(
        <img
          key={i}
          src={`${IMAGEGAME_URL}${gameId}/${i + 1}.png`}
          alt={t('image-of-the-gameplay') + ` #${i}`}
          className={index === (i + 1) ? 'chosen' : ''}
        />
      )
    }
    return imageTags
  }

  return (
    <figure>
      <span className='overlay' />
      {renderImageTags()}
      {(total > 1) && (
        <div className='controls'>
          <a className='ball btn prev' title={t('previous')} onClick={handleChangeImage(-1)}>
            <Icon size='14' type='prev' />
          </a>
          <a className='ball btn next' title={t('next')} onClick={handleChangeImage(1)}>
            <Icon size='20' type='next' />
          </a>
        </div>
      )}
    </figure>
  )
}

export default GamePicture
