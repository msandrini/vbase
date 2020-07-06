import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Slider from 'rc-slider/lib/Slider'

import Icon from '../../../../shared/Icon'
import t from '../../../../../utils/i18n'
import { createAction } from '../../../../../utils/store'
import { MAX_REVIEW_LENGTH, USERINPUT } from '../../../../../utils/constants'
import './Form.styl'

const getMarks = () => {
  const marks = {}
  for (let x = 2; x <= 10; x = x + 0.5) {
    const isInt = !(x % 1)
    if (x < 10 && isInt) {
      marks[x] = x
    }
  }
  return marks
}

const GameUserReviewForm = ({ gameId }) => {
  const [score, setScore] = useState(null)
  const [user, setUser] = useState('') // TODO persist user in future ?
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const submitAction = createAction(USERINPUT.SUBMITTED)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const fields = {
      score,
      text,
      user,
      game: gameId
    }
    dispatch(submitAction({ fields }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h5>{t('review-this-game')}</h5>
      <div className='field user'>
        <label htmlFor='user'>{t('user')}</label>
        <input type='text' placeholder={t('optional')} name='user' onChange={(e) => setUser(e.target.value)} />
      </div>
      <div className='field score'>
        <label htmlFor='score'>{t('score')}:
          <strong className={`score${String(score).replace('.', '-')}`}>
            {score || '-'}
          </strong>
        </label>
        <div className='choose-score'>
          <Slider min={2} max={10} step={0.5} onChange={(v) => setScore(v)} marks={getMarks()} />
        </div>
      </div>
      <div className='field text'>
        <label htmlFor='review-text'>
          {t('review-text')}
          <small>
            {t('left') + ' ' + (MAX_REVIEW_LENGTH - text.length) + ' '}
            {t('character', { plural: (MAX_REVIEW_LENGTH - text.length) })}
          </small>
        </label>
        <textarea
          maxLength={String(MAX_REVIEW_LENGTH)}
          placeholder={t('optional')}
          name='review-text'
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='button-wrapper'>
        <button className='ball' title={t('send')}>
          <Icon type='check' size='28' />
        </button>
      </div>
    </form>
  )
}

export default GameUserReviewForm
