import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'

export default function AdminDashboard({ navigate, currentPage }) {
  const { courses, users, submissions } = useData()

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'Pending Review').length
  const totalStudentsCount = users.filter((u) => u.role === 'student').length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Admin Overview' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {/* Header Banner */}
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
                Admin Control Panel
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
                Manage organization courses, review student submissions, and analyze system metrics.
              </p>
            </div>

            <button
              onClick={() => navigate('admin-courses')}
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
              + Create New Course
            </button>
          </div>

          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
            {[
              { label: 'Total Enrolled Students', value: totalStudentsCount, change: '+12% this month', icon: '👥', color: '#2563EB', bg: '#EFF6FF' },
              { label: 'Active Courses', value: courses.length, change: `${courses.length} Published`, icon: '📚', color: '#7C3AED', bg: '#F5F3FF' },
              { label: 'Pending Submissions', value: pendingSubmissionsCount, change: 'Needs Grading', icon: '📝', color: '#EA580C', bg: '#FFF7ED' },
              { label: 'Platform Revenue', value: '$48,250', change: '+18% vs last month', icon: '💰', color: '#16A34A', bg: '#DCFCE7' },
            ].map((m, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 20, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {m.icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: m.color, background: m.bg, padding: '2px 8px', borderRadius: 4 }}>
                    {m.change}
                  </span>
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 26, color: '#111827', margin: '0 0 2px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 12.5, color: '#6B7280' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Action Hub & Quick Tables */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
            {/* Recent Submissions Needing Review */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: 0 }}>
                  Recent Student Submissions
                </h3>
                <button
                  onClick={() => navigate('admin-submissions')}
                  style={{ background: 'none', border: 'none', color: '#7C3AED', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                >
                  View All ({submissions.length}) →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {submissions.slice(0, 3).map((sub) => (
                  <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', borderRadius: 14 }}>
                    <div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>
                        {sub.assignmentTitle}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        By <strong>{sub.studentName}</strong> • {sub.course}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('admin-submissions')}
                      style={{
                        padding: '6px 14px',
                        background: sub.status === 'Graded' ? '#F3F4F6' : '#7C3AED',
                        color: sub.status === 'Graded' ? '#374151' : '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {sub.status === 'Graded' ? 'Graded ✓' : 'Grade Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '0 0 16px' }}>
                Management Shortcuts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => navigate('admin-courses')}
                  style={{ width: '100%', padding: '12px 16px', background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE', borderRadius: 12, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span>📚</span> Manage & Publish Courses
                </button>
                <button
                  onClick={() => navigate('admin-users')}
                  style={{ width: '100%', padding: '12px 16px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: 12, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span>👥</span> Student Directory & Roles
                </button>
                <button
                  onClick={() => navigate('admin-submissions')}
                  style={{ width: '100%', padding: '12px 16px', background: '#FFF7ED', color: '#EA580C', border: '1px solid #FFEDD5', borderRadius: 12, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span>📝</span> Review & Grade Homework
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
