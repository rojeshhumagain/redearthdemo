import { useEffect, useRef, useState } from 'react'
import { serviceGroups } from './serviceData'

const menuLabels = {
  'Visa Services': ['Visa Services Demo 1', 'Visa Services Demo 2', 'Visa Services Demo 3', 'Service 32', 'Visa Details Page 2', 'Visa Details Page 1'],
  'Migration Services': ['Migration Services 1', 'Migration Services 2', 'Migration Services Details'],
  'Other Services': ['Other Services Details 1'],
}

const countries = ['Global', 'Australia', 'India']

function detectCountry() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (timezone?.startsWith('Australia/')) return 'Australia'
  if (timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta') return 'India'
  const region = navigator.language?.split('-')[1]?.toUpperCase()
  if (region === 'AU') return 'Australia'
  if (region === 'IN') return 'India'
  return 'Global'
}

function CountryIcon({ country }) {
  if (country === 'Global') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-3 3-4 6-4 9s1 6 4 9m0-18c3 3 4 6 4 9s-1 6-4 9" /></svg>
  if (country === 'India') return <svg viewBox="0 0 48 32" aria-hidden="true"><rect width="48" height="32" fill="#fff" /><path fill="#ff9933" d="M0 0h48v10.67H0z" /><path fill="#138808" d="M0 21.33h48V32H0z" /><circle cx="24" cy="16" r="4.5" fill="none" stroke="#000080" strokeWidth="1" /><circle cx="24" cy="16" r="1" fill="#000080" /><path d="M24 11.5v9m-4.5-4.5h9m-7.7-3.2 6.4 6.4m0-6.4-6.4 6.4" stroke="#000080" strokeWidth=".6" /></svg>
  return <svg viewBox="0 0 48 32" aria-hidden="true"><rect width="48" height="32" fill="#012169" /><path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="4" /><path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.6" /><path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" /><path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.5" /><path d="m12 21 1 2.4 2.5.2-1.9 1.7.6 2.5-2.2-1.3-2.2 1.3.6-2.5-1.9-1.7 2.5-.2zm23-16 .8 1.8 2 .2-1.5 1.3.5 2-1.8-1-1.8 1 .5-2-1.5-1.3 2-.2zm7 8 .8 1.8 2 .2-1.5 1.3.5 2-1.8-1-1.8 1 .5-2-1.5-1.3 2-.2zm-8 8 .8 1.8 2 .2-1.5 1.3.5 2-1.8-1-1.8 1 .5-2-1.5-1.3 2-.2zm-10-8 .8 1.8 2 .2-1.5 1.3.5 2-1.8-1-1.8 1 .5-2-1.5-1.3 2-.2zm15 5 .6 1.4 1.5.1-1.1 1 .3 1.5-1.3-.8-1.3.8.3-1.5-1.1-1 1.5-.1z" fill="#fff" /></svg>
}

function CountryLocations({ country, onSelect, className }) {
  const [open, setOpen] = useState(false)
  const container = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return <div className={`country-locations ${className}`} ref={container}>
    <button ref={trigger} type="button" className="country-trigger" aria-label={`Select country, ${country}`} aria-expanded={open} onClick={() => setOpen(!open)}><span className="country-icon"><CountryIcon country={country} /></span>{country}<svg className="country-chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    <div className={`country-panel ${open ? 'open' : ''}`} aria-hidden={!open}><p>SELECT COUNTRY</p><div className="country-options">{countries.map((option) => <button key={option} type="button" className={country === option ? 'selected' : ''} aria-pressed={country === option} onClick={() => { onSelect(option); setOpen(false); trigger.current?.focus() }}><span className="country-icon"><CountryIcon country={option} /></span>{option}</button>)}</div></div>
  </div>
}

export default function SiteHeader({ appointmentHref = '#contact-form' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openService, setOpenService] = useState(null)
  const clickedService = useRef(null)
  const [country, setCountry] = useState(detectCountry)
  const manualCountry = useRef(false)

  useEffect(() => {
    let active = true
    navigator.permissions?.query({ name: 'geolocation' }).then((permission) => {
      if (permission.state !== 'granted') return
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        if (!active || manualCountry.current) return
        const { latitude, longitude } = coords
        if (latitude >= -44 && latitude <= -10 && longitude >= 112 && longitude <= 154) setCountry('Australia')
        else if (latitude >= 6 && latitude <= 37 && longitude >= 68 && longitude <= 98) setCountry('India')
        else setCountry('Global')
      }, () => {}, { timeout: 3000, maximumAge: 600000 })
    }).catch(() => {})
    return () => { active = false }
  }, [])

  const selectCountry = (value) => {
    manualCountry.current = true
    setCountry(value)
  }

  return (
    <>
      <div className="utility"><div className="utility-inner">
        <a href="tel:+61861619239"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16.4v2.9a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 2.7 5.2 2 2 0 0 1 4.7 3h2.9a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.6 1.8L7.8 11a15 15 0 0 0 5.2 5.2l1.8-1.7a2 2 0 0 1 1.8-.6l2.7.5a2 2 0 0 1 1.7 2Z" /></svg>(08) 6161 9239</a>
        <a href="mailto:info@redearthmigration.com.au"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>info@redearthmigration.com.au</a>
        <CountryLocations country={country} onSelect={selectCountry} className="utility-country" />
      </div></div>
      <header className="header">
        <a className="logo" href="/"><img src="/red-earth-logo.png" alt="Red Earth Education and Migration Agents" /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '✕' : '☰'}</button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          <a href="/#about-us">About Us</a>
          {serviceGroups.map(([group, path]) => <div className={`nav-service ${openService === group ? 'expanded' : ''}`} key={group} onPointerEnter={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) { clickedService.current = null; setOpenService(group) } }} onPointerLeave={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) { clickedService.current = null; setOpenService(null) } }}>
            <a className="nav-service-link" href={path} onClick={() => { setOpenService(null); setMenuOpen(false) }}>{group}</a>
            <button type="button" aria-label={`Toggle ${group} menu`} aria-expanded={openService === group} onClick={() => { const shouldClose = clickedService.current === group && openService === group; clickedService.current = shouldClose ? null : group; setOpenService(shouldClose ? null : group) }}><svg className="chevron" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
             <div className="services-menu"><div className="services-menu-body"><p className="services-menu-heading">Explore {group}</p><div className="services-grid">{menuLabels[group].map((label) => <span className="services-placeholder" key={label}>{label}</span>)}</div></div></div>
          </div>)}
          <a href="/#immigration-news">News</a><a className="nav-contact" href={appointmentHref}>Contact Us</a>
          <CountryLocations country={country} onSelect={selectCountry} className="mobile-country" />
        </nav>
      </header>
    </>
  )
}
