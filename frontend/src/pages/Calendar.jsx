import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const EVENTS = [
  { day: 22, title: 'UI/UX Design Live Workshop', time: '10:00 AM', type: 'Lecture', color: '#2563EB', bg: '#DBEAFE' },
  { day: 23, title: 'Figma Components Deadline', time: '11:59 PM', type: 'Assignment', color: '#EA580C', bg: '#FFEDD5' },
  { day: 25, title: 'Brand Identity Quiz', time: '2:00 PM', type: 'Quiz', color: '#7C3AED', bg: '#EDE9FE' },
  { day: 28, title: '3D Animation Q&A Session', time: '4:00 PM', type: 'Lecture', color: '#059669', bg: '#D1FAE5' },
]

export default function Calendar({ navigate, currentPage }) {
  const [selectedDay, setSelectedDay] = useState(22)

  const dayEvents = EVENTS.filter((e) => e.day === selectedDay)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Calendar' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', gap: 24 }}>
          {/* Main Calendar View */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
                Schedule & Calendar
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
                July 2026 • Never miss a live class or project deadline.
              </p>
            </div>

            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
              {/* Day Labels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12, textAlign: 'center', fontWeight: 600, fontSize: 12.5, color: '#9CA3AF' }}>
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>

              {/* Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                {Array.from({ length: 31 }, (_, i) => {
                  const dayNum = i + 1
                  const hasEvent = EVENTS.some((e) => e.day === dayNum)
                  const isSelected = selectedDay === dayNum

                  return (
                    <div
                      key={dayNum}
                      onClick={() => setSelectedDay(dayNum)}
                      style={{
                        height: 72,
                        borderRadius: 14,
                        border: isSelected ? '2px solid #2563EB' : '1px solid #F3F4F6',
                        background: isSelected ? '#EFF6FF' : '#fff',
                        padding: 8,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: 13, color: isSelected ? '#2563EB' : '#111827' }}>
                        {dayNum}
                      </span>
                      {hasEvent && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          {EVENTS.filter((e) => e.day === dayNum).map((ev, eIdx) => (
                            <div key={eIdx} style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color }} />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Selected Day Events */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '0 0 16px' }}>
                Events for July {selectedDay}
              </h3>

              {dayEvents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {dayEvents.map((ev, idx) => (
                    <div key={idx} style={{ background: ev.bg, borderRadius: 14, padding: 14, borderLeft: `4px solid ${ev.color}` }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: ev.color, textTransform: 'uppercase' }}>{ev.type}</span>
                      <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827', margin: '4px 0' }}>{ev.title}</h4>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>🕒 {ev.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#9CA3AF' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
                  <p style={{ fontSize: 13, margin: 0 }}>No events scheduled for this day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
