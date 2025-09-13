import React from 'react'
import { useTranslation } from 'react-i18next'

const slides = [
  {img:'/SGG/ca-9.jpg'},
  {img:'/thinkGreen.jpg'},
  {img:'/public/vite.svg'}
]

export default function Slider(){
  const { t } = useTranslation()
  const [idx,setIdx]=React.useState(0)
  const go = dir => setIdx(i => (i + (dir==='prev'?-1:1) + slides.length) % slides.length)
  React.useEffect(()=>{ const tmr=setInterval(()=>setIdx(i=>(i+1)%slides.length),5000); return ()=>clearInterval(tmr)},[])
  return (
    <div className="slider">
      <div className="slide-track" style={{transform:`translateX(-${idx*100}%)`}}>
        {slides.map((s,i)=>(
          <div className="slide" key={i}>
            <img src={s.img} alt="" />
            <div className="caption">
              <h1>{t('hero.title')}</h1>
              <p>{t('hero.subtitle')}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow left" onClick={()=>go('prev')}>‹</button>
      <button className="arrow right" onClick={()=>go('next')}>›</button>
    </div>
  )
}
