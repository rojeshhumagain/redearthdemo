import { useEffect, useState } from 'react'
import SiteHeader from './SiteHeader'

const pathways = [
  ['Study', 'Course guidance and student visas', '#student-visa'],
  ['Work', 'Skilled and employer pathways', '#skilled-migration'],
  ['Join family', 'Partner, parent and family visas', '#family-visas'],
  ['Visit', 'Visitor and working holiday visas', '/visitor-visa/electronic-travel-authority-601'],
]

const finderQuestions = [
  {
    prompt: 'What is your main goal in Australia?',
    options: [['study', 'Study', 'Begin or continue your education'], ['work', 'Work', 'Explore skilled or employer pathways'], ['family', 'Join family', 'Live with a partner, parent or child'], ['visit', 'Visit', 'Travel, see family or attend business activities']],
  },
  {
    prompt: 'Where are you currently located?',
    options: [['inside', 'In Australia', 'I currently hold or have held an Australian visa'], ['outside', 'Outside Australia', 'I am planning my move from overseas']],
  },
  {
    prompt: 'Do you have an Australian sponsor?',
    options: [['yes', 'Yes', 'A person or employer may be able to sponsor me'], ['no', 'No', 'I need to understand independent options'], ['unsure', 'Not sure', 'I would like help understanding sponsorship']],
  },
]

const finderResults = {
  study: ['Student and graduate pathways', 'Your starting point may include course selection, a Student Visa Subclass 500 or post-study options.', '#student-visa'],
  work: ['Skilled and employer pathways', 'Your experience, occupation, location and sponsor status can shape the skilled or employer-sponsored options available.', '#skilled-migration'],
  family: ['Partner and family pathways', 'Your relationship, sponsor eligibility and current location can affect which partner, parent or family pathway is appropriate.', '#family-visas'],
  visit: ['Visitor visa pathways', 'Your passport, purpose of travel and intended stay can determine whether an ETA, eVisitor or Visitor Visa may be relevant.', '/visitor-visa/electronic-travel-authority-601'],
}

const processSteps = [
  ['Understand', 'We begin with your goals, circumstances, current status and the questions that matter most to you.'],
  ['Assess', 'Our team reviews the relevant pathways, requirements, timing considerations and potential risks.'],
  ['Plan', 'You receive a clear strategy covering the proposed pathway, evidence, responsibilities and next steps.'],
  ['Prepare', 'We help organise, review and prepare the application material before lodgement or submission.'],
  ['Support', 'We keep communication clear, help respond to requests and explain what comes next as the matter progresses.'],
]

const approachPrinciples = [
  ['We listen before we recommend', 'Your circumstances, priorities and concerns shape the conversation. We begin with questions, not assumptions.'],
  ['We explain the difficult parts', 'Requirements, risks and alternatives are discussed in clear language so you can make an informed decision.'],
  ['We prepare with care', 'Details matter. We help organise evidence, review information and identify gaps before they become avoidable problems.'],
  ['We connect the bigger picture', 'Where relevant, education choices and migration planning are considered together rather than as isolated decisions.'],
  ['We stay accountable', 'You receive clear next steps and straightforward communication as your matter moves through each stage.'],
]

const clientJourneys = [
  {
    category: 'Student planning',
    title: 'Turning study uncertainty into a structured plan.',
    situation: 'An international student is comparing courses, costs and the long-term value of studying in Australia.',
    support: 'The conversation brings course selection, application preparation and student visa requirements into one practical plan.',
    next: 'A focused shortlist, clearer documentation priorities and an informed next step.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=86',
    alt: 'International students working together on campus',
  },
  {
    category: 'Partner pathway',
    title: 'Bringing a shared life into one clear application strategy.',
    situation: 'A couple needs to understand which partner pathway may fit their location, relationship history and future plans.',
    support: 'The process focuses on pathway differences, sponsor responsibilities, evidence planning and realistic timing considerations.',
    next: 'A better understanding of the relevant pathway and the evidence that may need to be prepared.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=86',
    alt: 'A couple spending time together outdoors',
  },
  {
    category: 'Skilled migration',
    title: 'Connecting professional experience to the right questions.',
    situation: 'A professional wants to understand how occupation, experience, English ability and location influence migration options.',
    support: 'The assessment organises the key facts, identifies information gaps and compares skilled and employer-sponsored starting points.',
    next: 'A realistic pathway discussion based on the person’s actual profile rather than assumptions.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=86',
    alt: 'Professionals collaborating around a table',
  },
]

const offices = [
  { name: 'Osborne Park', area: 'Perth head office', address: ['Suite 8, 176 Main Street', 'Osborne Park, WA 6017, Australia'], phone: '(08) 6161 9239', mobile: '0410 755 603', email: 'info@redearthmigration.com.au', place: 'PERTH', code: 'WA · 6017' },
  { name: 'Morley', area: 'Perth north-east', address: ['Shop 28, 243/253 Walter Road West', 'Morley, WA 6062, Australia'], phone: '(08) 6161 9239', mobile: '0410 755 603', email: 'info@redearthmigration.com.au', place: 'MORLEY', code: 'WA · 6062' },
  { name: 'Harrisdale', area: 'Perth south-east', address: ['5/723 Ranford Road', 'Harrisdale, WA 6112, Australia'], phone: '(08) 6161 9239', mobile: '0410 755 603', email: 'info@redearthmigration.com.au', place: 'HARRISDALE', code: 'WA · 6112' },
  { name: 'New Delhi', area: 'India office', address: ['First Floor, Front Side, C-1 Shivaji Marg', 'Near West Metro Station, Vikaspuri, New Delhi 110018, India'], phone: '+91 80691 64147', mobile: null, email: 'info@redearthmigration.com', place: 'DELHI', code: 'INDIA · 110018' },
]

const immigrationArticles = [
  {
    category: 'Study pathways', date: '04 September 2026', read: '6 min read',
    title: 'In-Demand Courses in Australia 2026: What Should Onshore Students Study Next?',
    summary: 'A practical look at course decisions, employment demand and the questions onshore students should consider before changing direction.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=86',
    alt: 'Graduates walking together after a university ceremony',
  },
  {
    category: 'PR planning', date: '29 August 2026', read: '5 min read',
    title: 'Already in Australia? Why 2026 Could Be the Year to Reassess Your PR Pathway',
    summary: 'Why changes in circumstances, occupation and location can make a fresh pathway discussion worthwhile.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=84',
    alt: 'Professionals discussing plans in a collaborative meeting',
  },
  {
    category: 'Skilled migration', date: '22 August 2026', read: '7 min read',
    title: 'Australia PR in 2026: Why Having the Right Occupation Is No Longer Enough',
    summary: 'Occupation is one factor. Points, English, experience, nomination settings and timing can matter too.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=84',
    alt: 'A modern Australian workplace prepared for a team meeting',
  },
]

function VisaPathwayFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const complete = step === finderQuestions.length
  const result = complete ? finderResults[answers[0]] : null

  const chooseAnswer = (value) => {
    setAnswers((current) => [...current.slice(0, step), value])
    setStep((current) => current + 1)
  }

  const goBack = () => {
    setStep((current) => Math.max(0, current - 1))
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  return (
    <section className="visa-finder" aria-labelledby="finder-title">
      <div className="finder-inner">
        <div className="finder-intro"><p>VISA PATHWAY FINDER</p><h2 id="finder-title">Not sure where to begin?</h2><span>Answer three simple questions to identify a useful starting point for your conversation with our team.</span><small>This tool provides general guidance only. It is not a visa eligibility assessment or migration advice.</small></div>
        <div className="finder-panel" aria-live="polite">
          <div className="finder-progress"><span>{complete ? 'Your starting point' : `Question ${step + 1} of ${finderQuestions.length}`}</span><div><i style={{ width: `${complete ? 100 : ((step + 1) / finderQuestions.length) * 100}%` }} /></div></div>
          {!complete ? <><h3>{finderQuestions[step].prompt}</h3><div className="finder-options">{finderQuestions[step].options.map(([value, label, detail]) => <button type="button" onClick={() => chooseAnswer(value)} key={value}><span><strong>{label}</strong><small>{detail}</small></span><b>›</b></button>)}</div>{step > 0 && <button className="finder-back" type="button" onClick={goBack}>← Back</button>}</> : <div className="finder-result"><p>RECOMMENDED CATEGORY</p><h3>{result[0]}</h3><span>{result[1]}</span><dl><div><dt>Your goal</dt><dd>{finderQuestions[0].options.find(([value]) => value === answers[0])?.[1]}</dd></div><div><dt>Current location</dt><dd>{finderQuestions[1].options.find(([value]) => value === answers[1])?.[1]}</dd></div><div><dt>Sponsor</dt><dd>{finderQuestions[2].options.find(([value]) => value === answers[2])?.[1]}</dd></div></dl><div className="finder-result-actions"><a href={result[2]}>Explore this pathway <b>›</b></a><button type="button" onClick={restart}>Start again</button></div></div>}
        </div>
      </div>
    </section>
  )
}

function ApproachSection() {
  const [openPrinciple, setOpenPrinciple] = useState(0)

  return (
    <section className="home-approach" aria-labelledby="approach-title">
      <div className="approach-inner">
        <figure className="approach-visual"><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=86" alt="Professional adviser meeting with clients" loading="lazy" /><figcaption><span>Personal guidance</span><strong>Clarity at every stage</strong></figcaption></figure>
        <div className="approach-content"><p>THE RED EARTH APPROACH</p><h2 id="approach-title">Professional support should still feel personal.</h2><span className="approach-lead">Our role is not simply to process information. It is to help you understand the decisions in front of you and prepare for them with confidence.</span><div className="approach-list">{approachPrinciples.map(([title, description], index) => <div className="approach-item" key={title}><button type="button" onClick={() => setOpenPrinciple(openPrinciple === index ? -1 : index)} aria-expanded={openPrinciple === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><b>{openPrinciple === index ? '−' : '+'}</b></button>{openPrinciple === index && <p>{description}</p>}</div>)}</div></div>
      </div>
    </section>
  )
}

function ClientJourneysSection() {
  const [activeJourney, setActiveJourney] = useState(0)
  const journey = clientJourneys[activeJourney]
  const selectJourney = (direction) => setActiveJourney((current) => (current + direction + clientJourneys.length) % clientJourneys.length)

  return (
    <section className="client-journeys" aria-labelledby="journeys-title">
      <div className="journeys-inner">
        <div className="journeys-heading"><div><p>ILLUSTRATIVE CLIENT JOURNEYS</p><h2 id="journeys-title">Different questions. A more considered way forward.</h2></div><div><p>See how an advice conversation can bring structure to common education and migration decisions.</p><small>These are demonstration scenarios, not client testimonials or claims of visa outcomes.</small></div></div>
        <div className="journey-layout">
          <article className="journey-feature" aria-live="polite"><img src={journey.image} alt={journey.alt} loading="lazy" /><div className="journey-story"><p>{journey.category}</p><h3>{journey.title}</h3><dl><div><dt>The situation</dt><dd>{journey.situation}</dd></div><div><dt>How support can help</dt><dd>{journey.support}</dd></div><div><dt>A clearer next step</dt><dd>{journey.next}</dd></div></dl></div></article>
          <aside className="journey-selector"><div className="journey-selector-top"><span>EXPLORE THE JOURNEYS</span><div><button type="button" onClick={() => selectJourney(-1)} aria-label="Previous journey">←</button><button type="button" onClick={() => selectJourney(1)} aria-label="Next journey">→</button></div></div>{clientJourneys.map((item, index) => <button className={activeJourney === index ? 'active' : ''} type="button" onClick={() => setActiveJourney(index)} aria-pressed={activeJourney === index} key={item.category}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.category}</strong><small>{item.title}</small></div><b>›</b></button>)}<a href="#home-consultation">Discuss your own circumstances <b>›</b></a></aside>
        </div>
      </div>
    </section>
  )
}

function OfficeLocationsSection() {
  const [activeOffice, setActiveOffice] = useState(0)
  const office = offices[activeOffice]

  return (
    <section className="office-locations" aria-labelledby="locations-title">
      <div className="locations-inner">
        <div className="locations-heading"><div><p>OUR LOCATIONS</p><h2 id="locations-title">Local conversations, wherever your journey begins.</h2></div><p>Meet with the Red Earth team across three Perth locations or connect through our New Delhi office. Select an office to view verified contact details.</p></div>
        <div className="office-explorer">
          <div className="office-tabs" role="tablist" aria-label="Office locations">{offices.map((item, index) => <button className={activeOffice === index ? 'active' : ''} type="button" role="tab" aria-selected={activeOffice === index} onClick={() => setActiveOffice(index)} key={item.name}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.name}</strong><small>{item.area}</small></div><b>›</b></button>)}</div>
          <div className="office-detail" role="tabpanel" aria-live="polite"><div className="office-information"><p>SELECTED OFFICE</p><h3>{office.name}</h3><dl><div><dt>Address</dt><dd>{office.address.map((line) => <span key={line}>{line}</span>)}</dd></div><div><dt>Contact</dt><dd><a href={`tel:${office.phone.replaceAll(' ', '')}`}>{office.phone}</a>{office.mobile && <a href={`tel:${office.mobile.replaceAll(' ', '')}`}>{office.mobile}</a>}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${office.email}`}>{office.email}</a></dd></div><div><dt>General hours</dt><dd><span>Monday–Friday: 8:30 am–5:00 pm</span><span>Saturday–Sunday: Closed</span></dd></div></dl><a className="office-appointment" href="#home-consultation">Book at this office <b>›</b></a></div><div className="office-place" aria-hidden="true"><span>{office.code}</span><strong>{office.place}</strong><p>Education<br />& Migration</p></div></div>
        </div>
      </div>
    </section>
  )
}

function ImmigrationNewsSection() {
  const [featured, ...supporting] = immigrationArticles
  return (
    <section className="home-news" id="immigration-news" aria-labelledby="news-title">
      <div className="news-inner">
        <div className="news-heading"><div><p>IMMIGRATION NEWS & INSIGHTS</p><h2 id="news-title">Useful context for your next decision.</h2></div><div><p>Practical articles about Australian education, migration settings and the questions worth asking before you act.</p><a href="#all-news">View all immigration news <b>›</b></a></div></div>
        <div className="news-layout">
          <article className="news-feature"><img src={featured.image} alt={featured.alt} loading="lazy" /><div><p>{featured.category}</p><h3>{featured.title}</h3><span>{featured.summary}</span><div><small>{featured.date} &nbsp;·&nbsp; {featured.read}</small><a href="#featured-article">Read article <b>›</b></a></div></div></article>
          <div className="news-supporting">{supporting.map((article) => <article key={article.title}><img src={article.image} alt={article.alt} loading="lazy" /><div><p>{article.category}</p><h3>{article.title}</h3><span>{article.summary}</span><small>{article.date} &nbsp;·&nbsp; {article.read}</small><a href="#article">Read article <b>›</b></a></div></article>)}</div>
        </div>
        <p className="news-note">Migration information can change. Article content is general information and should be checked against current official requirements and your circumstances.</p>
      </div>
    </section>
  )
}

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

        <section className="home-services" id="all-services" aria-labelledby="services-title">
          <div className="home-services-inner">
            <div className="service-intro"><p>HOW WE CAN HELP</p><h2 id="services-title">One team. Two kinds of support. <span>A clearer way forward.</span></h2><div><p>Education decisions and migration decisions often overlap. We bring both conversations together, so the advice you receive considers what happens now and what may come next.</p><a href="#home-consultation">Tell us about your plans <b>›</b></a></div></div>

            <article className="service-story" id="student-visa">
              <figure><img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=86" alt="Australian university campus viewed across the water" loading="lazy" /><figcaption>Education Services</figcaption></figure>
              <div className="service-story-copy"><p>01 &nbsp; EDUCATION SERVICES</p><h3>Choose your study direction with the full journey in mind.</h3><span>From comparing courses to preparing a student visa application, we help you understand your options and make informed decisions at every stage.</span><ul><li>Course and institution guidance</li><li>Student Visa Subclass 500 support</li><li>Application and document preparation</li><li>Study pathway and future planning</li></ul><a href="#education-services">Explore education services <b>›</b></a></div>
            </article>

            <article className="service-story reverse" id="skilled-migration">
              <figure><img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=86" alt="Sydney Harbour and Opera House at dusk" loading="lazy" /><figcaption>Migration Services</figcaption></figure>
              <div className="service-story-copy"><p>02 &nbsp; MIGRATION SERVICES</p><h3>Approach your visa pathway with a plan built around you.</h3><span>We assess your circumstances, explain the available pathways and support you through careful preparation and lodgement.</span><ul><li>Skilled and employer-sponsored visas</li><li>Partner, parent and family visas</li><li>Visitor, business and protection visas</li><li>Appeals, reviews and citizenship</li></ul><a href="#migration-services">Explore migration services <b>›</b></a></div>
            </article>
          </div>
        </section>

        <VisaPathwayFinder />

        <section className="home-process" aria-labelledby="process-title">
          <div className="process-heading"><div><p>HOW WE WORK</p><h2 id="process-title">A clear process for decisions that matter.</h2></div><p>You should always know what stage you are at, what is required and what happens next. Our process is designed to make complex matters easier to understand without oversimplifying them.</p></div>
          <div className="process-steps">{processSteps.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          <div className="process-close"><strong>Every matter is different.</strong><p>Your pathway, documentation and timing will be assessed against your individual circumstances.</p><a href="#home-consultation">Start a conversation <b>›</b></a></div>
        </section>

        <ApproachSection />

        <ClientJourneysSection />

        <OfficeLocationsSection />

        <ImmigrationNewsSection />
      </main>
    </div>
  )
}
