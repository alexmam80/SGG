/*import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar(){
  const { t } = useTranslation()
  return (
    <div className="navbar">
      <div className="container inner">
        <Link to="/" className="logo">
          <img src="/SGG/Whitelogo.png" alt="SmartGreenGroup" className="mark" />
        </Link>

        <nav className="nav">
          <NavLink to="/" end className={({isActive})=>isActive?'active':''}>{t('nav.home')}</NavLink>
          <NavLink to="/contacte" className={({isActive})=>isActive?'active':''}>{t('nav.contact')}</NavLink>
          <NavLink to="/despre-noi" className={({isActive})=>isActive?'active':''}>{t('nav.about')}</NavLink>
        </nav>
        <LanguageSwitcher/>
      </div>
    </div>
  )
}
*/

import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar(){
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  return (
    <div className={`navbar ${open ? 'open' : ''}`}>
      <div className="container inner">

        {/* LOGO */}
        <Link to="/" className="logo">
          {/* dacă Whitelogo.png e în public/, BASE_URL e cel mai sigur pe Pages */}
          <img src={`${import.meta.env.BASE_URL}Whitelogo.png`} alt="SmartGreenGroup" className="mark" />
        </Link>

        {/* TOGGLE (vizibil doar pe mobil) */}
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span/><span/><span/>
        </button>

        {/* NAV */}
        <nav className="nav" onClick={() => setOpen(false)}>
          <NavLink to="/" end className={({isActive})=>isActive?'active':''}>{t('nav.home')}</NavLink>
          <NavLink to="/contacte" className={({isActive})=>isActive?'active':''}>{t('nav.contact')}</NavLink>
          <NavLink to="/despre-noi" className={({isActive})=>isActive?'active':''}>{t('nav.about')}</NavLink>
        </nav>

        {/* Language switcher: îl lăsăm neschimbat (doar un wrapper pentru stil) */}
        <div className="lang-switch">
          <LanguageSwitcher/>
        </div>
      </div>
    </div>
  )
}

