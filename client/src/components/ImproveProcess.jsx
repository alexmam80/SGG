import React from 'react'
import { useTranslation } from 'react-i18next'
export default function ImproveProcess(){
  const { t } = useTranslation()
  return (
    <section className="section">
      <div className="container process">
        <img className="bulb" src="/big-bulb-icon1.png" alt="" />
        <div>
          <h2>{t('improve.title')}</h2>
          <p>{t('improve.p1')}</p>
          <p>{t('improve.p2')}</p>
        </div>
      </div>
    </section>
  )
}
