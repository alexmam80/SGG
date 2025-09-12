import React from 'react'
import { useTranslation } from 'react-i18next'


export default function About(){
  const { t } = useTranslation()
  const paras = t('about.paras', { returnObjects: true })
  return (
    <section className="section">
      <div className="container" id="about">
        <div className="page-content">
          <div className="page-content2">
            <h2 className="title">{t('about.title')}</h2>
          </div>
        </div>

        <div className="abotus-text">
          {Array.isArray(paras)
            ? paras.map((p, i) => <p className="about-p" key={i}>{p}</p>)
            : <p className="about-p" style={{whiteSpace:'pre-line'}}>{t('about.text')}</p> /* fallback dacă ai încă about.text */}
        </div>
      </div>
    </section>
  )
}
