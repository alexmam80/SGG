/*import React from 'react'
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
*/



import React from "react";
import { useTranslation } from "react-i18next";
import RecycleCard from "./RecycleCard";

export default function Recycle() {
  const { t } = useTranslation();
  const BASE = import.meta.env.BASE_URL || "/";

  // Pregătim cardurile — titlurile/muted vin din i18n,
  // iar textele suplimentare vin din 'recycle.more.*'
  const cards = [
    {
      img: `${BASE}img/recycle-paper.jpg`,
      title: t("recycle.items.0.title"),
      muted: t("recycle.items.0.muted"),
      moreText: t("recycle.more.paper"),
    },
    {
      img: `${BASE}img/recycle-electric.jpg`,
      title: t("recycle.items.1.title"),
      muted: t("recycle.items.1.muted"),
      moreText: t("recycle.more.electrical"),
    },
    {
      img: `${BASE}img/recycle-compost.jpg`,
      title: t("recycle.items.2.title"),
      muted: t("recycle.items.2.muted"),
      moreText: t("recycle.more.compost"),
    },
    {
      img: `${BASE}img/recycle-clothes.jpg`,
      title: t("recycle.items.3.title"),
      muted: t("recycle.items.3.muted"),
      moreText: t("recycle.more.clothes"),
    },
  ];

  return (
    <section className="section">
      <div className="container recycle-grid">
        {cards.map((c, i) => (
          <RecycleCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
