const features = [
  {
    title: 'Soil Insights',
    body: 'Track moisture, pH, and nutrient trends across every block in one place.',
  },
  {
    title: 'Field Scheduling',
    body: 'Plan planting, irrigation, and harvest windows with shared team calendars.',
  },
  {
    title: 'Yield Reporting',
    body: 'Compare season-over-season output and export reports for your buyers.',
  },
]

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 32px',
          borderBottom: '1px solid var(--sand-200)',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--earth-500)',
              display: 'inline-block',
            }}
          />
          <strong style={{ fontSize: 18, letterSpacing: '-0.01em' }}>Red Earth</strong>
        </div>
        <nav style={{ display: 'flex', gap: 24, fontSize: 14, color: 'var(--ink-muted)' }}>
          <a href="#features" style={{ textDecoration: 'none' }}>Features</a>
          <a href="#status" style={{ textDecoration: 'none' }}>Status</a>
        </nav>
      </header>

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 1040,
          margin: '0 auto',
          padding: '64px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 64,
        }}
      >
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
          <span
            style={{
              alignSelf: 'flex-start',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--earth-700)',
              background: 'var(--sand-200)',
              padding: '6px 10px',
              borderRadius: 999,
            }}
          >
            Demo environment
          </span>
          <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Farm operations, grounded in data.
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            Red Earth brings soil, scheduling, and yield data together so growing teams can make
            decisions before the weather does.
          </p>
          <a
            className="cta"
            href="#features"
            style={{
              alignSelf: 'flex-start',
              background: 'var(--earth-700)',
              color: '#fff',
              padding: '12px 22px',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Explore the demo
          </a>
        </section>

        <section id="features" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, letterSpacing: '-0.02em' }}>What is included</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {features.map((f) => (
              <article
                key={f.title}
                className="card"
                style={{
                  background: '#fff',
                  border: '1px solid var(--sand-200)',
                  borderRadius: 14,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 17 }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="status"
          style={{
            background: '#fff',
            border: '1px solid var(--sand-200)',
            borderRadius: 14,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, letterSpacing: '-0.02em' }}>Environment status</h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
            Vite dev server is running and serving this page. Edit <code>src/App.jsx</code> to
            iterate on the interface.
          </p>
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--sand-200)',
          padding: '20px 32px',
          fontSize: 13,
          color: 'var(--ink-muted)',
          background: '#fff',
        }}
      >
        Red Earth Demo
      </footer>
    </div>
  )
}
