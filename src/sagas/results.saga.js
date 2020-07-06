import { call, put } from 'redux-saga/effects'
import produce from 'immer'

import { sendCall, warnOnNetworkError } from '../utils/resources'
import { createAction } from '../utils/store'
import { historyTPush } from '../utils/history'

import { RESULTS, API_URL } from '../utils/constants'
import { lang } from '../utils/i18n'

const getCallName = (action) => {
  let page = 1
  if (action.params.page && !isNaN(parseInt(action.params.page, 10))) {
    page = action.params.page
  }
  // else if (action.query.page && !isNaN(parseInt(action.query.page, 10))) {
  //   page = action.query.page
  // }
  const isQueryEmpty = !!action.query && Object.keys(action.query).length === 0
  if (action.params.names) {
    const query = encodeURIComponent(action.params.names)
    return `${API_URL}games/by-names/${query}/${page}`
  } else if (action.query && !isQueryEmpty) {
    const query = { ...action.query, page, lang }
    return [`${API_URL}games/advanced`, query]
  } else {
    return `${API_URL}games/all/${page}`
  }
}

const resultsEffects = {

  request: function * (action) {
    const callFeedback = getCallName(action)

    try {
      let feedback
      if (typeof callFeedback === 'string') {
        feedback = yield call(sendCall, callFeedback)
      } else {
        const [callName, callData] = callFeedback
        feedback = yield call(sendCall, callName, 'post', callData)
      }
      if (feedback.status === 200) {
        yield put(createAction(RESULTS.RETRIEVED)({ feedback: feedback.data }))
      } else {
        yield put(createAction(RESULTS.FAILED)({ feedback }))
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      yield put(createAction(RESULTS.FAILED)({ feedback: e }))
      warnOnNetworkError(e)
    }
  },

  requestPage: function * (action) {
    const page = parseInt(action.page, 10)
    const getUrlArgs = () => {
      if (action.query && Object.keys(action.query).length) {
        const query = produce(action.query, draft => {
          delete draft.page
          delete draft.scores
          delete draft.sizes
          delete draft.years
          draft.page = page
        })
        return { key: 'advanced-search', query }
      }
      if (action.params.names) {
        const query = encodeURIComponent(action.params.names)
        return { key: 'search', rest: `${query}/${page}` }
      }
      return { key: 'all-games', rest: page }
    }
    historyTPush(getUrlArgs())
  }

}

export default resultsEffects
