import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignUp({ navigate }) {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(name, email, role)
    navigate(role === 'admin' ? 'admin-dashboard' : 'dashboard')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 960,
          background: '#fff',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        }}
      >
        {/* Left: Form */}
        <div style={{ flex: 1, padding: '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            onClick={() => navigate('landing')}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              cursor: 'pointer',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 6px', textAlign: 'center' }}>
            Create your EduTrack Account
          </h1>
          <p style={{ fontSize: 13.5, color: '#6B7280', margin: '0 0 24px', textAlign: 'center' }}>
            Join thousands of students and instructors today
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Role selection */}
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                onClick={() => setRole('student')}
                style={{
                  flex: 1,
                  padding: '12px 10px',
                  borderRadius: 12,
                  border: role === 'student' ? '2px solid #2563EB' : '1.5px solid #E5E7EB',
                  background: role === 'student' ? '#EFF6FF' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20 }}>👨‍🎓</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12.5, color: role === 'student' ? '#2563EB' : '#374151' }}>Student</div>
              </div>
              <div
                onClick={() => setRole('admin')}
                style={{
                  flex: 1,
                  padding: '12px 10px',
                  borderRadius: 12,
                  border: role === 'admin' ? '2px solid #7C3AED' : '1.5px solid #E5E7EB',
                  background: role === 'admin' ? '#F5F3FF' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20 }}>🛠️</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12.5, color: role === 'admin' ? '#7C3AED' : '#374151' }}>Admin / Instructor</div>
              </div>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #E5E7EB',
                borderRadius: 10,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                color: '#111827',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2563EB' }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #E5E7EB',
                borderRadius: 10,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                color: '#111827',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2563EB' }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1.5px solid #E5E7EB',
                borderRadius: 10,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                color: '#111827',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2563EB' }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 20px',
                background: '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 14.5,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1F2937' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#111827' }}
            >
              Create Account
            </button>
          </form>

          <div style={{ fontSize: 12.5, color: '#9CA3AF', textAlign: 'center', marginTop: 20 }}>
            Already have an account?{' '}
            <span
              style={{ color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('signin')}
            >
              Sign In
            </span>
          </div>
        </div>

        {/* Right: Illustration */}
        <div
          style={{
            flex: '0 0 380px',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #EDE9FE 60%, #FCE7F3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 40, right: 40, width: 100, height: 100, background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: 80, left: 40, width: 70, height: 70, background: 'rgba(255,255,255,0.35)', borderRadius: 20, transform: 'rotate(15deg)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🚀</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#1E3A5F', marginBottom: 8 }}>
              Start Learning Today
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#6B7280', maxWidth: 220, margin: '0 auto' }}>
              Join 50,000+ professionals advancing their careers.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
