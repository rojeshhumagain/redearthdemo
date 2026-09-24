import { useLayoutEffect } from 'react'

const targets = [
  '.home-hero-content', '.home-hero-visual', '.hero-pathway',
  '.trust-intro > *', '.trust-evidence > div',
  '.production-services header > *', '.production-service-tabs', '.production-service-feature',
  '.process-heading > *', '.process-workspace > aside', '.process-list > li', '.process-close',
  '.approach-visual', '.approach-content',
  '.journeys-heading > *', '.journey-tabs', '.journey-feature', '.journey-close',
  '.locations-heading > *', '.office-tabs > button', '.office-detail',
  '.news-heading > *', '.news-feature', '.news-supporting article',
  '.homepage-faq aside', '.homepage-faq-item',
  '.home-contact-inner > *', '.production-cta-inner > *',
  '.visa-hero', '.page-nav', '.visa-content > section', '.visa-sidebar > div',
  '.related-heading', '.related-card', '.enquiry-form',
  '.service-catalog-intro', '.service-catalog-grid article', '.service-catalog-contact',
  '.concepts-intro', '.concept-block', '.footer-main > *',
].join(', ')

export default function ScrollReveal() {
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const seen = new WeakSet()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.classList.add('scroll-reveal-visible')
        observer.unobserve(target)
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' })

    const scan = () => {
      document.querySelectorAll(targets).forEach((element) => {
        if (seen.has(element)) return
        seen.add(element)
        const bounds = element.getBoundingClientRect()
        if (bounds.top < window.innerHeight && bounds.bottom > 0) return
        element.classList.add('scroll-reveal')
        observer.observe(element)
      })
    }

    scan()
    const changes = new MutationObserver(scan)
    changes.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => {
      changes.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
