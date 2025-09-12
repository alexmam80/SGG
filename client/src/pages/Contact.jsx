/*import React from 'react'
import { useTranslation } from 'react-i18next'


export default function Contact(){
  const { t } = useTranslation()
  return (
    <section className="section">
      <div className="contact-page">
        <div className="container" style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:24}}>
          <div className="form-box">
              <h2 className="title">{t('contact.title')}</h2>
              <form style={{display:'grid',gap:12}} onSubmit={(e)=>{e.preventDefault(); alert('OK');}}>
                <input style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}} placeholder={t('contact.name')} required/>
                <input style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}} placeholder={t('contact.email')} type="email" required/>
                <input style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}} placeholder={t('contact.phone')} required/>
                <textarea style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4,minHeight:120}} placeholder={t('contact.message')} />
                <button className="btn" type="submit">{t('contact.send')}</button>
              </form>
          </div>
          <div className="map-box">
            <iframe title="map" style={{width:'100%',height:360,border:0,borderRadius:6}} src="https://maps.google.com/maps?q=Ion%20Creang%C4%83%206V%20Chisinau&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}*/


import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact(){
  const { t } = useTranslation()
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', message:'' })
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState(null) // 'ok' | 'err' | null
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try{
      const res = await fetch(`${API}/api/contact`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(!res.ok || !data.ok) throw new Error(data.error || 'Server error')
      setStatus('ok')
      setForm({name:'', email:'', phone:'', message:''})
    }catch(err){
      console.error(err)
      setStatus('err')
    }finally{ setLoading(false) }
  }

  return (
    <section className="section">
      <div className="contact-page">
        <div className="container" style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:24}}>
          <div className="form-box">
            <h2 className="title">{t('contact.title') || 'Contacte'}</h2>
            <form style={{display:'grid',gap:12}} onSubmit={submit}>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                     style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}}
                     placeholder={t('contact.name') || 'Nume și prenume'} required />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                     style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}}
                     placeholder={t('contact.email') || 'Email'} type="email" required />
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                     style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4}}
                     placeholder={t('contact.phone') || 'Telefon'} required />
              <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                        style={{padding:'12px 14px',border:'1px solid #ddd',borderRadius:4,minHeight:120}}
                        placeholder={t('contact.message') || 'Mesaj'} required />
              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Se trimite…' : (t('contact.send') || 'Trimite')}
              </button>
              {status==='ok'  && <div style={{color:'#2e7d32'}}>Mesaj salvat. Mulțumim!</div>}
              {status==='err' && <div style={{color:'#c62828'}}>A apărut o eroare. Reîncearcă.</div>}
            </form>
          </div>

          <div className="map-box">
            <iframe title="map" style={{width:'100%',height:410,border:0,borderRadius:6}}
              src="https://maps.google.com/maps?q=Ion%20Creang%C4%83%206V%20Chisinau&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

