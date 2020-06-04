import React from 'react'

import Scorebar from '../../shared/Scorebar'

import t from '../../../utils/i18n'
import './UserScore.styl'

const getRounded = (score, multiplier = 1) => (Math.floor(score * multiplier) / multiplier)
const getTranslatedTimesString = times => t('x-review', { plural: times, replacements: times })

const GameUserScore = ({ reviews }) => (
  <div className='score user-score'>
    {reviews && (
      <div className='ball'>
        <span className='label'>{t('user-score')}</span>
        <div className={`score${getRounded(reviews.averageScore)}`}>
          <Scorebar score={getRounded(reviews.averageScore, 2)} size='72' />
          <strong>{getRounded(reviews.averageScore, 100)}</strong>
          <small>{getTranslatedTimesString(reviews.timesReviewed)}</small>
        </div>
      </div>
    )}
  </div>
)

export default GameUserScore
