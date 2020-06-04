import React from 'react'

import InfoLink from '../../shared/InfoLink'
import t, { lang } from '../../../utils/i18n'
import './Genres.styl'

const GameGenres = props => (
  <div className='genres'>
    <small>{t('genre', { plural: props.genres.length })}</small>
    {props.genres.length === 1 && props.genres[0] === null && (
      <small>{t('none-registered')}</small>
    )}
    {props.genres.map(g => g && g.id && (
      <InfoLink id={g.id} infoKey='genre' key={g.id}>
        {g.title[lang]}
      </InfoLink>
    ))}
  </div>
)

export default GameGenres
