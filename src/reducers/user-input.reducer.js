import { USERINPUT } from '../utils/constants'

const initialState = {
  reviews: [],
  isLoading: false,
  listFailed: false,
  isSending: false,
  sendFailed: false
}

const userInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERINPUT.LISTREQUESTED:
      return { ...state, isLoading: true }

    case USERINPUT.LISTRETRIEVED:
      return { ...state, isLoading: false, reviews: action.feedback }

    case USERINPUT.LISTFAILED:
      return { ...state, isLoading: false, listFailed: true }

    case USERINPUT.SUBMITTED:
      return { ...state, isSending: true, fields: action.fields }

    case USERINPUT.ACCEPTED:
      return { ...state, isSending: false }

    case USERINPUT.SENDFAILED:
      return { ...state, isSending: false, sendFailed: true }

    default:
      return state
  }
}

export default userInputReducer
