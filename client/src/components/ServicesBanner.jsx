import React from 'react'
import { useTranslation } from 'react-i18next'


export default function ServicesBanner(){
  const { t } = useTranslation()
  return (
    <section className="banner">
      <div className="container">
        <div className="big">{t('services.bannerTitle')}</div>
        <div className="sub">{t('services.bannerSub')}</div>
      </div>
    </section>
  )
}
