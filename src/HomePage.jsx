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

        <section className="home-trust" id="about-us" aria-labelledby="trust-title">
          <div className="trust-intro">
            <div className="trust-title"><p>WHY RED EARTH</p><h2 id="trust-title">Good advice starts with understanding your whole story.</h2></div>
            <div className="trust-copy"><p>Migration decisions affect far more than an application. They shape where you study, how you work and where your family builds its future. That is why we begin by listening, then give you a clear view of the pathway, requirements and risks relevant to you.</p><strong>We do not believe in one-size-fits-all answers. We believe in careful preparation, honest expectations and advice you can understand.</strong><a href="#code-of-conduct">Our professional commitment <span>›</span></a></div>
          </div>
          <div className="trust-evidence" aria-label="Red Earth credentials">
            <div><strong>Registered</strong><span>Migration Agent support</span><p>Advice informed by Australian migration law and professional obligations.</p></div>
            <div><strong>2014</strong><span>Established practice</span><p>More than a decade focused on education and migration matters.</p></div>
            <div><strong>4</strong><span>Service locations</span><p>Support across Osborne Park, Morley, Harrisdale and Delhi.</p></div>
            <div><strong>11</strong><span>Migration service areas</span><p>From student and skilled pathways to family, business and reviews.</p></div>
          </div>
        </section>
      </main>
    </div>
  )
}
