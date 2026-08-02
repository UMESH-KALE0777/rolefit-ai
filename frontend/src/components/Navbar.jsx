export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(99,91,255,0.08)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/logo.png"
            alt="RoleFit AI"
            style={{
              height: '36px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
          <span style={{
            fontSize: '17px',
            fontWeight: '700',
            color: '#0A0A0A',
            letterSpacing: '-0.5px',
          }}>
            RoleFit<span style={{ color: '#635BFF' }}>AI</span>
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* <a
            href="https://github.com/UMESH-KALE0777/rolefit-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              color: '#6B7280',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            GitHub
          </a> */}

          <a
            href="#analyze"
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(135deg, #635BFF 0%, #7C3AED 100%)',
              padding: '9px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(99,91,255,0.3)',
              letterSpacing: '-0.2px',
            }}
          >
            Try Free →
          </a>
        </div>
      </div>
    </nav>
  )
}