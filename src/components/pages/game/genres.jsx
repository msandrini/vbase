import React from 'react'

import InfoLink from '../../shared/InfoLink'

import t, { lang } from '../../../utils/i18n'
import './Genres.styl'

const renderEntries = (genres) => {
  if (genres.length === 1 && genres[0] === null) {
    return <small>{t('none-registered')}</small>
  }
  return genres.map(g => g && g.id && (
    <InfoLink id={g.id} infoKey='genre' key={g.id}>
      {g.title[lang]}
    </InfoLink>
  ))
}

const GameGenres = ({ genres }) => (
  <div className='genres'>
    <small>{t('genre', { plural: genres.length })}</small>
    {renderEntries(genres)}
  </div>
)

export default GameGenres
