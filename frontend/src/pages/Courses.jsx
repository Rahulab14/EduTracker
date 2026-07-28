import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'

const categories = ['All Category', 'UI/UX Design', 'Graphics Design', 'Animation', 'Web Development', 'Branding']

function StarRating({ rating = 4.8 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? '#F59E0B' : '#E5E7EB'} stroke={i <= Math.floor(rating) ? '#F59E0B' : '#E5E7EB'} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6B7280', marginLeft: 2 }}>{rating}</span>
    </div>
  )
}

export default function Courses({ navigate, currentPage }) {
  const { courses } = useData()
  const [activeCategory, setActiveCategory] = useState('All Category')
  const [wishlist, setWishlist] = useState([])

  const filtered = activeCategory === 'All Category' ? courses : courses.filter((c) => c.category === activeCategory)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Courses' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>Courses</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>Explore world-class courses and advance your skills.</p>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 100,
                  border: activeCategory === cat ? 'none' : '1.5px solid #E5E7EB',
                  background: activeCategory === cat ? '#111827' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#374151',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (activeCategory !== cat) e.currentTarget.style.borderColor = '#9CA3AF' }}
                onMouseLeave={(e) => { if (activeCategory !== cat) e.currentTarget.style.borderColor = '#E5E7EB' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map((course) => (
              <div
                key={course.id || course.title}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  border: '1px solid #F3F4F6',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
                onClick={() => navigate('course-detail')}
              >
                {/* Thumbnail */}
                <div style={{ height: 148, background: course.bg || 'linear-gradient(135deg, #DBEAFE, #EFF6FF)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 48 }}>{course.instructorIcon || '🎓'}</div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: course.accent || '#2563EB',
                    }}
                  >
                    {course.level}
                  </div>
                  <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10.5,
                        color: '#374151',
                      }}
                    >
                      📖 {course.lessons}
                    </div>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10.5,
                        color: '#374151',
                      }}
                    >
                      ⏱ {course.duration}
                    </div>
                  </div>
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setWishlist((prev) => prev.includes(course.title) ? prev.filter((t) => t !== course.title) : [...prev, course.title])
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: 8,
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: wishlist.includes(course.title) ? '#EF4444' : '#9CA3AF',
                      fontSize: 14,
                    }}
                  >
                    {wishlist.includes(course.title) ? '❤️' : '🤍'}
                  </button>
                </div>

                {/* Card body */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: 13.5,
                      color: '#111827',
                      margin: '0 0 8px',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {course.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        background: `${course.accent || '#2563EB'}20`,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                      }}
                    >
                      {course.instructorIcon || '🎓'}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280' }}>{course.instructor}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StarRating />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF' }}>👥 {course.students}+</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate('course-detail') }}
                      style={{
                        background: course.accent || '#2563EB',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '5px 12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 11.5,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#374151' }}>No courses found</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, marginTop: 8 }}>Try a different category</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
