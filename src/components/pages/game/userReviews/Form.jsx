import React from 'react'
import Slider from 'rc-slider/lib/Slider'

import Icon from '../../../shared/Icon'
import UserBox from '../../../shared/UserBox'
import t from '../../../../utils/i18n'
import { MAX_REVIEW_LENGTH } from '../../../../utils/constants'
import './Form.styl'

const scores = []
const marks = {}
for (let x = 2; x <= 10; x = x + 0.5) {
  scores.push(x)
  const isInt = !(x % 1)
  if (x < 10 && isInt) {
    marks[x] = x
  }
}

const GameUserReviewForm = props => (
  <form onSubmit={(e) => props.send(e)}>
    <h5>{t('review-this-game')}</h5>
    <div className='field user'>
      <label htmlFor='score'>{t('user')}</label>
      <UserBox verify />
    </div>
    <div className='field score'>
      <label htmlFor='score'>{t('score')}:
        <strong className={`score${String(props.ownScore).replace('.', '-')}`}>
          {props.ownScore || '-'}
        </strong>
      </label>
      <div className='choose-score'>
        <Slider min={2} max={10} step={0.5} onChange={(e) => props.changeScore(e)} marks={marks} />
      </div>
    </div>
    <div className='field text'>
      <label htmlFor='review-text'>
        {t('review-text')}
        <small>{t('left') + ' ' + (MAX_REVIEW_LENGTH - props.ownText.length) + ' '}
          {t('character', { plural: (MAX_REVIEW_LENGTH - props.ownText.length) })}
        </small>
      </label>
      <textarea
        maxLength={String(MAX_REVIEW_LENGTH)} placeholder={t('optional')}
        name='review-text' onChange={(e) => props.changeText(e.target.value)}
      />
    </div>
    <div className='button-wrapper'>
      <button className='ball' title={t('send')}>
        <Icon type='check' size='28' />
      </button>
    </div>
  </form>
)

export default GameUserReviewForm
