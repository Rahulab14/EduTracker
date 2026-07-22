import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const BADGES = [
  { icon: '🔥', title: '7-Day Streak', desc: 'Logged in and studied 7 days in a row', status: 'Unlocked', date: 'Jul 20' },
  { icon: '🎨', title: 'UI Master', desc: 'Completed Figma Advanced Course', status: 'Unlocked', date: 'Jul 15' },
  { icon: '⚡', title: 'Fast Learner', desc: 'Completed 5 lessons in a single day', status: 'Unlocked', date: 'Jul 10' },
  { icon: '🏆', title: 'Top 5% Student', desc: 'Achieved 95%+ in course quizzes', status: 'Unlocked', date: 'Jul 05' },
  { icon: '🤝', title: 'Community Helper', desc: 'Answered 10 peer Q&A questions', status: 'Locked', date: 'In Progress' },
  { icon: '🎓', title: 'Polymath', desc: 'Earn 5 Verified Certificates', status: 'Locked', date: '3/5 Done' },
]

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Chen', points: '2,840 XP', avatar: 'SC', badge: '🥇' },
  { rank: 2, name: 'John Doe (You)', points: '2,450 XP', avatar: 'JD', badge: '🥈' },
  { rank: 3, name: 'Priya Sharma', points: '2,120 XP', avatar: 'PS', badge: '🥉' },
  { rank: 4, name: 'James Okafor', points: '1,980 XP', avatar: 'JO', badge: '4' },
  { rank: 5, name: 'Alex Rivera', points: '1,750 XP', avatar: 'AR', badge: '5' },
]

export default function Achievements({ navigate, currentPage }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Achievements' }]} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#111827', margin: '0 0 4px' }}>
              Achievements & Leaderboard
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: 0 }}>
              Track your badges, study streaks, level progress, and global student ranking.
            </p>
          </div>

          {/* Level Progress Banner */}
          <div style={{ background: 'linear-gradient(135deg, #1E40AF, #7C3AED)', borderRadius: 20, padding: 24, color: '#fff', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 100, letterSpacing: '0.05em' }}>
                LEVEL 8 LEARNER
              </span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, margin: '8px 0 4px' }}>2,450 Total XP Earned</h2>
              <p style={{ fontSize: 13, color: '#BFDBFE', margin: 0 }}>550 XP needed to reach Level 9 Master</p>
            </div>
            <div style={{ width: 140 }}>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', background: '#38BDF8' }} />
              </div>
              <div style={{ fontSize: 11, textAlign: 'right', marginTop: 4, color: '#93C5FD' }}>80% Complete</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
            {/* Badges Grid */}
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: '#111827', marginBottom: 16 }}>
                Badges & Trophies
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {BADGES.map((b) => (
                  <div
                    key={b.title}
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      border: '1px solid #F3F4F6',
                      opacity: b.status === 'Locked' ? 0.65 : 1,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                    }}
                  >
                    <div style={{ fontSize: 32, background: b.status === 'Unlocked' ? '#FEF3C7' : '#F3F4F6', padding: 8, borderRadius: 12 }}>
                      {b.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#111827', margin: '0 0 4px' }}>{b.title}</h4>
                      <p style={{ fontSize: 12.5, color: '#6B7280', margin: '0 0 8px', lineHeight: 1.4 }}>{b.desc}</p>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: b.status === 'Unlocked' ? '#16A34A' : '#6B7280', background: b.status === 'Unlocked' ? '#DCFCE7' : '#F3F4F6', padding: '2px 8px', borderRadius: 4 }}>
                        {b.status === 'Unlocked' ? `Unlocked • ${b.date}` : b.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Table */}
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: '#111827', marginBottom: 16 }}>
                Global Leaderboard
              </h2>
              <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
                {LEADERBOARD.map((item) => (
                  <div
                    key={item.rank}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 8px',
                      borderBottom: item.rank < 5 ? '1px solid #F9FAFB' : 'none',
                      background: item.name.includes('(You)') ? '#EFF6FF' : 'transparent',
                      borderRadius: 10,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, width: 24, textAlign: 'center' }}>{item.badge}</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                      {item.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#2563EB' }}>
                      {item.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
