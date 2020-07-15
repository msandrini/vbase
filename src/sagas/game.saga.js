import { call, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router-dom'

import { sendCall, warnOnNetworkError } from '../utils/resources'
import { createAction } from '../utils/store'

import { GAME, API_URL } from '../utils/constants'
import t from '../utils/i18n'

const gameEffects = {

  requestInfo: function * (action) {
    try {
      const feedback = yield call(sendCall, API_URL + 'game-entry/' + action.id)
      if (feedback.status === 200) {
        yield put(createAction(GAME.INFORETRIEVED)({ info: feedback.data }))
        if (feedback.data.series && feedback.data.series.length) {
          // Get related games (series)
          const seriesIds = feedback.data.series.map(s => s.id)
          const feedbackSeries = yield call(sendCall, API_URL + 'games/from-series/' + seriesIds.join(','))
          yield put(createAction(GAME.RELATEDGAMESRETRIEVED)({ info: feedbackSeries.data }))
        }
      } else {
        yield put(createAction(GAME.FAILEDLOADING)({ feedback }))
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      if (e.toString().indexOf('404') !== -1) {
        yield put(createAction(GAME.FAILEDLOADING)({ feedback: t('game-not-found') }))
      } else {
        yield put(createAction(GAME.FAILEDLOADING)({ feedback: e }))
        warnOnNetworkError(e)
      }
    }
  },

  triggerBack: function * (action) {
    window.alert(t('game-not-found'))
    browserHistory.goBack()
  }

}

export default gameEffects
