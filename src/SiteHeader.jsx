import { useState } from 'react'
import { serviceGroups } from './serviceData'

export default function SiteHeader({ appointmentHref = '#contact-form' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openService, setOpenService] = useState(null)

  return (
    <>
      <div className="utility"><div className="utility-inner"><a href="tel:+61861619239">☎ &nbsp;(08) 6161 9239</a><a href="mailto:info@redearthmigration.com.au">✉ &nbsp;info@redearthmigration.com.au</a><a className="appointment" href={appointmentHref}>Book an Appointment</a></div></div>
      <header className="header">
        <a className="logo" href="/"><img src="/red-earth-logo.png" alt="Red Earth Education and Migration Agents" /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '✕' : '☰'}</button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          <a href="/#about-us">About Us</a>
          {serviceGroups.map(([group, path, services]) => <div className={`nav-service ${openService === group ? 'expanded' : ''}`} key={group} onPointerEnter={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) setOpenService(group) }} onPointerLeave={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) setOpenService(null) }}>
            <a className="nav-service-link" href={path} onClick={() => { setOpenService(null); setMenuOpen(false) }}>{group}</a>
            <button type="button" aria-label={`Toggle ${group} menu`} aria-expanded={openService === group} onClick={() => setOpenService(openService === group ? null : group)}><svg className="chevron" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="services-menu"><div className="services-grid">{services.map(([title, detail, href]) => <a href={href} key={title} onClick={() => { setOpenService(null); setMenuOpen(false) }}><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></a>)}</div></div>
          </div>)}
          <a href="/#immigration-news">News</a><a className="nav-contact" href={appointmentHref}>Contact Us</a>
        </nav>
      </header>
    </>
  )
}
