import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import Icon from '../shared/Icon'

import { lang } from '../../utils/i18n'
import './TopLinks.styl'
import TLink from '../shared/TLink'

const PATH_HOME = { en: 'all-games', 'pt-br': 'todos-os-jogos' }

const flags = [
  { lang: 'en', classCode: 'uk', title: 'English Version', iconSize: 18 },
  { lang: 'pt-br', classCode: 'br', title: 'Versão em Português', iconSize: 36 }
]

const TopLinks = () => {
  const location = useLocation()
  const history = useHistory()

  const goToLang = langToGo => {
    history.push('/' + PATH_HOME[langToGo])
    window.location.reload()
  }

  const renderFlag = flag => {
    if (lang === flag.lang) return null
    return (
      <a
        onClick={() => goToLang(flag.lang)}
        className={`flag btn ball flag-${flag.classCode}`}
        title={flag.title}
        key={flag.lang}
      >
        <Icon type={`flag-${flag.classCode}`} size={flag.size} />
      </a>
    )
  }

  const renderLinkToAnotherLanguage = () => {
    if (location.pathname.includes(PATH_HOME[lang])) return null
    return (
      <>
        <span className='line' />
        <TLink className='home ball btn' to='all-games' titleKey='back-to-all-games'>
          <Icon type='house' size='22' />
        </TLink>
      </>
    )
  }

  return (
    <aside id='top-links'>
      {renderLinkToAnotherLanguage()}
      {flags.map(flag => renderFlag(flag))}
    </aside>
  )
}

export default TopLinks
