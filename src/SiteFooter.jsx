const footerPosts = [
  ['In-Demand Courses in Australia 2026: What Should Onshore Students Study Next?', '04 September'],
  ['Already in Australia? Why 2026 Could Be the Year to Reassess Your PR Pathway', '29 August'],
  ['Australia PR in 2026: Why Having the Right Occupation Is No Longer Enough', '22 August'],
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about"><img src="/red-earth-logo.png" alt="Red Earth Education and Migration Agents" /><p>Red Earth Migration is a specialist consultancy supporting education and migration decisions with clarity, care and professional responsibility.</p><small>Information on this website is general only. For migration advice specific to your circumstances, speak with one of our Registered Migration Agents.</small><a href="https://www.mara.gov.au/becoming-an-agent/professional-standards-and-obligations/code-of-conduct/">Code of Conduct</a></div>
        <div><h3>Recent Insights</h3>{footerPosts.map(([title, date]) => <a className="post-link" href="/#immigration-news" key={title}><span>{title}</span><small>{date}</small></a>)}</div>
        <div><h3>Quick Links</h3><a href="/">Home</a><a href="/#about-us">About Us</a><a href="/#all-services">Services</a><a href="/#immigration-news">Immigration News</a><a href="/#home-consultation">Contact Us</a><a href="#career">Careers</a><a href="#privacy">Privacy Policy</a></div>
        <div><h3>Contact</h3><p>Osborne Park · Morley<br />Harrisdale · New Delhi</p><a href="tel:+61861619239">(08) 6161 9239</a><a href="tel:+61410755603">0410 755 603</a><p>Monday–Friday<br />8:30 am–5:00 pm</p><a href="mailto:info@redearthmigration.com.au">info@redearthmigration.com.au</a><div className="subscribe"><input type="email" aria-label="Newsletter email" placeholder="Email address" /><button aria-label="Subscribe">›</button></div></div>
      </div>
      <div className="copyright"><span>Copyright © Red Earth Migration. All rights reserved.</span><span>Education & Migration Agents</span></div>
    </footer>
  )
}
