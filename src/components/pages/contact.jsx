import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'

import PageTitle from '../shared/PageTitle'
import Title from '../shared/Title'
import Icon from '../shared/Icon'
import Spinner from '../shared/Spinner'
import { CONTACT } from '../../utils/constants'
import { createAction } from '../../utils/store'

import t from '../../utils/i18n'
import './Contact.styl'

const initialInternalState = {
  name: '',
  email: '',
  message: ''
}

const internalReducer = produce((draft, action) => {
  switch (action.type) {
    case 'CHANGE':
      draft[action.field] = action.value
  }
})

const ContactPage = () => {
  const [internalState, internalDispatch] = useReducer(internalReducer, initialInternalState)
  const { isLoading, failed } = useSelector(state => state.contact)
  const dispatch = useDispatch()

  const submitAction = createAction(CONTACT.SUBMITTED)
  const failAction = createAction(CONTACT.FAILED)

  const handleSubmitForm = (ev) => {
    ev.preventDefault()
    if ((internalState.name || internalState.email) && internalState.message) {
      dispatch(submitAction({ fields: internalState }))
    } else {
      let failMessage
      if (!internalState.name && !internalState.email) {
        failMessage = t('filling-email-required') // TODO new translation key
      } else if (!internalState.message) {
        failMessage = t('filling-message-required')
      }
      dispatch(failAction({ message: failMessage }))
    }
    document.getElementById('contact-form').reset()
  }

  const handleChangeValue = field => ev => {
    internalDispatch({ type: 'CHANGE', field, value: ev.target.value })
  }

  return (
    <div>
      <PageTitle title={t('contact-us')} />
      <Title main={t('contact-us')} />
      <form id='contact-form' onSubmit={handleSubmitForm}>
        <input
          type='email'
          name='email'
          required
          placeholder={t('e-mail')}
          onChange={handleChangeValue('email')}
        />
        <input
          type='text'
          name='name'
          required
          placeholder={t('name')}
          onChange={handleChangeValue('name')}
        />
        <textarea
          name='message'
          required
          placeholder={t('message')}
          onChange={handleChangeValue('message')}
        />
        <div className='button-wrapper'>
          {failed && (
            <div className='failure-message'>{failed}</div>
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <button className='btn ball' title={t('send')}>
              <Icon type='check' size='28' />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactPage
