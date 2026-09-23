import { useEffect } from 'react'
import { serviceGroups } from './serviceData'

const introductions = {
  'Visa Services': 'Explore the visa pathways our team can help you understand and prepare for, from study and work to family and travel.',
  'Migration Services': 'Get clear guidance on citizenship, reviews and business migration matters, with advice shaped around your circumstances.',
  'Other Services': 'Find education guidance or start a conversation with our team about the support you need.',
}

export default function ServiceCategoryPage({ group }) {
  const [title, path, services] = serviceGroups.find(([label]) => label === group)

  useEffect(() => {
    document.title = `${title} | Red Earth Migration`
    document.querySelector('meta[name="description"]')?.setAttribute('content', introductions[title])
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }))
  }, [title])

  return (
    <main className="service-catalog">
      <div className="service-catalog-intro">
        <p className="section-label">RED EARTH SERVICES</p>
        <h1>{title}</h1>
        <p>{introductions[title]}</p>
      </div>
      <div className="service-catalog-grid">
        {services.map(([name, detail, href]) => {
          const visitor = name === 'Visitor Visa'
          const destination = visitor ? '/visitor-visa/electronic-travel-authority-601' : href.startsWith(`${path}#`) ? '/#home-consultation' : href
          return <article id={href.startsWith(`${path}#`) ? href.split('#')[1] : undefined} key={name}>
            <h2>{name}</h2>
            <p>{detail}</p>
            <a href={destination}>{visitor ? 'Explore ETA Subclass 601' : name === 'General Enquiries' ? 'Start an enquiry' : href.startsWith(`${path}#`) ? 'Discuss this service' : 'Explore this service'} <span aria-hidden="true">›</span></a>
          </article>
        })}
      </div>
      <div className="service-catalog-contact"><div><h2>Not sure which service fits?</h2><p>Tell us about your plans and we can help you identify a useful starting point.</p></div><a href="/#home-consultation">Talk to our team <span aria-hidden="true">›</span></a></div>
    </main>
  )
}
