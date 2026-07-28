import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import { useData } from '../context/DataContext'

export default function AdminUsers({ navigate, currentPage }) {
  const { users, updateUserRole, toggleUserStatus } = useData()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Student Directory' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Student & User Management
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              Manage student accounts, assign admin permissions, and toggle access status.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>User Details</th>
                  <th style={{ padding: '14px 20px' }}>Current Role</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px' }}>Enrolled Courses</th>
                  <th style={{ padding: '14px 20px' }}>Joined Date</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: u.role === 'admin' ? '#7C3AED' : '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: '#6B7280' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <select
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #E5E7EB', fontSize: 12.5, fontWeight: 600, color: u.role === 'admin' ? '#7C3AED' : '#2563EB', background: u.role === 'admin' ? '#F5F3FF' : '#EFF6FF' }}
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: u.status === 'Active' ? '#16A34A' : '#EF4444', background: u.status === 'Active' ? '#DCFCE7' : '#FEF2F2', padding: '3px 10px', borderRadius: 100 }}>
                        {u.status}
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#374151' }}>
                      {u.enrolled} Courses
                    </td>

                    <td style={{ padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>
                      {u.joined}
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        style={{ padding: '6px 12px', background: u.status === 'Active' ? '#FEF2F2' : '#DCFCE7', color: u.status === 'Active' ? '#EF4444' : '#16A34A', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
