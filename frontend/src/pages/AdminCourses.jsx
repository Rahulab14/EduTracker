import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'

export default function AdminCourses({ navigate, currentPage }) {
  const { courses, addCourse, updateCourse, deleteCourse } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Form State
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('Edutrack Instructor')
  const [category, setCategory] = useState('UI/UX Design')
  const [level, setLevel] = useState('Beginner')
  const [lessons, setLessons] = useState(12)
  const [duration, setDuration] = useState('10hrs')

  const openCreateModal = () => {
    setEditingId(null)
    setTitle('')
    setInstructor('Edutrack Instructor')
    setCategory('UI/UX Design')
    setLevel('Beginner')
    setLessons(12)
    setDuration('10hrs')
    setShowModal(true)
  }

  const openEditModal = (course) => {
    setEditingId(course.id)
    setTitle(course.title)
    setInstructor(course.instructor)
    setCategory(course.category)
    setLevel(course.level)
    setLessons(course.lessons)
    setDuration(course.duration)
    setShowModal(true)
  }

  const handleSaveCourse = (e) => {
    e.preventDefault()
    if (editingId) {
      updateCourse(editingId, { title, instructor, category, level, lessons, duration })
    } else {
      addCourse({ title, instructor, category, level, lessons, duration })
    }
    setShowModal(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Manage Courses' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
                Course Management
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
                Create, edit, or remove organization courses. Changes update live across the student catalog.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              style={{
                padding: '10px 20px',
                background: '#7C3AED',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
              }}
            >
              + Add New Course
            </button>
          </div>

          {/* Courses Table */}
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>Course Name</th>
                  <th style={{ padding: '14px 20px' }}>Category</th>
                  <th style={{ padding: '14px 20px' }}>Level</th>
                  <th style={{ padding: '14px 20px' }}>Lessons</th>
                  <th style={{ padding: '14px 20px' }}>Students</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>By {c.instructor}</div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#374151' }}>{c.category}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, background: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: 4 }}>
                        {c.level}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#374151' }}>{c.lessons} Lessons ({c.duration})</td>
                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#374151' }}>👥 {c.students}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => openEditModal(c)}
                        style={{ padding: '5px 12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer', marginRight: 8 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(c.id)}
                        style={{ padding: '5px 12px', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, margin: 0, color: '#111827' }}>
                    {editingId ? 'Edit Course' : 'Add New Course'}
                  </h2>
                  <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#9CA3AF' }}>✕</button>
                </div>

                <form onSubmit={handleSaveCourse} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Course Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Advanced React Architecture"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Instructor / Provider</label>
                    <input
                      type="text"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}>
                        <option>UI/UX Design</option>
                        <option>Graphics Design</option>
                        <option>Animation</option>
                        <option>Web Development</option>
                        <option>Branding</option>
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Difficulty Level</label>
                      <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Number of Lessons</label>
                      <input type="number" value={lessons} onChange={(e) => setLessons(Number(e.target.value))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Duration</label>
                      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 15hrs" style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#F3F4F6', border: 'none', borderRadius: 10, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" style={{ flex: 1, padding: '10px', background: '#7C3AED', border: 'none', borderRadius: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Save Course</button>
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
