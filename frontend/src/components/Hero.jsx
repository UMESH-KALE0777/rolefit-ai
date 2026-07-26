export default function Hero() {
    return (
        <section style={{
            paddingTop: '140px',
            paddingBottom: '100px',
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: 'center',
            backgroundColor: '#F7F7F5',
        }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#EEF0FF',
                    border: '1px solid #D4D0FF',
                    borderRadius: '100px',
                    padding: '6px 14px',
                    marginBottom: '32px',
                }}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#635BFF',
                        borderRadius: '50%',
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
                    fontSize: '56px',
                    fontWeight: '800',
                    color: '#111111',
                    letterSpacing: '-2px',
                    lineHeight: '1.1',
                    marginBottom: '20px',
                    fontFamily: 'Inter Tight, Inter, sans-serif',
                }}>
                    Know your resume score
                    <br />
                    <span style={{ color: '#635BFF' }}>
                        before the recruiter does
                    </span>
                </h1>

                {/* Subheadline */}
                <p style={{
                    fontSize: '18px',
                    color: '#8A8A8A',
                    lineHeight: '1.6',
                    marginBottom: '48px',
                    fontWeight: '400',
                }}>
                    Upload your resume and paste any job description.
                    Get your match score, skill gaps, and interview questions
                    in under 5 seconds.
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
                                color: '#8A8A8A',
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
                        backgroundColor: '#635BFF',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '600',
                        padding: '14px 28px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        letterSpacing: '-0.2px',
                        transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => e.target.style.opacity = '0.85'}
                    onMouseLeave={e => e.target.style.opacity = '1'}
                >
                    Analyze my resume
                </a>

            </div>
        </section>
    );
}