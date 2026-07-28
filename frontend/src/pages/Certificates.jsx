import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const categories = ['All Category', 'UI/UX Design', 'Graphics Design', 'Animation', 'Web Development', 'Branding']

const certificates = [
  {
    id: 1,
    title: 'Payment Controls and Approval',
    provider: 'Amazon',
    providerIcon: '📦',
    date: '11th July',
    category: 'UI/UX Design',
    bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
    accent: '#D97706',
  },
  {
    id: 2,
    title: 'Figm UI/UX Design Advanced...',
    provider: 'Figma',
    providerIcon: '✏️',
    date: '5th July',
    category: 'UI/UX Design',
    bg: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
    accent: '#7C3AED',
  },
  {
    id: 3,
    title: 'State the UX Design Process...',
    provider: 'Google',
    providerIcon: '🌐',
    date: '15th July',
    category: 'UI/UX Design',
    bg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    accent: '#2563EB',
  },
  {
    id: 4,
    title: 'Graphic Design Master Class',
    provider: 'Adobe',
    providerIcon: '🎨',
    date: '19th July',
    category: 'Graphics Design',
    bg: 'linear-gradient(135deg, #FFF7ED, #FEE2E2)',
    accent: '#EA580C',
  },
]

function CertificatePreview({ cert }) {
  return (
    <div
      style={{
        background: cert.bg,
        borderRadius: 14,
        padding: '20px',
        aspectRatio: '4/3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${cert.accent}30`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 8,
          border: `1.5px solid ${cert.accent}40`,
          borderRadius: 10,
          pointerEvents: 'none',
        }}
      />
      <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: cert.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Certificate of Completion</div>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 10, color: '#111827', textAlign: 'center', lineHeight: 1.4 }}>
        {cert.title}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: 'Inter, sans-serif',
          fontSize: 8.5,
          color: '#6B7280',
          borderTop: `1px solid ${cert.accent}30`,
          paddingTop: 6,
          width: '80%',
          textAlign: 'center',
        }}
      >
        Issued by {cert.provider}
      </div>
    </div>
  )
}

export default function Certificates({ navigate, currentPage }) {
  const [activeCategory, setActiveCategory] = useState('All Category')

  const filtered = activeCategory === 'All Category' ? certificates : certificates.filter((c) => c.category === activeCategory)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Certificate' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Certificate
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              View and download all certificates you've earned from completed courses
            </p>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 100,
                  border: activeCategory === cat ? 'none' : '1.5px solid #E5E7EB',
                  background: activeCategory === cat ? '#111827' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#374151',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Certificate Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map((cert) => (
              <div
                key={cert.id}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  border: '1px solid #F3F4F6',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ padding: 16 }}>
                  <CertificatePreview cert={cert} />
                </div>

                <div style={{ padding: '0 16px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <div style={{ background: '#DCFCE7', borderRadius: 100, padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600, color: '#15803D' }}>Completed</span>
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>• {cert.date} July</span>
                  </div>

                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827', margin: '0 0 6px', lineHeight: 1.4 }}>
                    {cert.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <span style={{ fontSize: 14 }}>{cert.providerIcon}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#6B7280' }}>{cert.provider}</span>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '7px 0',
                        background: '#F3F4F6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: 8,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#E5E7EB' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F3F4F6' }}
                    >
                      Add to LinkedIn
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '7px 0',
                        background: '#111827',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#1F2937' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#111827' }}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#374151' }}>No certificates yet</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9CA3AF', marginTop: 8, marginBottom: 20 }}>
                Complete courses to earn certificates
              </div>
              <button
                onClick={() => navigate('courses')}
                style={{
                  padding: '10px 24px',
                  background: '#2563EB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
