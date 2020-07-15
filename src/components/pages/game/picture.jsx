import React, { useState, useEffect, useMemo } from 'react'

import Icon from '../../shared/Icon'

import { IMAGEGAME_URL } from '../../../utils/constants'
import t from '../../../utils/i18n'
import './Picture.styl'
import GamePictureImages from './picture/Images'

const GamePicture = ({ gameId }) => {
  const [index, setIndex] = useState(0)
  const [availableImages, setAvailableImages] = useState(1)

  const tryLoadingImage = index => {
    const url = `${IMAGEGAME_URL}${gameId}/${index}.png`
    const img = new window.Image()
    img.onload = () => {
      tryLoadingImage(index + 1)
    }
    img.onerror = () => {
      if (index > 2) setAvailableImages(index - 1)
    }
    img.src = url
  }

  useEffect(() => {
    tryLoadingImage(2)
  }, [gameId])

  const handleChangeImage = (increment) => () => {
    setIndex(index => {
      const nextIndex = index + increment
      if (nextIndex < 0) return 0
      if (nextIndex >= availableImages) return availableImages - 1
      return nextIndex
    })
  }

  return useMemo(() => (
    <figure>
      <span className='overlay' />
      <GamePictureImages gameId={gameId} availableImages={availableImages} chosenIndex={index} />
      {(availableImages > 1) && (
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
  ), [availableImages, gameId, index])
}

export default GamePicture
