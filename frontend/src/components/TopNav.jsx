import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function TopNav({ navigate, breadcrumb }) {
  const { user, role, switchRole, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleToggle = () => {
    const nextRole = role === 'admin' ? 'student' : 'admin'
    switchRole(nextRole)
    setShowDropdown(false)
    navigate(nextRole === 'admin' ? 'admin-dashboard' : 'dashboard')
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('landing')
  }

  return (
    <div
      style={{
        height: 56,
        background: '#fff',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: '#6B7280' }}>
        {breadcrumb ? (
          breadcrumb.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              <span
                onClick={() => crumb.page && navigate(crumb.page)}
                style={{
                  cursor: crumb.page ? 'pointer' : 'default',
                  color: i === breadcrumb.length - 1 ? '#111827' : '#6B7280',
                  fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => { if (crumb.page) e.currentTarget.style.color = '#2563EB' }}
                onMouseLeave={(e) => { if (crumb.page) e.currentTarget.style.color = i === breadcrumb.length - 1 ? '#111827' : '#6B7280' }}
              >
                {crumb.label}
              </span>
            </span>
          ))
        ) : null}
      </div>

      {/* Right icons & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: 10,
            padding: '6px 12px',
            width: 200,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: '#374151',
              width: '100%',
            }}
          />
        </div>

        {/* Role Switcher Pill */}
        <button
          onClick={handleRoleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            background: role === 'admin' ? '#F5F3FF' : '#EFF6FF',
            border: role === 'admin' ? '1px solid #DDD6FE' : '1px solid #BFDBFE',
            borderRadius: 100,
            color: role === 'admin' ? '#7C3AED' : '#2563EB',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          title="Click to toggle between Student and Admin mode"
        >
          <span>{role === 'admin' ? '🛠️ Admin Mode' : '👨‍🎓 Student Mode'}</span>
          <span style={{ fontSize: 10, opacity: 0.7 }}>⇄</span>
        </button>

        {/* Notification bell */}
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '1px solid #E5E7EB',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              background: '#EF4444',
              borderRadius: '50%',
              border: '1.5px solid #fff',
            }}
          />
        </button>

        {/* User Avatar with Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: role === 'admin' ? 'linear-gradient(135deg, #7C3AED, #DB2777)' : 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {user?.avatar || 'JD'}
          </div>

          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: 46,
                right: 0,
                width: 220,
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                border: '1px solid #E5E7EB',
                padding: '8px 0',
                zIndex: 200,
              }}
            >
              <div style={{ padding: '8px 16px 10px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827' }}>
                  {user?.name || 'John Doe'}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#6B7280' }}>
                  {user?.email || 'john@edutrack.com'}
                </div>
              </div>

              <div style={{ padding: '4px 0' }}>
                <button
                  onClick={() => { setShowDropdown(false); navigate('settings') }}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F9FAFB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                >
                  ⚙️ Account Settings
                </button>

                <button
                  onClick={handleRoleToggle}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: role === 'admin' ? '#2563EB' : '#7C3AED',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F9FAFB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                >
                  {role === 'admin' ? '👨‍🎓 Switch to Student Mode' : '🛠️ Switch to Admin Mode'}
                </button>
              </div>

              <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 4 }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: '#EF4444',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
