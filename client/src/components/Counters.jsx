import React from 'react'
import { useTranslation } from 'react-i18next'
export default function Counters(){
  const { t } = useTranslation()
  const items = t('counters.items', { returnObjects: true })
  return (
    <section className="counters">
      <div className="container counter-wrap">
        {items.map((it,i)=>(
          <div className="counter" key={i}>
            <div className="num">{it.n}</div>
            <div className="label">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
