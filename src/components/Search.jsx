import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import AdvancedSearch from './search/Advanced'
import { createAction } from '../utils/store'
import { SEARCH } from '../utils/constants'

import './Search.styl'
import t from '../utils/i18n'
import Icon from './shared/Icon'

const Search = () => {
  const [advancedSearchIsVisible, setAdvancedSearchVisibility] = useState(false)
  const [searchFieldContent, setSearchFieldContent] = useState('')
  const dispatch = useDispatch()

  const submitSimpleSearch = createAction(SEARCH.SUBMITTEDSIMPLE)

  const handleToggleAdvancedSearch = () => {
    if (!advancedSearchIsVisible) {
      document.getElementById('simpleSearchValue').value = ''
    }
    setAdvancedSearchVisibility(value => !value)
  }
  const handleChangeGameField = (ev) => {
    setSearchFieldContent(ev.target.value)
  }
  const handleSubmitBasicSearch = (ev) => {
    ev.preventDefault()
    dispatch(submitSimpleSearch({ value: searchFieldContent }))
  }

  return (
    <div className='search'>
      <form className='basic-search' onSubmit={handleSubmitBasicSearch}>
        <input
          type='search'
          placeholder={t(advancedSearchIsVisible ? 'search-for-a-game-below' : 'search-for-a-game')}
          id='simpleSearchValue'
          disabled={advancedSearchIsVisible}
          onChange={handleChangeGameField}
          autoComplete='off'
          value={searchFieldContent}
        />
        <button type='submit' className='ball' disabled={!searchFieldContent}>
          <Icon type='search' size='24' />
        </button>
        {!advancedSearchIsVisible && (
          <a onClick={handleToggleAdvancedSearch} className='trigger-advanced'>
            {t('advanced-search')}
            <Icon size='9' type='plus' />
          </a>
        )}
      </form>
      <AdvancedSearch
        isVisible={advancedSearchIsVisible}
        onHide={handleToggleAdvancedSearch}
      />
    </div>
  )
}

export default Search
