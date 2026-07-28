import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const FAQS = [
  { q: 'How do I download my course completion certificates?', a: 'Navigate to the Certificates section in the sidebar. Click "View Certificate" or "Download" on any completed course.' },
  { q: 'How do assignments and quizzes work?', a: 'Quizzes provide instant automatic scoring, while assignments are reviewed and graded by course instructors within 48 hours.' },
  { q: 'Can I switch between Student and Admin mode?', a: 'Yes! Click on your profile avatar in the top navigation bar or the role pill button to instantly toggle demo roles.' },
  { q: 'How do I reset my password?', a: 'Go to Settings -> Security to change your password or click "Forgot Password" on the login screen.' },
]

export default function HelpCenter({ navigate, currentPage }) {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Help Center' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', maxWidth: 860 }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 28, color: '#111827', margin: '0 0 8px' }}>
              How can we help you?
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#6B7280', margin: 0 }}>
              Search our knowledge base or get in touch with our support team.
            </p>
          </div>

          {/* Category Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { icon: '📚', title: 'Getting Started', desc: 'Learn the basics of EduTrack' },
              { icon: '🏆', title: 'Certificates & XP', desc: 'Earning and verifying credentials' },
              { icon: '💳', title: 'Billing & Account', desc: 'Manage subscriptions & profile' },
            ].map((c) => (
              <div key={c.title} style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#111827', margin: '0 0 4px' }}>{c.title}</h3>
                <p style={{ fontSize: 12.5, color: '#6B7280', margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQs Accordion */}
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: '#111827', marginBottom: 16 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 14, border: '1px solid #F3F4F6', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{ width: '100%', padding: '16px 20px', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#111827', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>{faq.q}</span>
                  <span>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 20px 16px', fontSize: 13.5, color: '#4B5563', lineHeight: 1.6, borderTop: '1px solid #F9FAFB' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
