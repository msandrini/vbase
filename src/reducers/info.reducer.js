import { INFO } from '../utils/constants'

const initialState = {
  isLoading: false,
  hasFailed: false,
  subject: '',
  key: '',
  title: '',
  content: '',
  imageExists: false
}

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case INFO.CONTENTREQUESTED:
      return { ...state, isLoading: false, subject: action.subject, key: action.key }

    case INFO.FAILEDLOADING:
      return { ...state, isLoading: false, hasFailed: true }

    case INFO.CONTENTRETRIEVED:
      return {
        ...state,
        isLoading: false,
        title: action.title,
        content: action.content,
        imageExists: action.imageExists
      }

      // case INFO.BACKREQUESTED - triggers saga

    default:
      return state
  }
}

export default infoReducer
