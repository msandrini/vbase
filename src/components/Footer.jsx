import React from 'react'

import Icon from './shared/Icon'
import TLink from './shared/TLink'

import t from '../utils/i18n'
import './Footer.styl'

const Footer = () => (
  <footer>
    <span className='copy'>&copy;2003-2017 Marcos Sandrini</span>
    <TLink to='terms-privacy' className='terms'>{t('terms-of-use-and-privacy')}</TLink>
    <TLink to='contact' className='btn ball contact' titleKey='contact'>
      <Icon type='mail' size='19' />
    </TLink>
  </footer>
)

export default Footer
