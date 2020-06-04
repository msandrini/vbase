import React from 'react'

import Logo from './header/Logo'
import TopLinks from './header/TopLinks'
import SearchFields from './Search'

import './Header.styl'

const Header = () => (
  <header>
    <Logo />
    <TopLinks />
    <SearchFields />
  </header>
)

export default Header
