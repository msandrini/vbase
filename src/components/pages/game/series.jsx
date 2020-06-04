import React from 'react'

import Icon from '../../shared/Icon'
import TLink from '../../shared/TLink'
import InfoLink from '../../shared/InfoLink'

import t from '../../../utils/i18n'
import './Series.styl'

export const getLinkObj = id => ({ key: 'game', rest: id })

const renderEntryLink = (game, currentGameId) => (
  <li key={game._id}>
    {game._id !== currentGameId ? (
      <TLink className='btn ball' to={getLinkObj(game._id)}>
        <Icon type='next' size='10' />
      </TLink>
    ) : (
      <span className='ball'>
        <Icon type='check' size='10' />
      </span>
    )}
    {game._id !== currentGameId ? (
      <TLink to={getLinkObj(game._id)}>{game.title}</TLink>
    ) : (
      <span>{game.title}</span>
    )}
  </li>
)

// TODO improve logic (after everything more important)

const GameSeries = ({ series, seriesGames, currentGameId }) => (
  <div className='series'>
    {series && (
      <h6>
        {t('series')}
        {series.map(s => (
          <InfoLink key={s.id} infoKey='series' id={s.id}>
            {s.title}
          </InfoLink>
        ))}
        {series && seriesGames.total && (
          <small>
            {seriesGames.total}
            {' '}
            {t('game', { plural: seriesGames.total })}
            {' '}
            {t('from-this-series', {
              plural: {
                comparison: seriesGames.total,
                key: 'from-these-series'
              }
            })}
          </small>
        )}
      </h6>
    )}
    {series && seriesGames.games && (
      <ul>
        {seriesGames.games.map(g => renderEntryLink(g, currentGameId))}
      </ul>
    )}
  </div>
)

export default GameSeries
