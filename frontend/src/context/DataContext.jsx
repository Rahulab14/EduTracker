import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext(null)

const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Brand Identity & Visual Experience',
    instructor: 'Amazon',
    instructorIcon: '📦',
    students: 390,
    lessons: 34,
    duration: '18hrs',
    level: 'Intermediate',
    category: 'Branding',
    bg: 'linear-gradient(135deg, #FCE7F3, #EDE9FE)',
    accent: '#DB2777',
    status: 'published',
  },
  {
    id: 'c2',
    title: 'UI/UX Design Level Up with Principles',
    instructor: 'Google',
    instructorIcon: '🌐',
    students: 400,
    lessons: 24,
    duration: '14hrs',
    level: 'Advanced',
    category: 'UI/UX Design',
    bg: 'linear-gradient(135deg, #DBEAFE, #EFF6FF)',
    accent: '#2563EB',
    status: 'published',
  },
  {
    id: 'c3',
    title: 'Fundamental 3D Animation with Blender',
    instructor: 'Adobe',
    instructorIcon: '🎨',
    students: 300,
    lessons: 42,
    duration: '22hrs',
    level: 'Beginner',
    category: 'Animation',
    bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
    accent: '#D97706',
    status: 'published',
  },
  {
    id: 'c4',
    title: 'Figma UI/UX Design Advanced Masterclass',
    instructor: 'Figma',
    instructorIcon: '✏️',
    students: 600,
    lessons: 18,
    duration: '10hrs',
    level: 'Advanced',
    category: 'UI/UX Design',
    bg: 'linear-gradient(135deg, #ECFDF5, #DCFCE7)',
    accent: '#059669',
    status: 'published',
  },
  {
    id: 'c5',
    title: 'Low Code Website Development',
    instructor: 'Webflow',
    instructorIcon: '💻',
    students: 580,
    lessons: 28,
    duration: '16hrs',
    level: 'Beginner',
    category: 'Web Development',
    bg: 'linear-gradient(135deg, #F0FDF4, #DBEAFE)',
    accent: '#0891B2',
    status: 'published',
  },
  {
    id: 'c6',
    title: 'Graphics Design Master Class',
    instructor: 'Adobe',
    instructorIcon: '🎨',
    students: 340,
    lessons: 36,
    duration: '20hrs',
    level: 'Advanced',
    category: 'Graphics Design',
    bg: 'linear-gradient(135deg, #FFF7ED, #FEE2E2)',
    accent: '#EA580C',
    status: 'published',
  },
]

const INITIAL_USERS = [
  { id: 'u1', name: 'John Doe', email: 'john@edutrack.com', role: 'student', status: 'Active', enrolled: 3, joined: 'Jul 2026' },
  { id: 'u2', name: 'Sarah Admin', email: 'admin@edutrack.com', role: 'admin', status: 'Active', enrolled: 0, joined: 'Jan 2026' },
  { id: 'u3', name: 'Priya Sharma', email: 'priya@spotify.com', role: 'student', status: 'Active', enrolled: 5, joined: 'Mar 2026' },
  { id: 'u4', name: 'James Okafor', email: 'james@dev.io', role: 'student', status: 'Active', enrolled: 4, joined: 'Apr 2026' },
  { id: 'u5', name: 'Michael Scott', email: 'mscott@dundermifflin.com', role: 'student', status: 'Suspended', enrolled: 1, joined: 'Jun 2026' },
]

const INITIAL_SUBMISSIONS = [
  { id: 'sub1', studentName: 'John Doe', assignmentTitle: 'Figma E-Commerce Wireframe', course: 'Figma UI/UX Design', submittedAt: 'Jul 20, 2026', status: 'Graded', score: '95/100', feedback: 'Excellent layout hierarchy!' },
  { id: 'sub2', studentName: 'Priya Sharma', assignmentTitle: 'Brand Strategy Deck', course: 'Brand Identity', submittedAt: 'Jul 21, 2026', status: 'Pending Review', score: '-', feedback: '' },
  { id: 'sub3', studentName: 'James Okafor', assignmentTitle: 'Responsive Component Library', course: 'Low Code Web', submittedAt: 'Jul 21, 2026', status: 'Pending Review', score: '-', feedback: '' },
]

export function DataProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('edutrack_courses')
    return saved ? JSON.parse(saved) : INITIAL_COURSES
  })

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('edutrack_users')
    return saved ? JSON.parse(saved) : INITIAL_USERS
  })

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('edutrack_submissions')
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS
  })

  useEffect(() => {
    localStorage.setItem('edutrack_courses', JSON.stringify(courses))
  }, [courses])

  useEffect(() => {
    localStorage.setItem('edutrack_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('edutrack_submissions', JSON.stringify(submissions))
  }, [submissions])

  const addCourse = (newCourse) => {
    const course = {
      id: `c_${Date.now()}`,
      students: 0,
      status: 'published',
      bg: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)',
      accent: '#2563EB',
      instructorIcon: '🚀',
      ...newCourse,
    }
    setCourses((prev) => [course, ...prev])
  }

  const updateCourse = (id, updatedData) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c)))
  }

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  const updateUserRole = (id, newRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)))
  }

  const toggleUserStatus = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u)))
  }

  const addSubmission = (newSub) => {
    const sub = {
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Review',
      score: '-',
      feedback: '',
      ...newSub,
    }
    setSubmissions((prev) => [sub, ...prev])
  }

  const gradeSubmission = (id, score, feedback) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Graded', score, feedback } : s))
    )
  }

  return (
    <DataContext.Provider
      value={{
        courses,
        users,
        submissions,
        addCourse,
        updateCourse,
        deleteCourse,
        updateUserRole,
        toggleUserStatus,
        addSubmission,
        gradeSubmission,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
