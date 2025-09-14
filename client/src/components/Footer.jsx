import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer(){
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer">
        <div className="container cols">
          <div>
            <div>
              <span className="brand-ico"></span>
              <span style={{fontWeight:800,fontSize:26}}>SmartGreenGroup</span>
            </div>
            <a href="/"><img src="/SGG/f-logo.jpg" alt="eco" style={{width:240,borderRadius:4,marginTop:10}} /></a>
          </div>

          <div>
            <h3>{t('footer.aboutTitle')}</h3>

            <p>
              <strong>{t('footer.addressLabel')}</strong>
              <a href="https://maps.app.goo.gl/SijvoDRYHt4iVqf46" target="_blank" rel="noopener noreferrer">
                {' '}{t('footer.addressLinkText')}
              </a>
            </p>

            <p>
              <strong>{t('footer.phoneLabel')}</strong>
              <a href="tel:+37368965566"> +373 68965566</a>
              <br/>
              <strong>{t('footer.emailLabel')}</strong>
              <a href="mailto:office@smartgreengroup.md"> office@smartgreengroup.md</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer copy">
        <p className="footer-p">
          {t('footer.copy', { year })}{' '}
          <a href="https://smartgreengroup.md/" target="_blank" rel="noreferrer">
            {t('footer.powered')}
          </a>
        </p>
      </div>
    </footer>
  )
}
