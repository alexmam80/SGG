import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher(){
  const { i18n } = useTranslation()
  const set = lng => { i18n.changeLanguage(lng); localStorage.setItem('lang', lng) }

  return (
    <div style={{display:'flex',gap:8,marginLeft:12}}>
      <button onClick={()=>set('ro')} style={btn(i18n.language==='ro')}>RO</button>
      <button onClick={()=>set('ru')} style={btn(i18n.language==='ru')}>RU</button>
    </div>
  )
}

const btn = (active)=>({
  padding:'6px 10px', border:'1px solid #444', borderRadius:4,
  background: active ? 'var(--green)' : '#3a3a3a', color:'#fff',
  fontWeight:700, cursor:'pointer'
})
