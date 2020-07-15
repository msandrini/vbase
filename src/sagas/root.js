import { takeLatest } from 'redux-saga/effects'

import resultsEffects from './results.saga'
import contactEffects from './contact.saga'
import gameEffects from './game.saga'
import infoEffects from './info.saga'
import userInputEffects from './user-input.saga'

import { RESULTS, CONTACT, GAME, INFO, USERINPUT } from '../utils/constants'

const rootSaga = function * () {
  yield takeLatest(RESULTS.REQUESTED, resultsEffects.request)
  yield takeLatest(RESULTS.REQUESTED, resultsEffects.request)
  yield takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage)

  yield takeLatest(CONTACT.SUBMITTED, contactEffects.send)
  yield takeLatest(CONTACT.SENTSUCCESFULLY, contactEffects.afterSent)

  yield takeLatest(GAME.REQUESTEDINFO, gameEffects.requestInfo)
  yield takeLatest(GAME.FAILEDONURL, gameEffects.triggerBack)

  yield takeLatest(INFO.CONTENTREQUESTED, infoEffects.requestContent)

  yield takeLatest(USERINPUT.LISTREQUESTED, userInputEffects.getReviews)
  yield takeLatest(USERINPUT.SUBMITTED, userInputEffects.submitNewReview)
}

export default rootSaga
