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

/* Router mapping */
window.onpopstate = () => {
  if (window.location.pathname === '/' + t('url__other-language-root')) {
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
          <Redirect from='/' to={t('url__all-games')} />
          <Route path={t('url__all-games') + '(/:page)'} component={ResultsPage} />
          <Route path={t('url__search') + '/:names(/:page)'} component={ResultsPage} />
          <Route path={t('url__advanced-search') + '(/:page)'} component={ResultsPage} />
          <Route path={t('url__game') + '/:game'} component={GamePage} />
          <Route path={t('url__info') + '/:subject/:key'} component={InfoPage} />
          <Route path={t('url__terms-privacy')} component={TermsPage} />
          <Route path={t('url__contact')} component={ContactPage} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  </div>
)

export default AppWrapper
