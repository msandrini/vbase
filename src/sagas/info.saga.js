import { call, put } from 'redux-saga/effects'

import { sendCall, warnOnNetworkError } from '../utils/resources'
import { createAction } from '../utils/store'

import { INFO, API_URL } from '../utils/constants'

const infoEffects = {

  requestContent: function * (action) {
    try {
      const feedback = yield call(sendCall, `${API_URL}info-entry/${action.subject}/${action.key}`)
      if (feedback.status === 200) {
        yield put(createAction(INFO.CONTENTRETRIEVED)({
          title: (feedback.data.title || feedback.data.name),
          content: feedback.data.text,
          imageExists: feedback.data.imageExists
        }))
      } else {
        yield put(createAction(INFO.FAILEDLOADING)({ feedback }))
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      yield put(createAction(INFO.FAILEDLOADING)({ feedback: e }))
      warnOnNetworkError(e)
    }
  }

}

export default infoEffects
