import React from 'react'
import reactStringReplace from 'react-string-replace'

import t, { lang } from '../../../../../utils/i18n'
import Icon from '../../../../shared/Icon'
import './Entry.styl'

const getName = review => {
  const getEntry = name => <>{t('by') + ': '}<strong>{name}</strong></>
  if (typeof review.user === 'string') {
    if (/([0-9a-f]){24}/.test(review.user)) return t('legacy-review')
    return review.user ? getEntry(review.user) : t('anonymous')
  }
  return t('legacy-review')
}

const GameUserReviewEntry = ({ review }) => (
  <div>
    <span className='avatar ball'>
      <Icon type='person' size='16' />
    </span>
    <span className={`score ball score${Math.floor(review.score)}`}>
      {t('score')}
      {': '}
      <strong>{review.score}</strong>
    </span>
    <div className='user'>
      {getName(review)}
    </div>
    <time dateTime={review.added}>
      {new Date(review.added).toLocaleDateString(t('date-locale'))}
    </time>
    {review.text && (
      <p className={(review.lang !== lang) ? 'other-language' : ''}>
        {(review.lang !== lang) && (
          <small>{t('written-in') + ': ' + t(`language-${review.lang}`)}</small>
        )}
        {reactStringReplace(review.text, '\n', (v, k) => <br key={k} />)}
      </p>
    )}
  </div>
)

export default GameUserReviewEntry
