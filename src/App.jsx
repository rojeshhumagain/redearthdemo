import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CTAConcepts from './CTAConcepts'
import HomePage from './HomePage'
import ScrollReveal from './ScrollReveal'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import { serviceGroups } from './serviceData'

const ServiceCategoryPage = lazy(() => import('./ServiceCategoryPage'))
const localRoutes = new Set(['/', '/cta-concepts', '/visitor-visa/electronic-travel-authority-601', ...serviceGroups.map(([, path]) => path)])

const eVisitorCountries = [
  ['Andorra', 'Greece', 'Norway'], ['Austria', 'Hungary', 'Poland'], ['Belgium', 'Iceland', 'Portugal'],
  ['Bulgaria', 'Ireland', 'Romania'], ['Croatia', 'Italy', 'San Marino'], ['Cyprus', 'Latvia', 'Slovak Republic'],
  ['Czech Republic', 'Liechtenstein', 'Slovenia'], ['Denmark', 'Lithuania', 'Spain'], ['Estonia', 'Luxembourg', 'Sweden'],
  ['Finland', 'Malta', 'Switzerland'], ['France', 'Monaco', 'United Kingdom (UK citizens only)'],
  ['Germany', 'The Netherlands', 'Vatican City'],
]

const etaCountries = [
  ['Andorra', 'Iceland', 'Norway'], ['Austria', 'Ireland', 'Portugal'], ['Belgium', 'Italy', 'San Marino'],
  ['Brunei', 'Japan', 'Singapore'], ['Canada', 'Republic of Korea', 'Spain'], ['Denmark', 'Liechtenstein', 'Switzerland'],
  ['Finland', 'Luxembourg', 'Sweden'], ['France', 'Malaysia', 'Taiwan'],
  ['Germany', 'Malta', 'United Kingdom / British National Overseas'], ['Greece', 'Monaco', 'United States of America'],
  ['Hong Kong SAR', 'The Netherlands', 'Vatican City'],
]

const faqs = [
  ['Where can I apply from?', 'You must be outside Australia when you apply for an Electronic Travel Authority or eVisitor visa.'],
  ['Where can I receive the visa?', 'You must be outside Australia when the visa is decided and granted. It is electronically linked to your passport.'],
  ['What family members can I include?', 'Family members cannot be included in one application. Each traveller, including children, must hold their own visa.'],
  ['Can the health requirement be waived for this visa?', 'The health requirement applies. Depending on your circumstances, you may be asked to complete a health assessment before travelling.'],
  ['How long does this visa last for?', 'The visa is generally valid for 12 months from grant. You may visit multiple times and stay for up to three months on each visit.'],
]

const relatedVisas = [
  {
    subclass: 'Subclass 600',
    title: 'Visitor Visa',
    description: 'Visit Australia for tourism, family visits or selected short-term business activities.',
    detail: 'Stay up to 3, 6 or 12 months',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=82',
  },
  {
    subclass: 'Subclass 651',
    title: 'eVisitor Visa',
    description: 'A streamlined digital visitor pathway for eligible European passport holders.',
    detail: 'Multiple visits over 12 months',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=82',
  },
  {
    subclass: 'Subclass 417',
    title: 'Working Holiday Visa',
    description: 'Travel, work and experience Australia for eligible young passport holders.',
    detail: 'Travel and work in Australia',
    image: 'https://images.unsplash.com/photo-1494233892892-84542a694e72?auto=format&fit=crop&w=1200&q=82',
  },
  {
    subclass: 'Subclass 462',
    title: 'Work and Holiday Visa',
    description: 'Enjoy an extended holiday while undertaking short-term work and study.',
    detail: 'Ages and eligibility vary by country',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=82',
  },
]

function CountryTable({ rows, emphasise = [] }) {
  return (
    <div className="country-table" role="table">
      {rows.flat().map((country) => <div role="cell" className={emphasise.includes(country) ? 'emphasise' : ''} key={country}>{country}</div>)}
    </div>
  )
}

function EnquiryForm() {
  const [sent, setSent] = useState(false)
  return (
    <form className="enquiry-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
      {sent ? (
        <div className="form-success"><span>✓</span><h3>Thank you for your enquiry</h3><p>One of our registered migration professionals will contact you shortly.</p></div>
      ) : (
        <>
          <div className="form-heading"><p>START A CONVERSATION</p><h2>Talk to a migration professional</h2><span>Tell us a little about your situation and our team will be in touch.</span></div>
          <div className="form-grid">
            <label><span>Name <b>*</b></span><input required placeholder="Your full name" /></label>
            <label><span>Email address <b>*</b></span><input required type="email" placeholder="you@example.com" /></label>
            <label><span>Phone number <b>*</b></span><input required type="tel" placeholder="Your contact number" /></label>
            <label><span>Service required</span><select defaultValue="Visitor Visa"><option>Student Visa</option><option>General Skilled Migration</option><option>Partner Visa</option><option>Parent Visa</option><option>Child Visa</option><option>Visitor Visa</option><option>Employer Sponsored Visa</option><option>Appeals & Reviews</option><option>Humanitarian & Refugee</option><option>Business Migration</option><option>Citizenship</option><option>Others</option></select></label>
            <label className="message-field"><span>Message</span><textarea rows="5" placeholder="How can we help?" /></label>
          </div>
          <button className="primary-button" type="submit">Submit enquiry <b>›</b></button>
        </>
      )}
    </form>
  )
}

function VisaPage() {
  const relatedRef = useRef(null)
  const dragState = useRef({ dragging: false, moved: false, startX: 0, scrollLeft: 0 })
  const [activeSection, setActiveSection] = useState('overview')
  const [faqOpen, setFaqOpen] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    document.title = 'Electronic Travel Authority Subclass 601 | Red Earth Migration'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Electronic Travel Authority Subclass 601 eligibility, visa conditions and application guidance from Red Earth Migration.')
  }, [])

  const startRelatedDrag = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    dragState.current = { dragging: true, moved: false, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const moveRelatedDrag = (event) => {
    if (!dragState.current.dragging) return
    const distance = event.clientX - dragState.current.startX
    if (Math.abs(distance) > 5) dragState.current.moved = true
    event.currentTarget.scrollLeft = dragState.current.scrollLeft - distance
  }

  const endRelatedDrag = (event) => {
    if (!dragState.current.dragging) return
    dragState.current.dragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    setIsDragging(false)
  }

  return (
    <div>
      <main id="top">
        <div className="breadcrumbs"><a href="/">Home</a><span>›</span><a href="/visa-services#visitor-visa">Visitor Visa</a><span>›</span><b>Subclass 601</b></div>

        <section className="visa-hero">
          <div className="visa-hero-copy"><p className="kicker">VISITOR VISA</p><h1>Electronic Travel Authority <span>Subclass 601</span></h1><p>If you want to visit Australia and have the right passport, you’re in luck. The Electronic Travel Authority is one of the easiest pathways for eligible visitors, with no application fee and many visas granted within minutes or hours.</p><div className="hero-actions"><a className="primary-button" href="#contact-form">Check your eligibility <b>›</b></a><a className="text-link" href="tel:+61861619239">Call (08) 6161 9239</a></div></div>
          <div className="hero-facts"><div><span>601</span><small>Visa subclass</small></div><div><span>12</span><small>Months validity</small></div><div><span>3</span><small>Months per visit</small></div><div><span>$0</span><small>Application fee</small></div></div>
        </section>

        <div className="page-layout">
          <aside className="page-nav"><p>ON THIS PAGE</p><nav>{[['overview', 'Visa overview'], ['evisitor', 'eVisitor passports'], ['eta', 'ETA passports'], ['problems', 'Common problems'], ['faq', 'FAQs'], ['contact-form', 'Contact our team']].map(([id, label]) => <a className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={() => setActiveSection(id)} key={id}>{label}<span>›</span></a>)}</nav></aside>

          <article className="visa-content">
            <section id="overview"><p className="section-label">VISA OVERVIEW</p><h2>Visit Australia with flexibility</h2><p>Both the ETA and eVisitor visa allow you to stay in Australia for up to three months at a time, at any point during the 12 months after visa grant. You need to leave Australia every three months, but you can return immediately and do this as many times as you like while the visa remains valid.</p><div className="notice"><span>i</span><p><strong>Important conditions</strong>You cannot work on this visa and you cannot study for longer than three months.</p></div></section>

            <section id="evisitor"><p className="section-label">PASSPORT ELIGIBILITY</p><h2>eVisitor-eligible passports</h2><p>People holding passports from the following countries may be eligible for an eVisitor visa.</p><CountryTable rows={eVisitorCountries} /></section>

            <section id="eta"><p className="section-label">PASSPORT ELIGIBILITY</p><h2>ETA-eligible passports</h2><p>People holding passports from the following countries may be eligible for an Electronic Travel Authority. Countries shown in red are ETA-only and are not eligible for eVisitor.</p><CountryTable rows={etaCountries} emphasise={['Brunei', 'Japan', 'Singapore', 'Canada', 'Republic of Korea', 'Malaysia', 'Taiwan', 'United Kingdom / British National Overseas', 'United States of America', 'Hong Kong SAR']} /></section>

            <section id="problems"><p className="section-label">BEFORE YOU APPLY</p><h2>Common problems for applicants</h2><div className="problem-list"><div><span>01</span><p><strong>No paid work</strong>Electronic visitor visas include a no-work condition. You cannot undertake paid employment while in Australia.</p></div><div><span>02</span><p><strong>Three-month stay limit</strong>If you remain longer than three months without leaving, your visa will expire and you may become unlawful.</p></div><div><span>03</span><p><strong>Health requirements</strong>You may need a health assessment before travelling if you disclose a health condition in your application.</p></div><div><span>04</span><p><strong>Personal history</strong>Recent extended stays, criminal convictions or a negative immigration history may delay the process or affect the outcome.</p></div></div><div className="warning"><strong>Always know your visa expiry date and conditions.</strong><p>Letting a visa expire without applying for a new one can have serious consequences, even if you attempt to apply the following day.</p></div></section>

            <section className="help-panel"><p className="section-label">RED EARTH MIGRATION CAN HELP</p><h2>Unsure whether you qualify?</h2><p>Get clear advice about ETA and eVisitor eligibility, visa conditions and further pathways to Australia from an experienced migration professional.</p><a className="primary-button" href="#contact-form">Schedule a consultation <b>›</b></a></section>

            <section id="faq" className="faq-section"><p className="section-label">HELP & GUIDANCE</p><h2>ETA & eVisitor visa applicant FAQs</h2>{faqs.map(([question, answer], index) => <div className="faq" key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}><span>{question}</span><b>{faqOpen === index ? '−' : '+'}</b></button>{faqOpen === index && <p>{answer}</p>}</div>)}</section>
          </article>

          <aside className="visa-sidebar"><div className="visa-details"><p>VISA DETAILS</p><h2>Subclass 601</h2><dl><div><dt>Stay</dt><dd>Up to 3 months per visit</dd></div><div><dt>Validity</dt><dd>Up to 12 months</dd></div><div><dt>Cost</dt><dd>AUD $0</dd></div><div><dt>Work rights</dt><dd>Not permitted</dd></div><div><dt>Apply from</dt><dd>Outside Australia</dd></div></dl><a href="#contact-form">Discuss this visa <b>›</b></a></div><div className="agent-card"><span>REGISTERED MIGRATION SUPPORT</span><h3>Make your next move with confidence.</h3><p>Clear advice. Careful preparation. Support at every step.</p><a href="tel:+61861619239">☎ &nbsp;(08) 6161 9239</a></div></aside>
        </div>

        <section id="contact-form"><EnquiryForm /></section>

        <section className="related-section" aria-labelledby="related-visas-title">
          <div className="related-heading"><div><p className="section-label">EXPLORE YOUR OPTIONS</p><h2 id="related-visas-title">Related visitor visas</h2><span>Compare other pathways that may suit your travel plans and passport.</span></div><div className="slider-controls"><button type="button" aria-label="Show previous visas" onClick={() => relatedRef.current?.scrollBy({ left: -relatedRef.current.clientWidth * .82, behavior: 'smooth' })}>←</button><button type="button" aria-label="Show next visas" onClick={() => relatedRef.current?.scrollBy({ left: relatedRef.current.clientWidth * .82, behavior: 'smooth' })}>→</button></div></div>
          <div className={`related-track ${isDragging ? 'dragging' : ''}`} ref={relatedRef} onPointerDown={startRelatedDrag} onPointerMove={moveRelatedDrag} onPointerUp={endRelatedDrag} onPointerCancel={endRelatedDrag} onClickCapture={(event) => { if (dragState.current.moved) { event.preventDefault(); dragState.current.moved = false } }}>{relatedVisas.map((visa) => <article className="related-card" key={visa.subclass}><img src={visa.image} alt="Australian travel destination" loading="lazy" draggable="false" /><div className="related-card-body"><p>{visa.subclass}</p><h3>{visa.title}</h3><span>{visa.description}</span><div><small>{visa.detail}</small><a href="#contact-form" aria-label={`Learn more about ${visa.title}`}>Learn more <b>›</b></a></div></div></article>)}</div>
        </section>
      </main>

      <a className="floating-contact" href="tel:+61861619239" aria-label="Call Red Earth Migration">☎</a>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const serviceGroup = serviceGroups.find(([, route]) => route === path)?.[0]

  useLayoutEffect(() => {
    if (serviceGroup) document.title = `${serviceGroup} | Red Earth Migration`
  }, [serviceGroup])

  useEffect(() => {
    const navigate = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href]')
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || !localRoutes.has(url.pathname)) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      event.preventDefault()
      window.history.pushState(null, '', url.pathname + url.search + url.hash)
      setPath(url.pathname)
    }
    const onHistoryChange = () => setPath(window.location.pathname)
    document.addEventListener('click', navigate)
    window.addEventListener('popstate', onHistoryChange)
    return () => {
      document.removeEventListener('click', navigate)
      window.removeEventListener('popstate', onHistoryChange)
    }
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      const target = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (target) target.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [path])

  return <>
    <SiteHeader appointmentHref={path === '/' ? '#home-consultation' : path === '/cta-concepts' ? '#concept-one' : serviceGroup ? '/#home-consultation' : '#contact-form'} />
    <Suspense fallback={<main className="page-loader" role="status" aria-live="polite"><span className="page-loader-indicator" aria-hidden="true" />Loading services...</main>}>
      {path === '/' ? <HomePage /> : path === '/cta-concepts' ? <CTAConcepts /> : serviceGroup ? <ServiceCategoryPage group={serviceGroup} /> : <VisaPage />}
    </Suspense>
    {path !== '/cta-concepts' && <SiteFooter />}
    <ScrollReveal />
  </>
}

export default App
