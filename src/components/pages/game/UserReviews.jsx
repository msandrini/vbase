import React, { useState } from 'react'

import GameUserReviewsOverlay from './userReviews/Overlay'
import Icon from '../../shared/Icon'

import t from '../../../utils/i18n'
import './UserReviews.styl'

const getKeyForActionText = reviews => reviews ? 'read-write' : 'write-a-review'
const getIcon = reviews => reviews ? 'plus' : 'pencil'
const getNumReviews = reviews => (reviews && reviews.timesReviewed) || 0

const GameUserReviews = ({ userReviews, gameId }) => {
  const [isOverlayVisible, setOverlayVisibility] = useState(false)
  return (
    <div className='user-reviews'>
      <a onClick={() => setOverlayVisibility(true)}>
        <span className='first-text'>
          {t('reviewed-by')}
          {' '}
          {getNumReviews(userReviews) ? (
            <strong>
              {getNumReviews(userReviews) + ' ' + t('user', { plural: getNumReviews(userReviews) })}
            </strong>
          ) : t('no-users')}
        </span>
        <span className='mobile-text'>
          {t('review', { plural: getNumReviews(userReviews) })}
          {' '}
          ({getNumReviews(userReviews)})
        </span>
        <span className='action-text'>
          {t(getKeyForActionText(getNumReviews(userReviews)))}
        </span>
        <span className={'btn ball ' + getIcon(getNumReviews(userReviews))}>
          <Icon type={getIcon(getNumReviews(userReviews))} size='11' />
        </span>
      </a>
      <GameUserReviewsOverlay
        gameId={gameId}
        isVisible={isOverlayVisible}
        onHide={() => setOverlayVisibility(false)}
      />
    </div>
  )
}

export default GameUserReviews
