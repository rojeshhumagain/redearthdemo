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
      </main>
    </div>
  )
}
