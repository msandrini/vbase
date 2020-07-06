import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router'
import qs from 'qs'

import PageTitle from '../shared/PageTitle'
import Title from '../shared/Title'
import Spinner from '../shared/Spinner'
import Icon from '../shared/Icon'
import FailureMessage from '../shared/FailureMessage'
import Pagination from '../shared/Pagination'
import GameLink from '../shared/GameLink'

import { goBack } from '../../utils/history'
import { createAction } from '../../utils/store'
import { joinText } from '../../utils/string'
import { RESULTS, ITEMS_PER_PAGE } from '../../utils/constants'

import t from '../../utils/i18n'
import './Results.styl'

const getComposedSearchDetails = query => { console.log(query)
  const searchDetails = []
  for (const obj of ['scores', 'sizes', 'years']) {
    if (!query[obj]) {
      query[obj] = {}
    }
  }
  if (query.company) {
    searchDetails.push(t('from-x', { replacements: query.company }))
  }
  if (query.review) {
    searchDetails.push(t('having-x-on-review', { replacements: query.review }))
  }
  if (query.genre) {
    searchDetails.push(t('from-genre-x', { replacements: query.genre }))
  }
  if (query.names) {
    searchDetails.push(t('named-x', { replacements: query.names }))
  }
  if (query.series) {
    searchDetails.push(t('from-series-x', { replacements: query.series }))
  }
  if (query.scores.from && query.scores.to) {
    searchDetails.push(t('scored-between-x-and-y', { replacements: [query.scores.from, query.scores.to] }))
  } else if (query.scores.from) {
    searchDetails.push(t('scored-x-at-least', { replacements: query.scores.from }))
  } else if (query.scores.to) {
    searchDetails.push(t('scored-up-to-x', { replacements: query.scores.to }))
  }
  if (query.sizes.from && query.sizes.to) {
    searchDetails.push(t('with-cart-size-between-x-and-y', { replacements: [query.sizes.from, query.sizes.to] }))
  } else if (query.sizes.from) {
    searchDetails.push(t('min-cart-size-x', { replacements: query.sizes.from }))
  } else if (query.sizes.to) {
    searchDetails.push(t('max-cart-size-x', { replacements: query.sizes.to }))
  }
  if (query.years.from && query.years.to) {
    searchDetails.push(t('released-from-x-to-y', { replacements: [query.years.from, query.years.to] }))
  } else if (query.years.from) {
    searchDetails.push(t('released-from-x', { replacements: query.years.from }))
  } else if (query.years.to) {
    searchDetails.push(t('released-until-x', { replacements: query.years.to }))
  }

  if (searchDetails.length) {
    return t('searching-for-games') + ' ' + joinText(searchDetails)
  }
  return t('advanced-search')
}

const getTitle = (params, query) => {
  if (query && Object.keys(query).length) {
    const composedSearchDetails = getComposedSearchDetails(query)
    return [
      <Title key='title' main={t('showing-results')} details={[composedSearchDetails]} />,
      <PageTitle key='pagetitle' title={t('advanced-search')} />
    ]
  } else if (params.names) {
    return [
      <Title key='title' main={t('showing-results')} sub={t('searching-for-x', { replacements: params.names })} />,
      <PageTitle key='pagetitle' title={t('basic-search')} />
    ]
  }
  return [
    <Title key='title' main={t('showing-all-games')} sub='' />,
    <PageTitle key='pagetitle' title={t('all-games')} />
  ]
}

const ResultsPage = () => {
  const { games, total, isLoading, hasFailed } = useSelector(state => state.results)
  const params = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const query = qs.parse(location.search.substr(1))

  const requestAction = createAction(RESULTS.REQUESTED)
  const requestPageAction = createAction(RESULTS.PAGEREQUESTED)

  const getResults = () => {
    dispatch(requestAction({ params, query }))
  }

  useEffect(getResults, [params.names, location.search, params.page])

  const handlePageChange = (page) => {
    dispatch(requestPageAction({ page, params, query }))
  }

  /* inner content render */

  const page = parseInt(params.page, 10) || 1
  const currentFirstItem = ITEMS_PER_PAGE * page
  const isLastPage = (currentFirstItem + ITEMS_PER_PAGE) > total
  const lastItemFromPage = isLastPage ? total : currentFirstItem + ITEMS_PER_PAGE
  const renderContent = () => {
    if (isLoading) return <Spinner />
    if (hasFailed) return <FailureMessage />
    if (!games.length) {
      return (
        <div className='no-results'>
          <p>{t('no-results-found')}</p>
          <div className='button-wrapper'>
            <button className='btn ball' title={t('go-back')} onClick={() => goBack()}>
              <Icon type='prev' size='28' />
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Pagination currentPage={page} results={total} onGoToPage={handlePageChange} />
        <aside className='summary'>
          {t('showing-x-to-y-from', { replacements: [currentFirstItem, lastItemFromPage] })}
          <strong> {total} </strong>
          {t('result', { plural: total })}
        </aside>
        <section>
          {games.map(game => <GameLink key={game._id} game={game} />)}
        </section>
        <Pagination currentPage={page} results={total} onGoToPage={handlePageChange} />
      </div>
    )
  }

  /* final render */

  return (
    <div className='results'>
      {getTitle(params, query)}
      {renderContent()}
    </div>
  )
}

export default ResultsPage
