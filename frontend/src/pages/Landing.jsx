import { useState } from 'react'
import { useData } from '../context/DataContext'

const FEATURES = [
  {
    icon: '🎓',
    title: 'Expert-Led Video Courses',
    desc: 'Learn directly from senior designers and engineers at Google, Amazon & Meta with structured video modules.',
  },
  {
    icon: '📝',
    title: 'Interactive Quizzes & Projects',
    desc: 'Test your understanding with instant quizzes, real-world assignments, and automated instructor grading.',
  },
  {
    icon: '🏆',
    title: 'Verified Certificates',
    desc: 'Receive shareable, accredited completion certificates to highlight on your resume and LinkedIn profile.',
  },
  {
    icon: '📊',
    title: 'Progress & Streak Tracking',
    desc: 'Stay motivated with daily study streaks, skill XP levels, badges, and real-time learning analytics.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choose Your Skill Path', desc: 'Browse courses across UI/UX Design, Web Development, 3D Animation, and Branding.' },
  { step: '02', title: 'Learn at Your Pace', desc: 'Watch HD video lessons, complete practical exercises, and build a real portfolio.' },
  { step: '03', title: 'Earn Your Certificate', desc: 'Pass module quizzes, submit your final project, and receive your verified credential.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'UX Designer at Meta', quote: 'EduTrack transformed my career. The structured curriculum and hands-on projects helped me land my dream role.', rating: 5, avatar: 'SC' },
  { name: 'James Okafor', role: 'Frontend Developer', quote: 'Going from beginner to building full-stack web applications took me only 4 months. The course quality is unbeatable.', rating: 5, avatar: 'JO' },
  { name: 'Priya Sharma', role: 'Product Lead at Spotify', quote: 'The interactive quizzes and verified certification make EduTrack the best learning platform available.', rating: 5, avatar: 'PS' },
]

export default function Landing({ navigate }) {
  const { courses } = useData()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewCourse, setPreviewCourse] = useState(null)

  const categories = ['All', 'UI/UX Design', 'Graphics Design', 'Animation', 'Web Development', 'Branding']

  const filteredCourses = courses.filter((c) => {
    const matchesCat = activeCategory === 'All' || c.category === activeCategory
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh', color: '#111827' }}>
      {/* Sticky Navbar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E5E7EB',
          padding: '0 48px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('landing')}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 18, color: '#111827' }}>EduTrack</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button
            onClick={() => scrollToSection('overview')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14.5, color: '#374151', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#374151' }}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('features')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14.5, color: '#374151', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#374151' }}
          >
            What We Offer
          </button>
          <button
            onClick={() => scrollToSection('courses-overview')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14.5, color: '#374151', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#374151' }}
          >
            Explore Courses
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14.5, color: '#374151', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#374151' }}
          >
            How It Works
          </button>
        </div>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('signin')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#374151' }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('signup')}
            style={{
              background: 'linear-gradient(135deg, #111827, #1F2937)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '10px 22px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(17,24,39,0.18)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" style={{ padding: '72px 48px 60px', maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 100,
              padding: '6px 14px',
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 14 }}>🚀</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#2563EB' }}>
              The All-in-One Learning & Skills Platform
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 54,
              lineHeight: 1.12,
              color: '#111827',
              margin: '0 0 20px',
              letterSpacing: '-0.02em',
            }}
          >
            Master In-Demand Skills.
            <br />
            <span style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED, #DB2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Build Your Future.
            </span>
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.7, color: '#4B5563', margin: '0 0 32px', maxWidth: 520 }}>
            EduTrack gives you access to top-tier courses, hands-on project assignments, real-time knowledge quizzes, and verified career credentials.
          </p>

          {/* Quick Search */}
          <div style={{ display: 'flex', gap: 10, background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 6, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', maxWidth: 500, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 16, color: '#9CA3AF' }}>🔍</div>
            <input
              type="text"
              placeholder="Search courses (e.g. Figma, UI/UX, Webflow)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                scrollToSection('courses-overview')
              }}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: 14, fontFamily: 'Inter, sans-serif', color: '#111827' }}
            />
            <button
              onClick={() => scrollToSection('courses-overview')}
              style={{ padding: '10px 20px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', flexShrink: 0 }}
            >
              Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={() => scrollToSection('courses-overview')}
              style={{
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 28px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Explore Course Catalog ↓
            </button>
            <button
              onClick={() => navigate('signup')}
              style={{
                background: '#fff',
                color: '#111827',
                border: '1.5px solid #E5E7EB',
                borderRadius: 12,
                padding: '14px 28px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Get Started Free →
            </button>
          </div>
        </div>

        {/* Platform Mockup Showcase */}
        <div style={{ flex: '0 0 500px' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 20px 60px rgba(37,99,235,0.12)',
              border: '1px solid #E5E7EB',
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, borderBottom: '1px solid #F3F4F6', paddingBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginLeft: 6 }}>EduTrack Learning Platform</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '2px 8px', borderRadius: 100 }}>
                PLATFORM OVERVIEW
              </span>
            </div>

            {/* Featured Course Banner in Mockup */}
            <div
              onClick={() => setPreviewCourse(courses[0])}
              style={{
                background: 'linear-gradient(135deg, #1E40AF, #5B21B6)',
                borderRadius: 16,
                padding: '24px 20px',
                color: '#fff',
                marginBottom: 18,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                FEATURED COURSE • 24 LESSONS
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.3, marginBottom: 8 }}>
                Figma UI/UX Advanced Masterclass
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#BFDBFE' }}>
                <span>🌐 Google & Figma Certified</span>
                <span>⏱️ 14 Hours</span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 20,
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 11.5,
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                Click to Preview Course →
              </div>
            </div>

            {/* Quick Feature Pill Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 12, border: '1px solid #F3F4F6', fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🏆 Verified Credentials</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 12, border: '1px solid #F3F4F6', fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📝 Instant Quizzes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer (Features Overview) */}
      <section id="features" style={{ padding: '80px 48px', background: '#F8FAFC', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 34, color: '#111827', margin: '0 0 12px' }}>
              What EduTrack Gives You
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
              A complete education ecosystem designed to build practical skills, verify your achievements, and advance your career.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: 24,
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)' }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Overview & Preview Section (NO LOGIN REQUIRED) */}
      <section id="courses-overview" style={{ padding: '80px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 34, color: '#111827', margin: '0 0 12px' }}>
              Explore Course Catalog Overview
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
              Click on any course to preview the full syllabus, lesson structure, and instructor details directly on this page — no login required!
            </p>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 100,
                  border: activeCategory === cat ? 'none' : '1.5px solid #E5E7EB',
                  background: activeCategory === cat ? '#111827' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#374151',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 13.5,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filteredCourses.map((c) => (
              <div
                key={c.id || c.title}
                onClick={() => setPreviewCourse(c)}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Header Background */}
                <div style={{ height: 150, background: c.bg || 'linear-gradient(135deg, #DBEAFE, #EFF6FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 48 }}>{c.instructorIcon || '🎓'}</div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: c.accent || '#2563EB', color: '#fff', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>
                    {c.level}
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: c.accent || '#2563EB', textTransform: 'uppercase' }}>
                    {c.category}
                  </span>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '4px 0 8px', lineHeight: 1.35 }}>
                    {c.title}
                  </h3>
                  <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 14 }}>By {c.instructor}</div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: 14 }}>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>📖 {c.lessons} Lessons • {c.duration}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPreviewCourse(c); }}
                      style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Preview Syllabus →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '80px 48px', background: '#F8FAFC', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 34, color: '#111827', margin: '0 0 12px' }}>
              How EduTrack Works
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
              Start learning in three straightforward steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #F3F4F6', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, color: '#2563EB', marginBottom: 12 }}>
                  {step.step}
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: '#111827', margin: '0 0 10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 34, color: '#111827', margin: '0 0 12px' }}>
              What Our Graduates Say
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: 15, margin: 0 }}>
              Real stories from real learners who advanced their careers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: '#F8FAFC', borderRadius: 20, padding: '28px 24px', border: '1px solid #F3F4F6' }}>
                <div style={{ color: '#F59E0B', fontSize: 16, marginBottom: 16 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#374151', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: '#2563EB', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#111827' }}>{t.name}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section style={{ padding: '80px 48px' }}>
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            background: 'linear-gradient(135deg, #1E40AF 0%, #5B21B6 100%)',
            borderRadius: 28,
            padding: '60px 48px',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(37,99,235,0.25)',
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 34, margin: '0 0 14px' }}>
            Ready to Start Learning?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#BFDBFE', margin: '0 0 32px', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            Create your free account today and unlock full access to interactive courses, quizzes, and career certifications.
          </p>
          <button
            onClick={() => navigate('signup')}
            style={{
              padding: '14px 36px',
              background: '#fff',
              color: '#1E40AF',
              border: 'none',
              borderRadius: 12,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Get Started For Free →
          </button>
        </div>
      </section>

      {/* Course Detail Preview Modal (NO LOGIN REQUIRED) */}
      {previewCourse && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 400,
            padding: 20,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              width: '100%',
              maxWidth: 640,
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            {/* Modal Header Banner */}
            <div style={{ background: previewCourse.bg || 'linear-gradient(135deg, #1E40AF, #5B21B6)', padding: '28px 28px 24px', borderRadius: '24px 24px 0 0', color: '#111827', position: 'relative' }}>
              <button
                onClick={() => setPreviewCourse(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'rgba(255,255,255,0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>

              <span style={{ fontSize: 11, fontWeight: 700, background: previewCourse.accent || '#2563EB', color: '#fff', padding: '3px 10px', borderRadius: 100 }}>
                {previewCourse.category} • {previewCourse.level}
              </span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, margin: '12px 0 6px', color: '#111827' }}>
                {previewCourse.title}
              </h2>
              <div style={{ fontSize: 13, color: '#4B5563', fontWeight: 500 }}>
                Instructor: {previewCourse.instructor}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 20, background: '#F8FAFC', padding: 16, borderRadius: 14 }}>
                <div>
                  <div style={{ fontSize: 11.5, color: '#6B7280' }}>Lessons</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{previewCourse.lessons} Modules</div>
                </div>
                <div style={{ width: 1, background: '#E5E7EB' }} />
                <div>
                  <div style={{ fontSize: 11.5, color: '#6B7280' }}>Duration</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{previewCourse.duration} Self-paced</div>
                </div>
                <div style={{ width: 1, background: '#E5E7EB' }} />
                <div>
                  <div style={{ fontSize: 11.5, color: '#6B7280' }}>Certificate</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#16A34A' }}>Verified Included</div>
                </div>
              </div>

              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', margin: '0 0 10px' }}>
                What You Will Learn
              </h3>
              <ul style={{ paddingLeft: 20, fontSize: 13.5, color: '#4B5563', lineHeight: 1.7, marginBottom: 24 }}>
                <li>Core principles and real-world application techniques</li>
                <li>Hands-on practical assignment exercises with feedback</li>
                <li>Module quizzes to test and solidify your understanding</li>
                <li>Final capstone project suitable for your professional portfolio</li>
              </ul>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setPreviewCourse(null)}
                  style={{ flex: 1, padding: '12px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                >
                  Close Preview
                </button>
                <button
                  onClick={() => { setPreviewCourse(null); navigate('signup'); }}
                  style={{ flex: 1, padding: '12px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                >
                  Enroll Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Redesigned Footer */}
      <footer style={{ background: '#0F172A', paddingTop: 60, paddingBottom: 36, color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          {/* Newsletter Subscribe Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              border: '1px solid #334155',
              borderRadius: 24,
              padding: '36px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              marginBottom: 56,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                STAY AHEAD IN TECH & DESIGN
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#F8FAFC', margin: '0 0 4px' }}>
                Subscribe to Weekly Free Tutorials & Course Updates
              </h3>
              <p style={{ fontSize: 13.5, color: '#94A3B8', margin: 0 }}>
                Get the latest design trends, coding tips, and new course releases directly to your inbox.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexShrink: 0, width: '100%', maxWidth: 420 }}>
              <input
                type="email"
                placeholder="Enter your email address..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#0F172A',
                  border: '1.5px solid #334155',
                  borderRadius: 12,
                  color: '#F8FAFC',
                  fontSize: 13.5,
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '12px 24px',
                  background: '#2563EB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 13.5,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* 4-Column Footer Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            {/* Col 1: Brand & Tagline */}
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 20, color: '#F8FAFC' }}>EduTrack</span>
              </div>
              <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.65, maxWidth: 320, margin: '0 0 20px' }}>
                EduTrack is the premier skill development platform providing expert-led courses, hands-on project assignments, and industry-recognized certifications.
              </p>

              {/* Social Pills */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { name: '𝕏 Twitter', url: '#' },
                  { name: '💼 LinkedIn', url: '#' },
                  { name: '💻 GitHub', url: '#' },
                  { name: '💬 Discord', url: '#' },
                ].map((s) => (
                  <span
                    key={s.name}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#CBD5E1',
                      background: '#1E293B',
                      border: '1px solid #334155',
                      padding: '5px 10px',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2: Popular Skill Paths */}
            <div>
              <h4 style={{ color: '#F8FAFC', fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 600, margin: '0 0 16px' }}>
                Popular Skill Paths
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
                <span onClick={() => scrollToSection('courses-overview')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>UI/UX Design</span>
                <span onClick={() => scrollToSection('courses-overview')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Web Development</span>
                <span onClick={() => scrollToSection('courses-overview')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>3D Animation & Blender</span>
                <span onClick={() => scrollToSection('courses-overview')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Brand Identity & Strategy</span>
                <span onClick={() => scrollToSection('courses-overview')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Graphics Design Masterclass</span>
              </div>
            </div>

            {/* Col 3: Platform Features */}
            <div>
              <h4 style={{ color: '#F8FAFC', fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 600, margin: '0 0 16px' }}>
                Platform Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Interactive Quizzes</span>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Verified Credentials</span>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Project Submissions</span>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>XP & Leaderboard</span>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Instructor Grading</span>
              </div>
            </div>

            {/* Col 4: Account & Status */}
            <div>
              <h4 style={{ color: '#F8FAFC', fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 600, margin: '0 0 16px' }}>
                Account & Support
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, marginBottom: 20 }}>
                <span onClick={() => navigate('signin')} style={{ cursor: 'pointer' }}>Sign In to Portal</span>
                <span onClick={() => navigate('signup')} style={{ cursor: 'pointer' }}>Create Free Account</span>
                <span onClick={() => navigate('help')} style={{ cursor: 'pointer' }}>Help Center & FAQs</span>
              </div>

              {/* Status Indicator */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1E293B', border: '1px solid #334155', borderRadius: 100, padding: '5px 12px', fontSize: 11.5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
                <span style={{ color: '#CBD5E1', fontWeight: 500 }}>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div style={{ borderTop: '1px solid #1E293B', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span>© 2026 EduTrack Platform. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 24, color: '#94A3B8' }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Security</span>
              <span style={{ cursor: 'pointer' }}>🌐 English (US)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
