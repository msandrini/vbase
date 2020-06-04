import React from 'react'

import Scorebar from '../../shared/Scorebar'

import t from '../../../utils/i18n'
import './EditorScore.styl'

const renderScoreDisplay = (score) => {
  const scoreInt = parseInt(score, 10)
  const scoreParts = String(score).split('.')
  if (scoreInt >= 2) {
    return (
      <div className={`numbers score${String(score).replace('.', '-')}`}>
        <Scorebar score={score} size='100' />
        <strong>{scoreParts[0]}</strong>
        <small>{scoreParts[1] ? scoreParts[1] : '0'}</small>
      </div>
    )
  }
  if (scoreInt === 1) {
    return (
      <div className='numbers score1'>
        <strong>{t('n-a')}</strong>
        <small>{t('not-applicable')}</small>
      </div>
    )
  }
  if (scoreInt === 0) {
    return (
      <div className='numbers score0'>
        <small>{t('not-scored')}</small>
      </div>
    )
  }
}

const GameEditorScore = ({ score }) => (
  <div className='score editor-score'>
    <span className='line' />
    <div className='ball'>
      <span className='label'>{t('editor-score')}</span>
      {renderScoreDisplay(score)}
    </div>
  </div>
)

export default GameEditorScore
