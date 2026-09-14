import { useEffect } from 'react'
import SiteHeader from './SiteHeader'

const pathways = [
  ['Study', 'Course guidance and student visas', '#student-visa'],
  ['Work', 'Skilled and employer pathways', '#skilled-migration'],
  ['Join family', 'Partner, parent and family visas', '#family-visas'],
  ['Visit', 'Visitor and working holiday visas', '/visitor-visa/electronic-travel-authority-601'],
]

export default function HomePage() {
  useEffect(() => {
    document.title = 'Migration Agents & Education Consultants Perth | Red Earth'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Clear Australian education and migration guidance from Red Earth Migration. Explore student, skilled, family, employer and visitor visa pathways.')
  }, [])

  return (
    <div className="home-page">
      <SiteHeader appointmentHref="#home-consultation" />
      <main className="home-main">
        <section className="home-hero" aria-labelledby="home-hero-title">
          <div className="home-hero-content">
            <p className="home-kicker">EDUCATION & MIGRATION SUPPORT</p>
            <h1 id="home-hero-title">Your future in Australia, <span>planned with clarity.</span></h1>
            <p className="home-intro">Clear education guidance and professional migration support, shaped around your circumstances, your goals and the life you want to build.</p>
            <div className="home-actions"><a className="primary-button" href="#hero-pathway">Explore your options <b>›</b></a><a className="home-secondary" href="#home-consultation">Book a consultation</a></div>
            <div className="home-assurance"><strong>Advice you can act on.</strong><span>Honest assessments</span><span>Careful preparation</span><span>Clear communication</span></div>
          </div>
          <figure className="home-hero-visual">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=88" alt="International students discussing their study plans together" />
            <figcaption><span>From first conversation to final outcome</span><strong>We help you move forward with confidence.</strong></figcaption>
          </figure>
        </section>

        <section className="hero-pathway" id="hero-pathway" aria-labelledby="pathway-title">
          <div className="pathway-heading"><p>START WITH YOUR GOAL</p><h2 id="pathway-title">What would you like to do in Australia?</h2></div>
          <div className="pathway-options">{pathways.map(([title, detail, href]) => <a href={href} key={title}><div><strong>{title}</strong><span>{detail}</span></div><b>↗</b></a>)}</div>
        </section>

        <div className="hero-foundation" id="home-consultation"><p>Registered migration support and education guidance from a team that listens before it advises.</p><a href="tel:+61861619239">Speak with our team &nbsp;›</a></div>
      </main>
    </div>
  )
}
