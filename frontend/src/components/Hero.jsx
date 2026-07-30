export default function Hero() {
  return (
    <section style={{
      paddingTop: '140px',
      paddingBottom: '100px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textAlign: 'center',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Premium mesh gradient background ─────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,91,255,0.25) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 80% 30%, rgba(59,130,246,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,91,255,0.08) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── Grid overlay ──────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99,91,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,91,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* ── Content ───────────────────────────────── */}
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(99, 91, 255, 0.08)',
          border: '1px solid rgba(99, 91, 255, 0.25)',
          borderRadius: '100px',
          padding: '6px 14px',
          marginBottom: '32px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: '#635BFF',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(99,91,255,0.8)',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#635BFF',
          }}>
            AI-Powered Resume Screening
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '64px',
          fontWeight: '800',
          color: '#0A0A0A',
          letterSpacing: '-3px',
          lineHeight: '1.0',
          marginBottom: '24px',
          fontFamily: 'Inter Tight, Inter, sans-serif',
        }}>
          Know your resume score
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #635BFF 0%, #8B5CF6 50%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            before the recruiter does
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: '18px',
          color: '#6B7280',
          lineHeight: '1.7',
          marginBottom: '48px',
          fontWeight: '400',
          maxWidth: '520px',
          margin: '0 auto 48px',
        }}>
          Upload your resume and paste any job description.
          Get your match score, skill gaps, and interview
          questions in under 5 seconds.
        </p>

        {/* Trust row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🔒', text: 'Resume never stored' },
            { icon: '⚡', text: 'Results in 5 seconds' },
            { icon: '✦', text: 'No signup required' },
          ].map((item) => (
            <div key={item.text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span style={{
                fontSize: '14px',
                color: '#9CA3AF',
                fontWeight: '500',
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#analyze"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #635BFF 0%, #7C3AED 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            padding: '16px 36px',
            borderRadius: '12px',
            textDecoration: 'none',
            letterSpacing: '-0.3px',
            boxShadow: '0 8px 32px rgba(99,91,255,0.4), 0 2px 8px rgba(99,91,255,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(99,91,255,0.5), 0 4px 12px rgba(99,91,255,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,91,255,0.4), 0 2px 8px rgba(99,91,255,0.2)'
          }}
        >
          Analyze my resume →
        </a>

      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(99,91,255,0.8); }
          50% { opacity: 0.6; box-shadow: 0 0 16px rgba(99,91,255,1); }
        }
      `}</style>

    </section>
  )
}