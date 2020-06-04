import { takeLatest } from 'redux-saga/effects'

import resultsEffects from './results.saga'
import contactEffects from './contact.saga'
import gameEffects from './game.saga'
import infoEffects from './info.saga'
import userInputEffects from './user-input.saga'

import { RESULTS, CONTACT, GAME, INFO, USERINPUT } from '../utils/constants'

const rootSaga = function * () {
  yield [
    takeLatest(RESULTS.REQUESTED, resultsEffects.request),
    takeLatest(RESULTS.PAGEREQUESTED, resultsEffects.requestPage),

    takeLatest(CONTACT.SUBMITTED, contactEffects.send),
    takeLatest(CONTACT.SENTSUCCESFULLY, contactEffects.afterSent),

    takeLatest(GAME.REQUESTEDINFO, gameEffects.requestInfo),
    takeLatest(GAME.FAILEDONURL, gameEffects.triggerBack),
    takeLatest(GAME.CHANGEIMAGEREQUESTED, gameEffects.changeImage),

    takeLatest(INFO.CONTENTREQUESTED, infoEffects.requestContent),

    takeLatest(USERINPUT.LISTREQUESTED, userInputEffects.getReviews),
    takeLatest(USERINPUT.SUBMITTED, userInputEffects.submitNewReview)
  ]
}

export default rootSaga
