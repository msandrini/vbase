import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PageTitle from '../shared/PageTitle'
import Title from '../shared/Title'
import FailureMessage from '../shared/FailureMessage'
import Spinner from '../shared/Spinner'
import { GAME } from '../../utils/constants'
import { createAction } from '../../utils/store'

import GamePicture from './game/Picture'
import GameEditorScore from './game/EditorScore'
import GameUserScore from './game/UserScore'
import GamePlaces from './game/ReleasePlaces'
import GameEditorReview from './game/EditorReview'
import GameUserReviews from './game/UserReviews'
import GameSeries from './game/Series'
import GameMediaInfo from './game/MediaInfo'
import GameBasicInfo from './game/BasicInfo'
import GameGenres from './game/Genres'

import t, { lang } from '../../utils/i18n'
import './Game.styl'
import { useParams } from 'react-router'

// const infoTypes = ['year', 'companies', 'genres', 'size', 'series', 'addons', 'locals']
const getAggregateRatings = game => (game.userReviews && game.userReviews.averageScore)
  ? (game.editorScore + game.userReviews.averageScore) / 2 : game.editorScore
const getTimesReviewed = game => (game.userReviews && game.userReviews.timesReviewed)
  ? (1 + game.userReviews.timesReviewed) : 1

const renderSchemaTag = (game) => `{
  "@context": "http://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Marcos Sandrini Lemos"
  },
  "itemReviewed": {
    "@type": "VideoGame",
    "name": "${game.title}",
    "gamePlatform": "Super Nintendo Entrertainment System",
    "applicationCategory": "Game",
    "aggregateRating": {
      "bestRating": "10",
      "worstRating": "1",
      "ratingValue": "${getAggregateRatings(game)}",
      "ratingCount: "${getTimesReviewed(game)}"
    }
  },
  "reviewBody":"${game.editorReview[lang]}",
  "reviewRating": {
    "bestRating": "10",
    "worstRating": "1",
    "ratingValue": "${game.editorScore}"
  }
}`

const renderOtherNames = (otherNames) => {
  if (otherNames && otherNames.length) {
    return otherNames.map(entry => {
      return (
        <div className='other-name' key={entry.name}>
          <small>{t('onr__' + entry.reasonForName)}</small>
          <strong>{entry.name}</strong>
        </div>
      )
    })
  }
  return null
}

const GamePage = () => {
  const gameState = useSelector(state => state.game)
  const dispatch = useDispatch()
  const params = useParams()

  const requestAction = createAction(GAME.REQUESTEDINFO)
  const failedAction = createAction(GAME.FAILEDONURL)

  const gameId = params.game

  const getGameInfo = () => {
    const gameIdIsOk = /[a-z0-9-]+/.test(gameId)
    if (gameIdIsOk) {
      dispatch(requestAction({ id: gameId }))
    } else {
      dispatch(failedAction({ gameId }))
    }
  }

  useEffect(getGameInfo, [params.game])

  if (gameState.isLoading) {
    return (
      <>
        <Title main={t('loading-game-info')} />
        <Spinner />
      </>
    )
  }
  if (gameState.hasFailed) {
    return (
      <>
        <Title main={t('error')} />
        <FailureMessage message={gameState.hasFailed} />
      </>
    )
  }
  const { info: game, seriesGames } = gameState
  if (game && game.title) {
    return (
      <div>
        <PageTitle title={game.title + ` (${t('game')})`} />
        <Title main={<strong>{game.title}</strong>} details={renderOtherNames(game.otherNames)} />
        <div id='game-info'>
          {game.specialStatus && (
            <span className='special-status'>{t('sps__' + game.specialStatus)}</span>
          )}
          <GamePicture gameId={gameId} />
          <div className='main-box'>
            <GamePlaces releasePlaces={game.releasePlaces} otherNames={game.otherNames} />
            <GameEditorScore score={game.editorScore} />
            <GameUserScore reviews={game.userReviews} />
            <GameEditorReview editorReview={game.editorReview} />
            <GameUserReviews userReviews={game.userReviews} gameId={gameId} />
          </div>
          <div className='outer-box'>
            <GameBasicInfo year={game.year} companies={game.companies} />
            <GameGenres genres={game.genres} />
          </div>
          <GameSeries
            series={game.series}
            seriesGames={seriesGames}
            currentGameId={gameId}
          />
          <GameMediaInfo mediaSize={game.cartridgeSize} addOns={game.addOns} />
        </div>
        <script type='application/ld+json'>
          {renderSchemaTag(game)}
        </script>
      </div>
    )
  }
  return null
}

export default GamePage
