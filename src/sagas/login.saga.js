import { call, put } from 'redux-saga/effects'

import { warnOnNetworkError, sendCall } from '../utils/resources'
import { createAction } from '../utils/store'

import { LOGIN, LOGOUT, API_URL } from '../utils/constants'

export const loginEffects = {

  login: function * (action) {
    try {
      const feedback = yield call(sendCall, `${API_URL}user`, 'post', action.userInfo)
      if (feedback.status === 200) {
        yield put(createAction(LOGIN.PERFORMED)({ userInfo: action.userInfo }))
      } else {
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      warnOnNetworkError(e)
    }
  },

  checkLogin: function * (action) {
    try {
      const feedback = yield call(sendCall, `${API_URL}user`)
      if (feedback.status === 200) {
        if (feedback.data) {
          yield put(createAction(LOGIN.PERFORMED)({ userInfo: feedback.data }))
        }
      } else {
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      warnOnNetworkError(e)
    }
  },

  logout: function * (action) {
    try {
      const feedback = yield call(sendCall, `${API_URL}user`, 'delete')
      if (feedback.status === 200) {
        yield put(createAction(LOGOUT.PERFORMED)())
      } else {
        warnOnNetworkError(feedback)
      }
    } catch (e) {
      warnOnNetworkError(e)
    }
  }
}

export default loginEffects
