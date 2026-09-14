import { useState } from 'react'

const toc = [
  ['what-is-sat', 'What is the SAT Exam?'],
  ['highlights', 'Digital SAT Exam Highlights'],
  ['eligibility', 'Digital SAT Exam Eligibility'],
  ['fees', 'Digital SAT Exam Fee 2026'],
  ['registration', 'Digital SAT Exam Registration 2026'],
  ['dates', 'SAT Exam Dates and Deadlines 2026'],
  ['syllabus', 'What is the SAT Exam Syllabus?'],
  ['scores', 'Digital SAT Results and Scores'],
  ['prepare', 'How to Prepare for the SAT Exam?'],
]

const takeaways = [
  'The Digital SAT is a 2 hour 14 minute online test with two sections: Reading and Writing (64 minutes, 54 questions) and Mathematics (70 minutes, 44 questions), scored out of 1,600.',
  'International students pay US $68 registration fee plus US $43 international fee, with additional charges for selected test services.',
  'The SAT uses multistage adaptive testing, meaning the difficulty of your second module adjusts based on your first module performance.',
  'The test does not penalise incorrect or unanswered questions, and all test-takers have access to the Desmos graphing calculator.',
]

const faqs = [
  ['What is the full form of the SAT exam?', 'SAT originally stood for Scholastic Assessment Test. Today, it is officially referred to simply as the SAT, a standardised digital test used for undergraduate admissions primarily in the US and Canada.'],
  ['Who is eligible to take the SAT Exam?', 'The College Board does not set restrictions regarding age, grade or educational background. Students planning undergraduate study can register and take the test.'],
  ['What is the SAT Exam syllabus?', 'The SAT has two sections: Reading and Writing, and Mathematics. It covers grammar, vocabulary, algebra, advanced math, data analysis, problem-solving, geometry and trigonometry.'],
  ['How can I register for the SAT exam?', 'Create a College Board account, select a test centre and date, complete your details, upload a photograph and pay the registration fee.'],
  ['How long are SAT scores valid?', 'SAT scores do not strictly expire, although many universities prefer results from tests taken within the last two to five years.'],
]

function Chevron() {
  return <span className="chevron">⌄</span>
}

function ConsultationForm({ compact = false }) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <form className={`consultation ${compact ? 'compact' : ''}`} onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
      <h2>Plan your SAT exam strategy with our study abroad experts</h2>
      <div className="rating"><b className="google">G</b><span>★★★★★</span><strong>4.85</strong><small>(19,027 reviews)</small></div>
      {submitted ? (
        <div className="success"><span>✓</span><h3>Thank you!</h3><p>Our study abroad expert will contact you shortly.</p></div>
      ) : (
        <>
          <input aria-label="Full name" placeholder="Full Name *" required />
          <div className="phone-row"><button type="button" className="select-button">Dial Code <Chevron /></button><input aria-label="Mobile number" placeholder="Mobile Number*" required /></div>
          <input aria-label="Email" type="email" placeholder="Email ID *" required />
          <button type="button" className="select-button full">Which year do you want to start?* <Chevron /></button>
          <button type="button" className="select-button full muted">When do you plan to start?* <Chevron /></button>
          <label className="interest-label">Interested in? <i>*</i></label>
          <button type="button" className="select-button full">SAT <Chevron /></button>
          <label className="consent"><input type="checkbox" defaultChecked /> <span>I agree to AECC's <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms and Conditions</a> *</span></label>
          <button className="primary" type="submit">Get SAT Guidance Now <b>›</b></button>
        </>
      )}
    </form>
  )
}

function InfoTable({ rows }) {
  return <div className="table-wrap"><table><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(0)

  return (
    <div>
      <div className="utility"><div className="utility-inner"><a href="#advice">Advice</a><a className="pill" href="#contact">Contact Us</a><a className="pill" href="#consultation">Book an Appointment</a><button className="region">◎ &nbsp; Global <Chevron /></button></div></div>
      <header className="header">
        <a className="logo" href="#top"><img src="https://www.aeccglobal.com/aecc_logo.svg" alt="AECC Study Abroad Consultants" /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '✕' : '☰'}</button>
        <nav className={menuOpen ? 'open' : ''}>{['Study Abroad', 'Destinations', 'Courses', 'Exams', 'Scholarships', 'Application', 'Student Services'].map((item) => <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item} <Chevron /></a>)}</nav>
      </header>

      <main id="top">
        <div className="breadcrumbs"><a href="#home">⌂ Home</a><span>›</span><a href="#exams">Exams</a><span>›</span><b>Sat</b></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>SAT Exam Guide 2026 for International Students</h1>
            <p className="lead">Here is a detailed guide for the SAT exam, outlining important topics like the SAT eligibility criteria, registration process, SAT exam fees, dates, SAT syllabus and scoring mechanism, and preparation tips to help you score high.</p>
            <div className="meta"><span>by <a href="#author">Bindu Mary Idicula</a></span><span>◷ &nbsp;23rd Apr 2026</span><span>▤ &nbsp;17 mins read</span><span>⊙ &nbsp;189K views</span></div>
            <div className="share-row"><button><b>G</b> Add AECC on Google</button><span>Share <b className="share-icon">⌯</b></span></div>
            <img className="hero-image" src="https://static.aeccglobal.com/study_abroad_exams_4de081cc28.webp" alt="Students preparing to study abroad" />
          </div>
          <aside id="consultation"><ConsultationForm /></aside>
        </div>

        <div className="article-grid">
          <aside className="toc"><div className="toc-title"><span>▱</span><div><strong>On this Page</strong><small>9 sections</small></div></div><div className="toc-links">{toc.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}</div></aside>
          <article className="article">
            <section className="key-takeaways"><p className="eyebrow">◆ &nbsp; KEY TAKEAWAYS</p><h2>What you'll learn in this article</h2>{takeaways.map((item) => <div className="takeaway" key={item}><span>✓</span><p>{item}</p></div>)}</section>

            <p>Did you know that even though most US universities are test-optional, submitting your SAT exam scores can improve your application? These scores can give admission committees a greater insight into your academic potential and preparedness.</p>
            <p>The SAT exam has long been used to enrol prospective students, both domestic and international, to undergraduate programmes across the US and Canada. Through this guide, we discuss everything you need to know before applying to universities and colleges this year.</p>

            <section id="what-is-sat"><h2>What is the SAT Exam?</h2><p>The latest and only version of the SAT, called the Digital SAT exam, is a 2-hour and 14-minute standardised test split into two main sections: Reading and Writing, and Mathematics. The Reading and Writing section is 64 minutes, while Mathematics is 70 minutes.</p><p>Offered as an online standardised test at a proctored test centre, the Digital SAT does not penalise candidates for incorrect or unanswered questions. The exam is scored out of 1,600, with each section scored on a scale of 200–800.</p></section>

            <section id="highlights"><h3>Digital SAT Exam Highlights</h3><p>Get a quick understanding of the important details regarding the SAT exam.</p><InfoTable rows={[["Feature", "Reading & Writing", "Mathematics"], ["Total Duration", "64 minutes", "70 minutes"], ["Number of Questions", "54 questions", "44 questions"], ["Question Types", "Multiple choice", "MCQ + student-produced"], ["Content Area", "Craft, ideas & conventions", "Algebra, data & geometry"]]} /></section>

            <div className="inline-cta"><div><small>FREE 1:1 SESSION</small><h3>Build your SAT strategy with an expert</h3></div><a href="#consultation">Book Free Consultation <b>›</b></a></div>

            <section id="eligibility"><h2>Digital SAT Exam Eligibility</h2><p>As an entrance exam to undergraduate courses offered by top-ranking universities in the USA and Canada, the SAT does not specify particular academic requirements. Candidates need to register, pay the applicable international test fees and appear on the scheduled date under College Board regulations.</p></section>

            <section id="fees"><h2>Digital SAT Exam Fee 2026</h2><p>International students should account for registration and additional service charges before completing their application.</p><InfoTable rows={[["Charge / Cost", "SAT Fees (USD)"], ["SAT Registration Fee", "US $68"], ["International Fee", "US $43"], ["Test Centre Fee (select locations)", "US $24"], ["Changing Test Centre", "US $34"], ["Late Registration Fee", "US $38"]]} /></section>

            <section id="registration"><h2>Digital SAT Exam Registration 2026</h2><p>Students planning to attempt the SAT outside the USA can follow this registration process:</p><ul><li><strong>Find multiple testing locations:</strong> Search verified centres through your MySAT account.</li><li><strong>Select the preferred date:</strong> Choose a date with enough preparation and score-reporting time.</li><li><strong>Complete the registration:</strong> Enter details exactly as shown on your official documents.</li><li><strong>Submit your photograph:</strong> Upload a clear image that meets College Board specifications.</li><li><strong>Complete payment:</strong> Pay by credit or debit card and download your admission ticket.</li></ul></section>

            <section id="dates"><h2>SAT Exam Dates and Deadlines 2026</h2><p>Upcoming test dates and registration deadlines include:</p><InfoTable rows={[["SAT Test Date", "Registration Deadline", "Late Deadline"], ["2 May 2026", "17 April 2026", "21 April 2026"], ["6 June 2026", "22 May 2026", "26 May 2026"]]} /></section>

            <section id="syllabus"><h2>What is the SAT Exam Syllabus?</h2><p>The Digital SAT consists of Reading and Writing, and Mathematics. The updated test replaces long passages with shorter passages and includes an adaptive second module based on your first-module performance.</p><h3>SAT Reading and Writing Section</h3><p>This section evaluates Craft and Structure, Information and Ideas, Standard English Conventions and Expression of Ideas across literature, history, science and humanities.</p><h3>SAT Math Section</h3><p>Mathematics assesses algebra, advanced math, problem-solving and data analysis, geometry and trigonometry. Approximately 75% is multiple choice and 25% uses student-produced responses.</p></section>

            <section id="scores"><h2>Digital SAT Results and Scores</h2><p>SAT scores are generally available within two to four weeks. Students access them through their College Board account and can download a PDF score report.</p><ul><li>Total SAT Score: 400–1,600</li><li>Reading and Writing Score: 200–800</li><li>Math Score: 200–800</li></ul></section>

            <section id="prepare"><h2>How to Prepare for the SAT Exam?</h2><ul><li><strong>Download the Bluebook App</strong> and become familiar with its interface.</li><li><strong>Attempt a timed practice test</strong> to understand the adaptive model.</li><li><strong>Use official material</strong> from College Board and Khan Academy.</li><li><strong>Train with the Desmos Calculator</strong> and learn useful shortcuts.</li><li><strong>Review every incorrect answer</strong> and complete a device check before test day.</li></ul></section>

            <section className="faq-section"><p className="eyebrow">COMMON QUESTIONS</p><h2>SAT Exam FAQs</h2>{faqs.map(([question, answer], index) => <div className="faq" key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><b>{faqOpen === index ? '−' : '+'}</b></button>{faqOpen === index && <p>{answer}</p>}</div>)}</section>
          </article>
        </div>
      </main>

      <section className="bottom-cta"><div><p>YOUR STUDY ABROAD JOURNEY STARTS HERE</p><h2>Ready to shape your future?</h2><span>Speak with our experienced education counsellors and take your next step with confidence.</span></div><a href="#consultation">Book a Free Consultation <b>›</b></a></section>
      <footer><div className="footer-brand"><img src="https://www.aeccglobal.com/aecc_logo.svg" alt="AECC" /><p>We help students make informed choices about studying abroad and build rewarding global careers.</p></div><div><h3>Study Abroad</h3><a href="#australia">Australia</a><a href="#usa">USA</a><a href="#canada">Canada</a><a href="#uk">United Kingdom</a></div><div><h3>Quick Links</h3><a href="#about">About AECC</a><a href="#services">Student Services</a><a href="#advice">Advice</a><a href="#contact">Contact Us</a></div></footer>
      <a className="floating-contact" href="#consultation" aria-label="Talk to a counsellor">☏</a>
    </div>
  )
}

export default App
