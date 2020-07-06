import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import ResultsPage from './pages/Results'
import TermsPage from './pages/Terms'
import ContactPage from './pages/Contact'
import GamePage from './pages/Game'
import InfoPage from './pages/Info'
import Header from './Header'
import Footer from './Footer'
import AllIcons from './AllIcons'

import t from '../utils/i18n'
import './AppWrapper.styl'

const tURL = (key) => '/' + t(`url__${key}`)

/* Router mapping */
window.onpopstate = () => {
  if (window.location.pathname === tURL('other-language-root')) {
    document.location.reload()
  }
}

const AppWrapper = () => (
  <div className='app-wrapper'>
    <AllIcons />
    <BrowserRouter>
      <Header />
      <div className='pages'>
        <Switch>
          <Redirect exact from='/' to={tURL('all-games')} />
          <Route path={tURL('all-games') + '/:page?'}><ResultsPage /></Route>
          <Route path={tURL('search') + '/:names/:page?'}><ResultsPage /></Route>
          <Route path={tURL('advanced-search') + '/:page?'}><ResultsPage /></Route>
          <Route path={tURL('game') + '/:game'}><GamePage /></Route>
          <Route path={tURL('info') + '/:subject/:key'}><InfoPage /></Route>
          <Route path={tURL('terms-privacy')}><TermsPage /></Route>
          <Route path={tURL('contact')}><ContactPage /></Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  </div>
)

export default AppWrapper
