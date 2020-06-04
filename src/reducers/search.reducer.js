import { SEARCH } from '../utils/constants'

const initialState = {
  advancedVisible: false,
  fieldValueSimple: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SEARCH.SUBMITTEDSIMPLE - triggers saga

    case SEARCH.SUBMITTEDADVANCED:
      return { ...state, advancedVisible: false }

    default:
      return state
  }
}

export default searchReducer
