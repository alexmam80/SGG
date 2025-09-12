import React from 'react'
import { useTranslation } from 'react-i18next'

const logos = [
  'https://dummyimage.com/260x80/cccccc/ffffff&text=Enter',
  'https://dummyimage.com/260x80/cccccc/ffffff&text=Darwin',
  'https://dummyimage.com/260x80/cccccc/ffffff&text=Ultra',
  'https://dummyimage.com/260x80/cccccc/ffffff&text=Ultraservice',
  'https://dummyimage.com/260x80/cccccc/ffffff&text=SmartPrint'
]
export default function ClientsStrip(){
  const { t } = useTranslation()
  return (
    <section className="clients">
      <div>
        <div className="container clients-row">
          {logos.map((src,i)=>(<img key={i} className="client" src={src} alt="client" />))}
        </div>
      </div>
      <div>
        <p>{t('clients.p')}</p>
      </div>
    </section>
  )
}