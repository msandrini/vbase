import React, { useState } from 'react'

import AdvancedSearch from './search/Advanced'
import Icon from './shared/Icon'
import { historyTPush } from '../utils/history'
import t from '../utils/i18n'
import './Search.styl'

const Search = () => {
  const [advancedSearchIsVisible, setAdvancedSearchVisibility] = useState(false)
  const [searchFieldContent, setSearchFieldContent] = useState('')

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
    const value = encodeURIComponent(searchFieldContent)
    historyTPush({ key: 'search', rest: value })
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
