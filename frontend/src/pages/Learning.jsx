import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const tabs = ['Overview', 'Q&A', 'Take Notes']

const lessonContent = {
  Overview: (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7, color: '#374151', fontSize: 14 }}>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', marginTop: 0 }}>Introduction</h3>
      <p>
        UI (User Interface) and UX (User Experience) design work together to create seamless digital products. UI focuses on
        functionality and aesthetics, while UX focuses on user journeys and problem-solving through research.
      </p>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827' }}>1. What is UX design?</h3>
      <p>
        UX design is all about championing the user. Consider discussing how empathy and user-centred design create value.
        Also talk about the ways in which you keep the user at the centre of the design process: user research, personas and
        user journey.
      </p>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827' }}>2. What is UI design?</h3>
      <p>
        UI design focuses on the visual and interactive elements of a product interface. This includes typography, color
        schemes, buttons, icons, and other visual elements that users interact with.
      </p>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827' }}>3. Key Principles</h3>
      <ul style={{ paddingLeft: 20 }}>
        <li style={{ marginBottom: 8 }}>User-Centered Design: Always design with the user in mind</li>
        <li style={{ marginBottom: 8 }}>Consistency: Maintain visual and functional consistency</li>
        <li style={{ marginBottom: 8 }}>Accessibility: Design for all users regardless of ability</li>
        <li style={{ marginBottom: 8 }}>Hierarchy: Guide users through content with visual priority</li>
      </ul>
    </div>
  ),
  'Q&A': (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#2563EB', fontSize: 14, flexShrink: 0 }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827' }}>Sarah M.</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#374151', marginTop: 4, lineHeight: 1.6 }}>
              What's the best way to transition from graphic design to UX design? I have 3 years of graphic design experience.
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>2 hours ago · 4 replies</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginLeft: 48, background: '#F9FAFB', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#22C55E', fontSize: 12, flexShrink: 0 }}>I</div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, color: '#111827' }}>Instructor <span style={{ background: '#DBEAFE', color: '#2563EB', borderRadius: 4, padding: '1px 6px', fontSize: 10 }}>Instructor</span></div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#374151', marginTop: 4, lineHeight: 1.6 }}>
              Your graphic design background is a huge asset! Focus on learning user research methods and prototyping tools like Figma.
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <input placeholder="Ask a question..." style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontSize: 13.5, outline: 'none' }} />
        <button style={{ padding: '10px 16px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}>Ask</button>
      </div>
    </div>
  ),
  'Take Notes': (
    <div>
      <textarea
        placeholder="Take notes for this lesson... Your notes are saved automatically."
        style={{
          width: '100%',
          minHeight: 200,
          padding: '14px 16px',
          border: '1.5px solid #E5E7EB',
          borderRadius: 14,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          lineHeight: 1.7,
          color: '#374151',
          outline: 'none',
          resize: 'vertical',
        }}
        defaultValue={`Module 1 - Introduction to UI/UX Design

Key takeaways:
• UI = Visual & interactive elements (buttons, colors, typography)
• UX = User journey & experience (research, wireframes, testing)
• Always start with user research before designing
• Consistency is key in design systems

Questions to follow up:
- How to conduct proper user interviews?
- Best tools for wireframing?`}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
        <button style={{ padding: '8px 16px', background: '#22C55E', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          Save Notes
        </button>
      </div>
    </div>
  ),
}

const moduleList = [
  {
    title: 'Module 1',
    lessons: [
      { title: 'Introduction to UI/UX ...', active: true, completed: false },
      { title: 'User Research & Desi...', active: false, completed: false },
      { title: 'Quiz for this Module', active: false, completed: false },
    ],
  },
  {
    title: 'Module 2',
    lessons: [
      { title: 'Advanced Wireframing', active: false, completed: false },
      { title: 'UI Design Systems, C...', active: false, completed: false },
      { title: 'Advanced UX Design: ...', active: false, completed: false },
      { title: 'Advanced UI Design: ...', active: false, completed: false },
    ],
  },
]

export default function Learning({ navigate, currentPage }) {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav
          navigate={navigate}
          currentPage={currentPage}
          breadcrumb={[
            { label: 'Figma UI/UX', page: 'course-detail' },
            { label: 'Module 1', page: 'course-detail' },
            { label: 'Introduction to UI/UX Design' },
          ]}
        />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', gap: 24 }}>
          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Video Player */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: '#1F2937',
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1a2940 0%, #2d3748 60%, #1a2330 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 64 }}>👨‍💻</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9CA3AF' }}>Video Lesson</div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  width: 60,
                  height: 60,
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid rgba(255,255,255,0.25)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: '20px 16px 12px',
                }}
              >
                <div style={{ height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 10, cursor: 'pointer' }}>
                  <div style={{ height: '100%', width: '28%', background: '#fff', borderRadius: 2, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: -5, top: -4, width: 11, height: 11, background: '#fff', borderRadius: '50%' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </button>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#fff' }}>00:44 / 35:44</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['CC', '1x', '⛶'].map((ctrl) => (
                      <button key={ctrl} style={{ border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 11, padding: '2px 6px', background: 'rgba(255,255,255,0.15)', borderRadius: 4 }}>
                        {ctrl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson info */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#111827', margin: 0 }}>
                  Introduction to UI/UX Design
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 20, height: 20, background: '#E5E7EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🌐</div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', fontWeight: 500 }}>Google</span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #E5E7EB', marginBottom: 20 }}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 16px',
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid #111827' : '2px solid transparent',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: activeTab === tab ? 600 : 400,
                      fontSize: 14,
                      color: activeTab === tab ? '#111827' : '#6B7280',
                      marginBottom: -1,
                      transition: 'color 0.15s',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div>{lessonContent[activeTab]}</div>
            </div>
          </div>

          {/* Right sidebar - Your Learning */}
          <div style={{ width: 260, flexShrink: 0 }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #F3F4F6',
                position: 'sticky',
                top: 20,
              }}
            >
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 16 }}>
                Your Learning
              </div>

              {moduleList.map((mod, mi) => (
                <div key={mi} style={{ marginBottom: 18 }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 10 }}>
                    {mod.title}
                  </div>
                  {mod.lessons.map((lesson, li) => (
                    <div
                      key={li}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '6px 0',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: lesson.active ? '#2563EB' : '#D1D5DB',
                          flexShrink: 0,
                          boxShadow: lesson.active ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 13,
                          color: lesson.active ? '#111827' : '#9CA3AF',
                          fontWeight: lesson.active ? 600 : 400,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {lesson.title}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#F3F4F6',
                    border: 'none',
                    borderRadius: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 12.5,
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  ← Previous
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#111827',
                    border: 'none',
                    borderRadius: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 12.5,
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
