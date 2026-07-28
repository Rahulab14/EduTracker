import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'

export default function AdminSubmissions({ navigate, currentPage }) {
  const { submissions, gradeSubmission } = useData()
  const [selectedSub, setSelectedSub] = useState(null)
  const [score, setScore] = useState('90/100')
  const [feedback, setFeedback] = useState('')

  const handleGrade = (e) => {
    e.preventDefault()
    if (!selectedSub) return
    gradeSubmission(selectedSub.id, score, feedback)
    setSelectedSub(null)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Grade Submissions' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Assignment Submissions & Grading
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              Review student homework, assign grades, and write feedback.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>Student</th>
                  <th style={{ padding: '14px 20px' }}>Assignment Title</th>
                  <th style={{ padding: '14px 20px' }}>Course</th>
                  <th style={{ padding: '14px 20px' }}>Submitted Date</th>
                  <th style={{ padding: '14px 20px' }}>Status & Score</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: '#111827' }}>{s.studentName}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13.5, color: '#374151', fontWeight: 500 }}>{s.assignmentTitle}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>{s.course}</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>{s.submittedAt}</td>
                    <td style={{ padding: '16px 20px' }}>
                      {s.status === 'Graded' ? (
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: 4 }}>
                            Graded ({s.score})
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '2px 8px', borderRadius: 4 }}>
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => { setSelectedSub(s); setScore(s.score !== '-' ? s.score : '95/100'); setFeedback(s.feedback || ''); }}
                        style={{ padding: '6px 14px', background: s.status === 'Graded' ? '#F3F4F6' : '#7C3AED', color: s.status === 'Graded' ? '#374151' : '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                      >
                        {s.status === 'Graded' ? 'Edit Grade' : 'Grade Assignment'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {selectedSub && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, margin: 0, color: '#111827' }}>
                    Grade Assignment
                  </h2>
                  <button onClick={() => setSelectedSub(null)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#9CA3AF' }}>✕</button>
                </div>

                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 12, marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{selectedSub.assignmentTitle}</div>
                  <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 2 }}>Student: {selectedSub.studentName} ({selectedSub.course})</div>
                </div>

                <form onSubmit={handleGrade} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Score / Grade</label>
                    <input type="text" value={score} onChange={(e) => setScore(e.target.value)} required placeholder="e.g. 95/100 or A+" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Instructor Feedback</label>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Write feedback for the student..." rows={3} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none', resize: 'vertical' }} />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => setSelectedSub(null)} style={{ flex: 1, padding: '10px', background: '#F3F4F6', border: 'none', borderRadius: 10, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" style={{ flex: 1, padding: '10px', background: '#7C3AED', border: 'none', borderRadius: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Save Grade</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
