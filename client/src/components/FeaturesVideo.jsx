import React from 'react'
import { useTranslation } from 'react-i18next'


export default function FeaturesVideo(){
  const { t } = useTranslation()
  return (
    <section className="section">
      <div className="container features">
        <div style={{display:'grid',gap:18}}>
          <div className="feature"><div className="icon">💻</div><div><h3>{t('features.ultraTitle')}</h3><p>{t('features.ultraText')}</p></div></div>
          <div className="feature"><div className="icon">⬇️</div><div><h3>{t('features.demoTitle')}</h3><p>{t('features.demoText')}</p></div></div>
          <div className="feature"><div className="icon">🧩</div><div><h3>{t('features.builderTitle')}</h3><p>{t('features.builderText')}</p></div></div>
        </div>
        <iframe className="video" src="https://www.youtube.com/embed/CR-vsAwCR0Q?autoplay=0&showinfo=0&controls=0" title="Ecological Restoration" allowfullscreen></iframe>
      </div>
    </section>
  )
}
