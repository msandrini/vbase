import React, { useState, useEffect } from 'react'

import './Pagination.styl'
import t from '../../utils/i18n'
import Icon from './Icon'
import SelectBox from './SelectBox'

import { ITEMS_PER_PAGE } from '../../utils/constants'

const Pagination = ({ results, currentPage, onGoToPage }) => {
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [pages, setPages] = useState([]) // pages + pagesArray

  const buildPagination = () => {
    const pagesArray = []
    const numberOfPages = Math.ceil(results / ITEMS_PER_PAGE)
    for (let p = 1; p <= numberOfPages; p++) {
      pagesArray.push(p)
    }
    setHasPrev(currentPage !== 1)
    setHasNext(currentPage < numberOfPages)
    setPages(pagesArray)
  }

  useEffect(buildPagination, [results, currentPage])

  const pageInt = parseInt(currentPage, 10)
  return (
    <aside className='pagination'>
      <a
        className={'ball btn extremes first' + (hasPrev ? '' : ' inactive')}
        title={t('first-page')}
        onClick={() => hasPrev && onGoToPage(1)}
      >
        <Icon size='9' type='first' />
      </a>
      <a
        className={'ball btn sequence prev' + (hasPrev ? '' : ' inactive')}
        title={t('previous-page')}
        onClick={() => hasPrev && onGoToPage(pageInt - 1)}
      >
        <Icon size='17' type='prev' />
      </a>
      <div className='ball btn'>
        <SelectBox onChange={(ev) => onGoToPage(ev.target.value)} value={currentPage}>
          {pages.map(p => <option key={p} value={p}>{p}</option>)}
        </SelectBox>
      </div>
      <a
        className={'ball btn sequence next' + (hasNext ? '' : ' inactive')}
        title={t('next-page')}
        onClick={() => hasNext && onGoToPage(pageInt + 1)}
      >
        <Icon size='17' type='next' />
      </a>
      <a
        className={'ball btn extremes last' + (hasNext ? '' : ' inactive')}
        title={t('last-page')}
        onClick={() => hasNext && onGoToPage(pages.length)}
      >
        <Icon size='9' type='last' />
      </a>
    </aside>
  )
}

export default Pagination
