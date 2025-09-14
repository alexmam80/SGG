import React from 'react'
import { useTranslation } from 'react-i18next'


export default function RecycleHow(){
  const { t } = useTranslation()
  const items = t('recycle.items', { returnObjects: true })
  const imgs = [
    '/SGG/1.jpg',
    '/SGG/2.jpg',
    '/SGG/3.jpg',
    '/SGG/4.jpg'
  ]
    return (
    <section className="section" style={{background:'#f7f7f7'}}>
      <div className="container">
        <div className="sub">{t('recycle.sub')}</div>
        <h2 className="title" id="h2-archives">{t('recycle.title')}</h2>
        <div className="hr" />
        <div className="recycle-grid">
          {items.map((it,i)=>(
            <div className="recycle-card" key={i}>
              <div className="circle"><img src={imgs[i]} alt="" /></div>
              <h3>{it.title}</h3>
              <div className="muted">{it.muted}</div>
              <div style={{height:14}} />
              <button className="btn">{t('recycle.readMore')}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
