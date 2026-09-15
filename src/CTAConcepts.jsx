import { useEffect, useState } from 'react'
import SiteHeader from './SiteHeader'

const goalOptions = [
  ['study', 'Study in Australia', 'Discuss My Study Plan', 'Course selection, applications and student visa support.'],
  ['work', 'Work in Australia', 'Explore Skilled Pathways', 'Skilled, graduate and employer-sponsored starting points.'],
  ['family', 'Join family', 'Discuss a Family Visa', 'Partner, parent and other family migration pathways.'],
  ['visit', 'Visit Australia', 'Ask About Visitor Visas', 'ETA, eVisitor, Visitor Visa and working holiday options.'],
]

export default function CTAConcepts() {
  const [goal, setGoal] = useState(0)

  useEffect(() => {
    const previousTitle = document.title
    let robots = document.querySelector('meta[name="robots"]')
    const createdRobots = !robots
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    const previousRobots = robots.content
    document.title = 'CTA Design Concepts | Red Earth Client Review'
    robots.content = 'noindex, nofollow'
    return () => {
      document.title = previousTitle
      if (createdRobots) robots.remove()
      else robots.content = previousRobots
    }
  }, [])

  const selectedGoal = goalOptions[goal]

  return (
    <div className="concepts-page">
      <SiteHeader appointmentHref="#concept-one" />
      <main className="concepts-main">
        <header className="concepts-intro"><p>CLIENT REVIEW PROTOTYPE</p><h1>Four ways to invite the next conversation.</h1><div><span>Each concept uses the same Red Earth design system with a different conversion strategy. This page is excluded from search indexing.</span><a href="/">Return to homepage <b>›</b></a></div></header>

        <section className="concept-block" id="concept-one"><div className="concept-label"><span>CONCEPT 01</span><strong>Editorial Split</strong><p>Professional authority</p></div><div className="cta-concept-one"><div><p>START YOUR JOURNEY</p><h2>Your Australian pathway deserves <span>a clear plan.</span></h2><strong>Start with a conversation about your goals, circumstances and the options genuinely available to you.</strong></div><aside><a href="/#home-consultation">Book a consultation <b>›</b></a><a href="tel:+61861619239">Call (08) 6161 9239</a><small>For advice specific to your situation, speak with one of our Registered Migration Agents.</small></aside></div></section>

        <section className="concept-block"><div className="concept-label"><span>CONCEPT 02</span><strong>Human Consultation</strong><p>Personal reassurance</p></div><div className="cta-concept-two"><figure><img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=86" alt="Professional adviser meeting with clients" /><figcaption>A conversation centred on your circumstances.</figcaption></figure><div><p>REGISTERED MIGRATION SUPPORT</p><h2>Start with a conversation, <span>not an application.</span></h2><strong>Tell us where you are now and what you want to achieve. We will help you understand the questions and possible next steps.</strong><ul><li>Personalised discussion</li><li>Clear next steps</li><li>Honest expectations</li></ul><div><a href="/#home-consultation">Talk to our team <b>›</b></a><a href="mailto:info@redearthmigration.com.au">Email your question</a></div></div></div></section>

        <section className="concept-block"><div className="concept-label"><span>CONCEPT 03</span><strong>Goal-Based Action</strong><p>Guided conversion</p></div><div className="cta-concept-three"><header><p>FIND YOUR STARTING POINT</p><h2>What would you like help with?</h2><span>Select a goal to make the next action more relevant to you.</span></header><div className="concept-goals" role="tablist" aria-label="Select your goal">{goalOptions.map(([value, label], index) => <button className={goal === index ? 'active' : ''} type="button" role="tab" aria-selected={goal === index} onClick={() => setGoal(index)} key={value}><span>{label}</span><b>›</b></button>)}</div><div className="concept-goal-result" role="tabpanel" aria-live="polite"><p>{selectedGoal[1]}</p><span>{selectedGoal[3]}</span><a href="/#home-consultation">{selectedGoal[2]} <b>›</b></a><button type="button" onClick={() => setGoal(0)}>I’m not sure yet</button></div></div></section>

        <section className="concept-block concept-last"><div className="concept-label"><span>CONCEPT 04</span><strong>Contact Choice</strong><p>Speed and convenience</p></div><div className="cta-concept-four"><header><p>CONTACT RED EARTH</p><h2>Ready when you are.</h2><span>Choose the most convenient way to begin your conversation.</span></header><div className="contact-methods"><a href="/#home-consultation"><span>01</span><div><strong>Book an appointment</strong><small>Choose a time to discuss your circumstances</small></div><b>↗</b></a><a href="tel:+61861619239"><span>02</span><div><strong>Call our team</strong><small>(08) 6161 9239</small></div><b>↗</b></a><a href="mailto:info@redearthmigration.com.au"><span>03</span><div><strong>Send an email</strong><small>info@redearthmigration.com.au</small></div><b>↗</b></a><a href="/#locations-title"><span>04</span><div><strong>Visit an office</strong><small>Osborne Park, Morley, Harrisdale or New Delhi</small></div><b>↗</b></a></div><footer><span>General hours: Monday–Friday, 8:30 am–5:00 pm</span><a href="/#home-consultation">Start an enquiry <b>›</b></a></footer></div></section>
      </main>
    </div>
  )
}
