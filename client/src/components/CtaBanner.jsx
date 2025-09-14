import React from 'react'
import { useTranslation } from 'react-i18next'


export default function CtaBanner(){
  const { t } = useTranslation()
  return (
    <section className="cta">
      <div className="container">
        <h2>{t('cta.title')}</h2>
        <p>{t('cta.text')}</p>
        <div className="logo-center">
			<a href="https://smartgreengroup.md"><img src="/SGG/Whitelogo.png" alt="SmartGreenGroup - Sistemul colectiv Asociația Obștească" /></a>
		</div>
        <div className="cta-buttons">
            <a className="btn outline" href="#/contacte">{t('cta.btn')}</a>
        </div>
      </div>
    </section>
  )
}
