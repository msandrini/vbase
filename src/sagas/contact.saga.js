import { call, put } from 'redux-saga/effects'

import { sendCall, warnOnNetworkError } from '../utils/resources'
import { createAction } from '../utils/store'
import { historyTPush } from '../utils/history'

import { CONTACT, API_URL } from '../utils/constants'
import t from '../utils/i18n'

const contactEffects = {

  send: function * (action) {
    try {
      const feedback = yield call(sendCall, API_URL + 'contact', 'post', action.fields)
      if (feedback.status === 200) {
        yield put(createAction(CONTACT.SENTSUCCESFULLY)({ feedback: feedback.data }))
      } else {
        yield put(createAction(CONTACT.FAILED)({ feedback }))
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      yield put(createAction(CONTACT.FAILED)({ feedback: e }))
      warnOnNetworkError(e)
    }
  },

  afterSent: function * (action) {
    window.alert(t('message-sent-successfully'))
    historyTPush({ key: 'all-games' })
  }

}

export default contactEffects
