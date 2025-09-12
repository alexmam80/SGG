import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Achievements(){
  const { t } = useTranslation()
  return (
    <section className="section">
      <div className="container">
        <div className="sub">{t('ach.sub')}</div>
        <h2 className="title" id="h2-archives">{t('ach.title')}</h2>
        <div className="hr" />
      </div>
    </section>
  )
}
