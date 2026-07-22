import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useAuth } from '../context/AuthContext'

export default function Settings({ navigate, currentPage }) {
  const { user, role } = useAuth()
  const [name, setName] = useState(user?.name || 'John Doe')
  const [email, setEmail] = useState(user?.email || 'john@edutrack.com')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Settings' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', maxWidth: 800 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Account Settings
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              Manage your personal profile, notification alerts, and security preferences.
            </p>
          </div>

          {savedSuccess && (
            <div style={{ background: '#DCFCE7', color: '#15803D', padding: '12px 16px', borderRadius: 12, marginBottom: 20, fontWeight: 600, fontSize: 13.5 }}>
              ✓ Settings saved successfully!
            </div>
          )}

          <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 20, borderBottom: '1px solid #F3F4F6' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: role === 'admin' ? 'linear-gradient(135deg, #7C3AED, #DB2777)' : 'linear-gradient(135deg, #2563EB, #7C3AED)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 22,
                  }}
                >
                  {user?.avatar || 'JD'}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '0 0 4px' }}>
                    {name}
                  </h3>
                  <span style={{ fontSize: 12, color: role === 'admin' ? '#7C3AED' : '#2563EB', fontWeight: 600, background: role === 'admin' ? '#F5F3FF' : '#EFF6FF', padding: '2px 8px', borderRadius: 4 }}>
                    {role === 'admin' ? 'Administrator' : 'Student Learner'}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
                <input
                  type="password"
                  value="••••••••••••"
                  readOnly
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', background: '#F9FAFB' }}
                />
              </div>

              <div style={{ paddingTop: 10 }}>
                <button
                  type="submit"
                  style={{ padding: '12px 24px', background: '#111827', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
