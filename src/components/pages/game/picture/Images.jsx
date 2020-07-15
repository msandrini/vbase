import React from 'react'

import { IMAGEGAME_URL } from '../../../../utils/constants'
import t from '../../../../utils/i18n'

const GamePictureImages = ({ gameId, availableImages, chosenIndex }) => {
  const imageTags = []
  for (let i = 0; i < availableImages; i++) {
    imageTags.push(
      <img
        key={i}
        src={`${IMAGEGAME_URL}${gameId}/${i + 1}.png`}
        alt={t('image-of-the-gameplay') + ` #${i}`}
        className={chosenIndex === i ? 'chosen' : ''}
      />
    )
  }
  return imageTags
}

export default GamePictureImages
