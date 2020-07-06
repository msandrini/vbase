import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GameUserReviewEntry from './overlay/Entry'
import GameUserReviewForm from './overlay/Form'

import Icon from '../../../shared/Icon'
import t from '../../../../utils/i18n'
import './Overlay.styl'
import { USERINPUT } from '../../../../utils/constants'
import { createAction } from '../../../../utils/store'

const GameUserReviewsOverlay = ({ gameId, isVisible, onHide }) => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.userInput.reviews)
  const isLoading = useSelector(state => state.userInput.isLoading)
  const requestReviewsAction = createAction(USERINPUT.LISTREQUESTED)

  useEffect(() => {
    const classList = document.body.classList
    if (isVisible) {
      classList.add('overlayed')
      dispatch(requestReviewsAction({ gameId }))
    } else {
      classList.remove('overlayed')
    }
  }, [isVisible])

  const handleCloseButtonClick = () => {
    onHide()
  }

  const handleOverlayClick = (e) => {
    e.stopPropagation()
    if (e.target.id === 'user-reviews-overlay') {
      onHide()
    }
  }

  return (
    <div
      id='user-reviews-overlay'
      onClick={handleOverlayClick}
      className={isVisible ? '' : 'inactive'}
    >
      <div className='window'>
        {isLoading ? <h5>{t('loading')}</h5> : (
          <>
            <a className='btn ball close' onClick={handleCloseButtonClick}>
              <Icon type='x' size='24' />
            </a>
            <h5>{t('user-reviews-for-this-game')}
              {reviews.length > 0 && (
                <small>
                  {reviews.length + ' ' + t('review', { plural: reviews.length })}
                </small>
              )}
            </h5>
            {reviews.length > 0 && (
              <ul>
                {reviews.map((review, key) => (
                  <li key={key}>
                    <GameUserReviewEntry review={review} />
                  </li>
                ))}
              </ul>
            )}
            {reviews.length === 0 && (
              <div className='no-reviews'>{t('no-reviews')}</div>
            )}
            <GameUserReviewForm gameId={gameId} />
          </>
        )}
      </div>
    </div>
  )
}

// const mapStateToProps = state => ({
//   isLoading: state.userInput.isLoading,
//   isSending: state.userInput.isSending,
//   reviews: state.userInput.reviews,
//   listFailed: state.userInput.listFailed,
//   sendFailed: state.userInput.sendFailed,
//   ownScore: state.userInput.ownScore,
//   ownText: state.userInput.ownText,
//   isLoggedIn: state.login.loggedIn,
//   gameId: state.game.gameId
// })

// const mapDispatchToProps = {
//   submitAction: createAction(USERINPUT.SUBMITTED),
//   changeScoreAction: createAction(USERINPUT.SCORECHANGED),
//   changeTextAction: createAction(USERINPUT.TEXTCHANGED)
// }

export default GameUserReviewsOverlay
