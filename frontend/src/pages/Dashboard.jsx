import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

function ProgressRing({ value, color, size = 56, strokeWidth = 5 }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

const barData = [
  { label: 'Jul 1', google: 60, lowCode: 40, graphics: 30 },
  { label: 'Jul 2', google: 75, lowCode: 55, graphics: 45 },
  { label: 'Jul 3', google: 50, lowCode: 60, graphics: 55 },
  { label: 'Jul 4', google: 80, lowCode: 45, graphics: 40 },
  { label: 'Jul 5', google: 65, lowCode: 70, graphics: 60 },
  { label: 'Jul 6', google: 90, lowCode: 50, graphics: 35 },
]

const performanceBars = [70, 85, 60, 95, 80, 65, 88, 72]

const myCourses = [
  { title: 'Google UI/UX Design Level Up', progress: 64, total: 20, color: '#2563EB', icon: '🎨' },
  { title: 'Amazon Brand Identity and Visual', progress: 2, total: 34, color: '#F59E0B', icon: '📦' },
  { title: 'Figma UI/UX Design Advanced', progress: 10, total: 14, color: '#8B5CF6', icon: '✏️' },
]

const upcomingClasses = [
  { title: 'UI/UX Design Session', time: '2:00 PM Today', dot: '#2563EB' },
  { title: 'Brand Strategy Workshop', time: '10:00 AM Tomorrow', dot: '#8B5CF6' },
  { title: 'Figma Advanced Tips', time: 'Wed, Jul 23', dot: '#22C55E' },
]

export default function Dashboard({ navigate, currentPage }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Dashboard' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 28px 28px', display: 'flex', gap: 24 }}>
          {/* Center column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Welcome */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
                Dashboard
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
                Let's start your New Course
              </p>
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              {/* Performance Chart */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '20px 20px 16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  border: '1px solid #F3F4F6',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>Performance</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#9CA3AF', marginTop: 2 }}>2 Courses Completed</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                  {performanceBars.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${h}%`,
                          background: i === 4 ? '#111827' : '#E5E7EB',
                          borderRadius: '4px 4px 0 0',
                          transition: 'background 0.2s',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Spent Chart */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '20px 20px 16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  border: '1px solid #F3F4F6',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>Time Spent on Learning</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#9CA3AF', marginTop: 2 }}>5 Courses Completed</div>
                  </div>
                </div>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  {[
                    { color: '#2563EB', label: 'Google UI/UX' },
                    { color: '#22C55E', label: 'Low Code Web' },
                    { color: '#8B5CF6', label: 'Graphics Body' },
                  ].map((l) => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#6B7280' }}>{l.label}</span>
                    </div>
                  ))}
                </div>
                {/* Multi-bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 70 }}>
                  {barData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                      {[d.google, d.lowCode, d.graphics].map((h, j) => (
                        <div
                          key={j}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            background: ['#2563EB', '#22C55E', '#8B5CF6'][j],
                            borderRadius: '2px 2px 0 0',
                            opacity: 0.85,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  {barData.map((d) => (
                    <div key={d.label} style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#9CA3AF', textAlign: 'center' }}>{d.label}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Your Courses */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px 22px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827' }}>Your Courses</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', marginLeft: 8 }}>3 Results</span>
                </div>
                <button
                  onClick={() => navigate('courses')}
                  style={{ background: 'none', border: 'none', color: '#2563EB', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  View all
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {myCourses.map((c) => (
                  <div
                    key={c.title}
                    onClick={() => navigate('course-detail')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: '#F9FAFB',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F3F4F6' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#F9FAFB' }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `${c.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827', marginBottom: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 4, background: '#E5E7EB', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(c.progress / c.total) * 100}%`, background: c.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', flexShrink: 0 }}>{c.progress}/{c.total} Lessons</span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: '#fff',
                        border: '1px solid #E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px 22px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
              }}
            >
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 16 }}>
                Upcoming Classes
              </div>
              {upcomingClasses.map((c) => (
                <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827' }}>{c.title}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{c.time}</div>
                  </div>
                  <button style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '5px 10px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right profile panel */}
          <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Profile Card */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '24px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
                textAlign: 'center',
              }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #DBEAFE, #EDE9FE)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 24,
                    color: '#2563EB',
                    border: '3px solid #fff',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
                  }}
                >
                  JD
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    background: '#22C55E',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                  }}
                />
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#111827' }}>John Doe</div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#F3F4F6',
                  borderRadius: 100,
                  padding: '3px 10px',
                  marginTop: 6,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#6B7280', fontWeight: 500 }}>Pro Account</span>
              </div>

              {/* Progress rings row */}
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                {[
                  { value: 42, color: '#2563EB', label: 'Low Code\nUI/UX', sub: 'Advanced' },
                  { value: 65, color: '#8B5CF6', label: 'Google\nUI/UX', sub: 'Advanced' },
                  { value: 58, color: '#22C55E', label: 'Student\nRanking', sub: 'For Vision' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <ProgressRing value={item.value} color={item.color} size={52} strokeWidth={5} />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 700,
                          fontSize: 10,
                          color: item.color,
                        }}
                      >
                        {item.value}%
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: '#6B7280', marginTop: 4, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Activity */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>Daily Activity</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>Today, July 5</div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {Array.from({ length: 35 }, (_, i) => {
                  const intensity = (i * 7) % 10 / 10
                  const color = intensity > 0.7 ? '#111827' : intensity > 0.4 ? '#6B7280' : intensity > 0.2 ? '#D1D5DB' : '#F3F4F6'
                  return (
                    <div
                      key={i}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: color,
                        cursor: 'pointer',
                        transition: 'transform 0.1s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Study Hours', value: '24h', color: '#DBEAFE', accent: '#2563EB', icon: '⏱️' },
                { label: 'Completed', value: '12', color: '#DCFCE7', accent: '#22C55E', icon: '✅' },
                { label: 'Certificates', value: '3', color: '#EDE9FE', accent: '#8B5CF6', icon: '🏆' },
                { label: 'Streak Days', value: '7', color: '#FEF3C7', accent: '#F59E0B', icon: '🔥' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '16px 14px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid #F3F4F6',
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: s.accent }}>{s.value}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#6B7280', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
