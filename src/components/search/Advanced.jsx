/* exported React */
import React, { useReducer } from 'react'
import { produce } from 'immer'

import SelectBox from '../shared/SelectBox'
import Icon from '../shared/Icon'
import { historyTPush } from '../../utils/history'
import t from '../../utils/i18n'

import './Advanced.styl'

const initialInternalState = {
  company: '',
  review: '',
  names: '',
  scores: {
    from: '',
    to: ''
  },
  sizes: {
    from: '',
    to: ''
  },
  years: {
    from: '',
    to: ''
  }
}

const INTERNAL_ACTIONS = {
  CHANGE_PLAIN: 'CHANGE_PLAIN',
  CHANGE_RANGE: 'CHANGE_RANGE'
}

const internalReducer = produce((draft, action) => {
  if (action.type === INTERNAL_ACTIONS.CHANGE_PLAIN) {
    draft[action.field] = action.value
  } else if (action.type === INTERNAL_ACTIONS.CHANGE_RANGE) {
    draft[action.field][action.fromOrTo] = action.value
  }
})

const AdvancedSearch = ({ isVisible, onHide }) => {
  const [internalState, internalDispatch] = useReducer(internalReducer, initialInternalState)

  /* pre-defined options */

  const options = {
    years: [],
    scores: [],
    sizes: [
      1, 2, 3, 4, 6, 8, 8.5, 10, 12, 16, 20, 24, 32, 40, 48, 64, 72
    ]
  }
  for (let y = 1989; y < 2001; y++) {
    options.years.push(y)
  }
  for (let s = 3.0; s <= 10.0; s = s + 0.5) {
    options.scores.push(s)
  }

  /* handler */

  const handleSubmitForm = (ev) => {
    ev.preventDefault()
    historyTPush({ key: 'advanced-search', query: internalState })
  }

  /* sub-renders */

  const renderDoubleSelector = (field) => ['from', 'to'].map((fromOrTo, index) => (
    <SelectBox
      key={fromOrTo}
      name={`${field}${index + 1}`}
      subLabel={t(fromOrTo)}
      value={internalState[field][fromOrTo]}
      onChange={(e) => internalDispatch({
        type: 'CHANGE_RANGE',
        fromOrTo,
        field,
        value: e.target.value
      })}
    >
      <option value=''>{t('any')}</option>
      {options[field].map(s => <option value={s} key={s}>{s}</option>)}
    </SelectBox>
  ))

  const renderInput = (field) => (
    <input
      type='search'
      autoComplete='off'
      name={field}
      value={internalState[field]}
      onChange={(e) => internalDispatch({
        type: 'CHANGE_PLAIN',
        field,
        value: e.target.value
      })}
    />
  )

  /* main render */

  return (
    <div className='wrap-advanced'>
      {isVisible && (
        <a
          onClick={() => onHide()}
          className='hide-advanced ball btn'
          alt={t('back-to-simple-search')}
          title={t('back-to-simple-search')}
        >
          <Icon type='x' size='24' />
        </a>
      )}
      <form className={isVisible ? '' : ' hidden'} onSubmit={handleSubmitForm}>
        <div className='advanced-search'>
          <div className='group'>
            <label htmlFor='names'>{t('names')}</label>
            {renderInput('names')}
          </div>
          <div className='group select-group'>
            <label htmlFor='years1'>{t('years')}</label>
            {renderDoubleSelector('years')}
          </div>
          <div className='group select-group'>
            <label htmlFor='scores1'>{t('editor-score')}</label>
            {renderDoubleSelector('scores')}
          </div>
          <div className='group'>
            <label htmlFor='company'>{t('company')}</label>
            {renderInput('company')}
          </div>
          <div className='group'>
            <label htmlFor='review'>{t('on-review')}</label>
            {renderInput('review')}
          </div>
          <div className='group select-group'>
            <label htmlFor='sizes1'>{t('sizes')}</label>
            {renderDoubleSelector('sizes')}
          </div>
          {/*
            <div className="group">
              <label>&nbsp;</label>
              <button className="secondary reset" type="reset">{t('reset')}</button>
            </div>
          */}
        </div>
        <button className='btn ball submit-advanced' type='submit'>
          <Icon size='22' type='search' />
        </button>
      </form>
    </div>
  )
}

export default AdvancedSearch
