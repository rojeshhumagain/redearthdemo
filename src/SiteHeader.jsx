import { useState } from 'react'

const serviceGroups = [
  ['Visa Services', [
    ['GSM Visa', '189, 190, 476, 887, 491 & 485', '#gsm-visa'],
    ['Partner Visa', 'Onshore, offshore & prospective marriage', '#partner-visa'],
    ['Student Visa', 'Student Visa Subclass 500', '#student-visa'],
    ['Protection Visa', 'Permanent Protection Visa Subclass 866', '#protection-visa'],
    ['Employer Sponsored Visa', '482, 186 & 187 employer pathways', '#employer-sponsored'],
    ['Parent Visa', '804, 838/114, contributory & 103', '#parent-visa'],
    ['Visitor Visa', '417, 601, 462, 651 & 600', '#visitor-visa'],
    ['Other Visas', '858, 101, 155/157 & 444', '#other-visas'],
  ]],
  ['Migration Services', [
    ['Australian Citizenship', 'Citizenship applications & guidance', '#citizenship'],
    ['Appeals & Reviews', 'PIC 4020, refusals & cancellations', '#appeals-reviews'],
    ['Business Migration', '188, 888 & Business Talent streams', '#business-migration'],
  ]],
  ['Other Services', [
    ['Education Services', 'Course and institution guidance', '/#all-services'],
    ['General Enquiries', 'Talk with our team about your options', '/#home-consultation'],
  ]],
]

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
          {serviceGroups.map(([group, services]) => <div className={`nav-service ${openService === group ? 'expanded' : ''}`} key={group}>
            <button type="button" aria-expanded={openService === group} onClick={() => setOpenService(openService === group ? null : group)}>{group} <span className="chevron">⌄</span></button>
            <div className="services-menu"><div className="services-grid">{services.map(([title, detail, href]) => <a href={href} key={title} onClick={() => { setOpenService(null); setMenuOpen(false) }}><div><strong>{title}</strong><small>{detail}</small></div><b>›</b></a>)}</div></div>
          </div>)}
          <a href="/#immigration-news">News</a><a className="nav-contact" href={appointmentHref}>Contact Us</a>
        </nav>
      </header>
    </>
  )
}
