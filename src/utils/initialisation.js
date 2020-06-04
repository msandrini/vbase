import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

/* Saga root */
import rootSaga from '../sagas/root'

/* Reducers */
import resultsReducer from '../reducers/results.reducer'
import contactReducer from '../reducers/contact.reducer'
import gameReducer from '../reducers/game.reducer'
import infoReducer from '../reducers/info.reducer'
import userInputReducer from '../reducers/user-input.reducer'

export const initReduxMiddlewaresAndGetStore = () => {
  /* Middleware routines */
  const combinedReducers = combineReducers({
    contact: contactReducer,
    results: resultsReducer,
    game: gameReducer,
    info: infoReducer,
    userInput: userInputReducer
  })
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware))

  const store = createStore(combinedReducers, composeEnhancers)
  sagaMiddleware.run(rootSaga)

  return store
}

/* Scroll Optimisation */

let timer
export const optimizeScroll = () => {
  clearTimeout(timer)
  if (!document.body.classList.contains('disable-hover')) {
    document.body.classList.add('disable-hover')
  }
  timer = setTimeout(() => {
    document.body.classList.remove('disable-hover')
  }, 500)
}
