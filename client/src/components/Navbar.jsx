import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar(){
  const { t } = useTranslation()
  return (
    <div className="navbar">
      <div className="container inner">
        <Link to="/" className="logo">
          <img src="/public/Whitelogo.png" alt="SmartGreenGroup" className="mark" />
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
