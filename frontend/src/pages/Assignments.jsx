import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'

export default function Assignments({ navigate, currentPage }) {
  const { submissions, addSubmission } = useData()
  const { user } = useAuth()
  const [filter, setFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  // New assignment form state
  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('Figma UI/UX Design')
  const [content, setContent] = useState('')

  const mySubmissions = submissions.filter((s) => s.studentName === user?.name || true)
  const filtered = filter === 'All' ? mySubmissions : mySubmissions.filter((s) => s.status === filter)

  const handleSubmitAssignment = (e) => {
    e.preventDefault()
    if (!title) return
    addSubmission({
      studentName: user?.name || 'John Doe',
      assignmentTitle: title,
      course,
    })
    setTitle('')
    setContent('')
    setShowModal(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Assignments' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
                Assignments
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
                Track your course assignments, submit your work, and view grades & feedback.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '10px 20px',
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}
            >
              + Submit New Assignment
            </button>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {['All', 'Pending Review', 'Graded'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 100,
                  border: filter === f ? 'none' : '1.5px solid #E5E7EB',
                  background: filter === f ? '#111827' : '#fff',
                  color: filter === f ? '#fff' : '#374151',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Assignment Table / List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '20px 24px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  border: '1px solid #F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: item.status === 'Graded' ? '#DCFCE7' : '#DBEAFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                    }}
                  >
                    {item.status === 'Graded' ? '✅' : '📝'}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', margin: '0 0 4px' }}>
                      {item.assignmentTitle}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: '#6B7280' }}>
                      <span>📚 {item.course}</span>
                      <span>• Submitted on {item.submittedAt}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {item.status === 'Graded' ? (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#16A34A' }}>
                        {item.score}
                      </div>
                      <span style={{ fontSize: 11, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                        Graded
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: '#2563EB', background: '#DBEAFE', padding: '4px 10px', borderRadius: 100, fontWeight: 600 }}>
                      Pending Review
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {showModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 300,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: 28,
                  width: '100%',
                  maxWidth: 480,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, margin: 0, color: '#111827' }}>
                    Submit Assignment
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#9CA3AF' }}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmitAssignment} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Assignment Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Figma E-Commerce Prototype"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Select Course</label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                    >
                      <option>Figma UI/UX Design</option>
                      <option>Brand Identity & Visual Experience</option>
                      <option>Low Code Website Development</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Submission Notes / Links</label>
                    <textarea
                      placeholder="Paste your Figma file link or project notes..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      style={{ flex: 1, padding: '10px', background: '#F3F4F6', border: 'none', borderRadius: 10, fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ flex: 1, padding: '10px', background: '#2563EB', border: 'none', borderRadius: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
                    >
                      Submit Assignment
                    </button>
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
