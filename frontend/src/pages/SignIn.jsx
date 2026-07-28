import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignIn({ navigate }) {
  const { login, switchRole } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email || (role === 'admin' ? 'admin@edutrack.com' : 'john@edutrack.com'), password, role)
    navigate(role === 'admin' ? 'admin-dashboard' : 'dashboard')
  }

  const handleDemoStudent = () => {
    switchRole('student')
    navigate('dashboard')
  }

  const handleDemoAdmin = () => {
    switchRole('admin')
    navigate('admin-dashboard')
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
          {/* Logo */}
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
            Welcome back to EduTrack
          </h1>
          <p style={{ fontSize: 13.5, color: '#6B7280', margin: '0 0 24px', textAlign: 'center' }}>
            Sign in to access your courses or management dashboard
          </p>

          {/* Quick Demo Sign In Buttons */}
          <div style={{ width: '100%', maxWidth: 360, marginBottom: 20 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#6B7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              ⚡ 1-Click Demo Login
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={handleDemoStudent}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: '#EFF6FF',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: 10,
                  color: '#2563EB',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                👨‍🎓 Student Demo
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: '#F5F3FF',
                  border: '1.5px solid #DDD6FE',
                  borderRadius: 10,
                  color: '#7C3AED',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                🛠️ Admin Demo
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 360, margin: '10px 0 20px' }}>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
            <span style={{ padding: '0 12px', fontSize: 12, color: '#9CA3AF' }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Role Select */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3 }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  border: 'none',
                  borderRadius: 8,
                  background: role === 'student' ? '#fff' : 'transparent',
                  color: role === 'student' ? '#111827' : '#6B7280',
                  fontWeight: 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  boxShadow: role === 'student' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Student Account
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  border: 'none',
                  borderRadius: 8,
                  background: role === 'admin' ? '#fff' : 'transparent',
                  color: role === 'admin' ? '#111827' : '#6B7280',
                  fontWeight: 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  boxShadow: role === 'admin' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                Admin Account
              </button>
            </div>

            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'admin' ? 'admin@edutrack.com' : 'john@edutrack.com'}
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

            {/* Password Input */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (any password works)"
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

            {/* Continue Button */}
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
              Sign In as {role === 'admin' ? 'Admin' : 'Student'}
            </button>
          </form>

          <div style={{ fontSize: 12.5, color: '#9CA3AF', textAlign: 'center', marginTop: 20 }}>
            Don't have an account?{' '}
            <span
              style={{ color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('signup')}
            >
              Create Account
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
          <div style={{ position: 'absolute', bottom: 60, left: 40, width: 70, height: 70, background: 'rgba(255,255,255,0.35)', borderRadius: 20, transform: 'rotate(15deg)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🎓</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#1E3A5F', marginBottom: 8 }}>
              EduTrack LMS
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#6B7280', maxWidth: 220, margin: '0 auto' }}>
              Learn from top instructors or manage your educational organization.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
