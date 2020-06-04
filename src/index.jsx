import 'regenerator-runtime/runtime'

/* React Libs */
import React from 'react'
import ReactDOM from 'react-dom'

/* Additional React Libs */
import { Provider } from 'react-redux'

/* Utils */
import { optimizeScroll, initReduxMiddlewaresAndGetStore } from './utils/initialisation'

/* Container */
import AppWrapper from './components/AppWrapper'

/* Middleware routines */

const store = initReduxMiddlewaresAndGetStore()
ReactDOM.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('app')
)

/* Other */
window.addEventListener('scroll', optimizeScroll, false)
