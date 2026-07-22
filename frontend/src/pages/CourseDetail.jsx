import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

function DonutChart({ completed, inProgress, incomplete }) {
  const total = completed + inProgress + incomplete
  const size = 120
  const strokeWidth = 18
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r

  const completedDash = (completed / total) * circ
  const inProgressDash = (inProgress / total) * circ
  const completedOffset = 0

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#22C55E" strokeWidth={strokeWidth}
          strokeDasharray={`${completedDash} ${circ - completedDash}`}
          strokeDashoffset={-completedOffset}
          strokeLinecap="butt"
        />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2563EB" strokeWidth={strokeWidth}
          strokeDasharray={`${inProgressDash} ${circ - inProgressDash}`}
          strokeDashoffset={-completedDash}
          strokeLinecap="butt"
        />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth}
          strokeDasharray={`${(incomplete / total) * circ} ${circ - (incomplete / total) * circ}`}
          strokeDashoffset={-(completedDash + inProgressDash)}
          strokeLinecap="butt"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 18,
          color: '#111827',
        }}
      >
        {Math.round((completed / total) * 100)}%
      </div>
    </div>
  )
}

const modules = [
  {
    title: 'Module 1',
    completed: 1,
    lessons: [
      { title: 'Introduction to UI/UX Design', status: 'completed' },
      { title: 'User Research & Design Theme', status: 'in-progress' },
      { title: 'Quiz for this Module', status: 'incomplete' },
    ],
  },
  {
    title: 'Module 2',
    completed: 0,
    lessons: [
      { title: 'Advanced Wireframing', status: 'incomplete' },
      { title: 'UI Design Systems, Components', status: 'incomplete' },
      { title: 'Advanced UX Design Principles', status: 'incomplete' },
      { title: 'Advanced UI Design Patterns', status: 'incomplete' },
    ],
  },
]

const courseInfo = [
  { icon: '📚', label: '8 Module Series', sub: 'Get it start of the subject' },
  { icon: '📊', label: 'Advance Level', sub: 'Recommended experience' },
  { icon: '⏱️', label: '1 Week to complete', sub: 'At 4hrs per week' },
  { icon: '✏️', label: "Quiz's", sub: 'at work module end' },
]

export default function CourseDetail({ navigate, currentPage }) {
  const [expandedModule, setExpandedModule] = useState(0)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav
          navigate={navigate}
          currentPage={currentPage}
          breadcrumb={[
            { label: 'My Courses', page: 'courses' },
            { label: 'Figma Course' },
          ]}
        />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', gap: 24 }}>
          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#111827', margin: '0 0 20px' }}>
              Figma Course
            </h1>

            {/* Video Player Placeholder */}
            <div
              onClick={() => navigate('learning')}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, #1E40AF, #5B21B6)',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#fff', textAlign: 'center', padding: '0 40px' }}>
                  Figma UI/UX Design Advanced Master Class
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#BFDBFE' }}>Bridging Ideas With Design.</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#93C5FD' }}>400+ students</div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  width: 56,
                  height: 56,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '3px 8px', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#fff' }}>
                Preview
              </div>
            </div>

            {/* Modules */}
            {modules.map((mod, mi) => (
              <div
                key={mi}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  marginBottom: 16,
                  overflow: 'hidden',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === mi ? -1 : mi)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#111827' }}>{mod.title}</span>
                    <span
                      style={{
                        background: '#F3F4F6',
                        borderRadius: 100,
                        padding: '2px 8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 11.5,
                        color: '#6B7280',
                      }}
                    >
                      {mod.completed} Completed
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>View all</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transform: expandedModule === mi ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {expandedModule === mi && (
                  <div style={{ padding: '0 20px 16px', borderTop: '1px solid #F3F4F6' }}>
                    {mod.lessons.map((lesson, li) => (
                      <div
                        key={li}
                        onClick={() => navigate('learning')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '12px 0',
                          borderBottom: li < mod.lessons.length - 1 ? '1px solid #F9FAFB' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', width: 16, flexShrink: 0, textAlign: 'center' }}>{li + 1}</span>
                        <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#111827', fontWeight: 500 }}>{lesson.title}</span>
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: lesson.status === 'completed' ? '#22C55E' : lesson.status === 'in-progress' ? '#2563EB' : '#9CA3AF',
                            background: lesson.status === 'completed' ? '#DCFCE7' : lesson.status === 'in-progress' ? '#DBEAFE' : '#F3F4F6',
                            borderRadius: 100,
                            padding: '3px 10px',
                          }}
                        >
                          {lesson.status === 'completed' ? 'Completed' : lesson.status === 'in-progress' ? 'In Progress' : 'Incomplete'}
                        </span>
                        <button
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: 'none',
                            background: lesson.status === 'completed' ? '#22C55E' : '#E5E7EB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          {lesson.status === 'completed' ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#6B7280">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right sidebar */}
          <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Course Info */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
              }}
            >
              {courseInfo.map((info, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: i < courseInfo.length - 1 ? '1px solid #F9FAFB' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: '#F3F4F6',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#111827' }}>{info.label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#9CA3AF', marginTop: 2 }}>{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Task Progress */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
              }}
            >
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 16 }}>Task Progress</div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <DonutChart completed={4} inProgress={3} incomplete={5} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { color: '#22C55E', label: 'Completed', value: '4 Tasks' },
                  { color: '#E5E7EB', label: 'Incomplete', value: '5 Tasks' },
                  { color: '#2563EB', label: 'In Progress', value: '3 Tasks' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#374151', flex: 1 }}>{item.label}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={() => navigate('learning')}
              style={{
                width: '100%',
                padding: '14px',
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: 14,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Continue Learning →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
