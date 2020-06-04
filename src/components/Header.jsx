import React from 'react'

import Logo from './header/Logo'
import UserBox from './shared/UserBox'
import TopLinks from './header/TopLinks'
import SearchFields from './Search'

import './Header.styl'

const Header = () => (
  <header>
    <Logo />
    <UserBox />
    <TopLinks />
    <SearchFields />
  </header>
)

export default Header
