import { useEffect, useRef, useState } from 'react'
import { serviceGroups } from './serviceData'

const menuLabels = {
  'Visa Services': ['Visa Services Demo 1', 'Visa Services Demo 2', 'Visa Services Demo 3', 'Service 32', 'Visa Details Page 2', 'Visa Details Page 1'],
  'Migration Services': ['Migration Services 1', 'Migration Services 2', 'Migration Services Details'],
  'Other Services': ['Other Services Details 1'],
}

const countries = {
  Australia: ['Osborne Park', 'Morley', 'Harrisdale'],
  India: ['New Delhi'],
}

function CountryLocations({ country, onSelect, className }) {
  const [open, setOpen] = useState(false)
  const container = useRef(null)

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return <div className={`country-locations ${className}`} ref={container}>
    <button type="button" className="country-trigger" aria-label={`Our locations, ${country}`} aria-expanded={open} onClick={() => setOpen(!open)}><span className="country-code" aria-hidden="true">{country === 'Australia' ? 'AU' : 'IN'}</span>{country}<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    {open && <div className="country-panel"><p>OUR LOCATIONS</p><div className="country-options">{Object.keys(countries).map((option) => <button key={option} type="button" className={country === option ? 'selected' : ''} aria-pressed={country === option} onClick={() => onSelect(option)}><span className="country-code" aria-hidden="true">{option === 'Australia' ? 'AU' : 'IN'}</span>{option}</button>)}</div><span className="country-panel-label">Our offices in {country}</span><div className="country-offices">{countries[country].map((office) => <span key={office}>{office}</span>)}</div></div>}
  </div>
}

export default function SiteHeader({ appointmentHref = '#contact-form' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openService, setOpenService] = useState(null)
  const [country, setCountry] = useState('Australia')

  return (
    <>
      <div className="utility"><div className="utility-inner">
        <a href="tel:+61861619239"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16.4v2.9a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 2.7 5.2 2 2 0 0 1 4.7 3h2.9a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.6 1.8L7.8 11a15 15 0 0 0 5.2 5.2l1.8-1.7a2 2 0 0 1 1.8-.6l2.7.5a2 2 0 0 1 1.7 2Z" /></svg>(08) 6161 9239</a>
        <a href="mailto:info@redearthmigration.com.au"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>info@redearthmigration.com.au</a>
        <CountryLocations country={country} onSelect={setCountry} className="utility-country" />
        <a className="appointment" href={appointmentHref}>Book an Appointment</a>
      </div></div>
      <header className="header">
        <a className="logo" href="/"><img src="/red-earth-logo.png" alt="Red Earth Education and Migration Agents" /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '✕' : '☰'}</button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          <a href="/#about-us">About Us</a>
          {serviceGroups.map(([group, path]) => <div className={`nav-service ${openService === group ? 'expanded' : ''}`} key={group} onPointerEnter={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) setOpenService(group) }} onPointerLeave={(event) => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width:921px)').matches) setOpenService(null) }}>
            <a className="nav-service-link" href={path} onClick={() => { setOpenService(null); setMenuOpen(false) }}>{group}</a>
            <button type="button" aria-label={`Toggle ${group} menu`} aria-expanded={openService === group} onClick={() => setOpenService(openService === group ? null : group)}><svg className="chevron" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className="services-menu"><div className="services-grid">{menuLabels[group].map((label) => <span className="services-placeholder" key={label}>{label}</span>)}</div></div>
          </div>)}
          <a href="/#immigration-news">News</a><a className="nav-contact" href={appointmentHref}>Contact Us</a>
          <CountryLocations country={country} onSelect={setCountry} className="mobile-country" />
        </nav>
      </header>
    </>
  )
}
