import React from 'react';
import { Lightbulb, Target } from 'lucide-react';

export default function Explainability({ explainability, candidate }) {
  // Helper to safely format URLs (Recommendation #12)
  const formatUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="explainability-container" style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
      {/* 
        Embedded styles for hover effects (Rec #5) 
        and responsive layout stacking (Rec #10) 
      */}
      <style>{`
        .candidate-card {
          flex-direction: row;
          align-items: center;
        }
        .social-link {
          transition: all 0.2s ease;
        }
        .social-link:hover {
          transform: translateY(-1px);
          filter: brightness(0.95);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        @media (max-width: 600px) {
          .candidate-card {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .candidate-links {
            width: 100%;
            padding-top: 4px;
          }
        }
      `}</style>

      {/* Header (Rec #1 & #2) */}
      <div style={{
        padding: '24px 32px',
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111111',
          marginBottom: '4px',
          letterSpacing: '-0.3px',
        }}>
          AI Resume Insights
        </div>
        <div style={{
          fontSize: '14px',
          color: '#8A8A8A',
        }}>
          Understand your score and discover practical ways to improve your resume.
        </div>
      </div>

      <div style={{ padding: '32px' }}>

        {/* Candidate Info */}
        {candidate && (
          <div className="candidate-card" style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            backgroundColor: '#FAFAFA',
            borderRadius: '16px',
            border: '1px solid #F0F0F0',
            marginBottom: '32px', // Rec #8: Increased spacing
            flexWrap: 'wrap',
          }}>
            {/* Avatar (Rec #3) */}
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#635BFF',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              flexShrink: 0,
            }}>
              {candidate.name && candidate.name.length < 50
                ? candidate.name.charAt(0).toUpperCase()
                : '?'
              }
            </div>

            {/* Info (Rec #4) */}
            <div style={{ flex: 1, minWidth: '150px' }}>
              {candidate.name && candidate.name.length < 50 && (
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#111111',
                  marginBottom: '2px',
                }}>
                  {candidate.name}
                </div>
              )}
              {candidate.role && (
                <div style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#4B5563',
                  marginBottom: '2px',
                }}>
                  {candidate.role}
                </div>
              )}
              {candidate.email && (
                <div style={{
                  fontSize: '13px',
                  color: '#8A8A8A',
                }}>
                  {candidate.email}
                </div>
              )}
            </div>

            {/* Links (Rec #5) */}
            <div className="candidate-links" style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
              {candidate.linkedin && (
                <a
                  href={formatUrl(candidate.linkedin)}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#635BFF',
                    backgroundColor: '#EEF0FF',
                    border: '1px solid #D4D0FF',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn
                </a>
              )}
              {candidate.github && (
                <a
                  href={formatUrl(candidate.github)}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111111',
                    backgroundColor: '#F4F4F4',
                    border: '1px solid #E8E8E8',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    textDecoration: 'none',
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}

        {/* AI Explanation (Rec #6 & #11) */}
        <div style={{
          padding: '24px',
          backgroundColor: '#EEF0FF',
          borderRadius: '16px',
          border: '1px solid #D4D0FF',
          marginBottom: '32px', // Rec #8: Increased spacing
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <Lightbulb size={18} color="#635BFF" />
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#635BFF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              AI Explanation
            </div>
          </div>
          <p style={{
            fontSize: '14.5px',
            color: '#111111',
            lineHeight: '1.6',
            margin: 0,
          }}>
            {explainability.why_this_score}
          </p>
        </div>

        {/* Recommendations (Rec #7 & #11) */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}>
            <Target size={18} color="#8A8A8A" />
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#8A8A8A',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Recommendations
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {explainability.improvement_suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px',
                  backgroundColor: '#FAFAFA',
                  borderRadius: '12px',
                  border: '1px solid #F0F0F0',
                }}
              >
                {/* Numbered badge instead of arrow */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#EEF0FF',
                  color: '#635BFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <p style={{
                  fontSize: '14.5px',
                  color: '#111111',
                  lineHeight: '1.5',
                  margin: 0,
                  marginTop: '2px', // Alignment tweak to match the badge
                }}>
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}