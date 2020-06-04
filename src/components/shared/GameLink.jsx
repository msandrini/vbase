import React, { Component } from 'react'

import Scorebar from './Scorebar'
import { IMAGEGAME_URL } from '../../utils/constants'

import t, { lang } from '../../utils/i18n'
import './GameLink.styl'
import TLink from './TLink'

const getGenres = genres => {
  if (genres && genres[0]) {
    return genres[0][lang] + (genres[1] ? ' / ' + genres[1][lang] : '')
  }
  return ''
}
const getCompanies = companies =>
  companies[0] + (companies[1] ? ' / ' + companies[1] : '')

const getAka = game => {
  if (game.otherNames) {
    const namesComposed = []
    for (const n of game.otherNames) {
      namesComposed.push(n.name)
    }
    return namesComposed.join(' / ')
  }
  return ''
}
const getSpecialStatus = status => {
  if (status.substr(0, 5) === 'proto') {
    return t('prototype')
  } else if (status === 'released-unlicensed') {
    return t('unlicensed')
  } else if (status === 'hack') {
    return t('hack')
  }
  return ''
}
const getFirstImageUrl = id => `${IMAGEGAME_URL}${id}/1.png`

class GameLink extends Component {
  render () {
    const { game } = this.props
    return (
      <TLink className='game-link' to={{ key: 'game', rest: game._id }}>
        <figure><img src={getFirstImageUrl(game._id)} alt={game.title} /></figure>
        <div className='content'>
          <div className='aka'>{getAka(game)}</div>
          <h5>{game.title}</h5>
          <div className='supplementary-info'>
            <Scorebar score={game.editorScore} size='85' />
            {game.specialStatus && (
              <span className='special-status'>{getSpecialStatus(game.specialStatus)}</span>
            )}
            <strong>{getGenres(game.genreTitles)}</strong>
            {t('made-by')}
            {getCompanies(game.companyNames)}
          </div>
        </div>
      </TLink>
    )
  }
}

export default GameLink
