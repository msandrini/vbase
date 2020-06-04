import { put } from 'redux-saga/effects'
import { SEARCH } from '../utils/constants'
import { createAction } from '../utils/store'
import { historyTPush } from '../utils/history'

const filterForUrl = str => encodeURIComponent(str)

const searchEffects = {

  reset: function * () {
    yield put(createAction(SEARCH.RESETFIELDREQUESTED)())
  },

  simple: function * (action) {
    const value = filterForUrl(action.value)
    historyTPush({ key: 'search', rest: `${value}` })
  },

  advanced: function * (action) {
    historyTPush({ key: 'advanced-search', query: action.data })
  }

}

export default searchEffects
