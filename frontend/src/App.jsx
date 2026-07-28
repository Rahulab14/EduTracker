import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

// Pages
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Learning from './pages/Learning'
import Certificates from './pages/Certificates'
import Assignments from './pages/Assignments'
import Quizzes from './pages/Quizzes'
import Calendar from './pages/Calendar'
import Messages from './pages/Messages'
import Achievements from './pages/Achievements'
import Settings from './pages/Settings'
import HelpCenter from './pages/HelpCenter'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import AdminCourses from './pages/AdminCourses'
import AdminUsers from './pages/AdminUsers'
import AdminSubmissions from './pages/AdminSubmissions'

function Router() {
  const [page, setPage] = useState('landing')

  const navigate = (p) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  const props = { navigate, currentPage: page }

  switch (page) {
    case 'landing':
      return <Landing {...props} />
    case 'signin':
      return <SignIn {...props} />
    case 'signup':
      return <SignUp {...props} />
    case 'dashboard':
      return <Dashboard {...props} />
    case 'courses':
      return <Courses {...props} />
    case 'course-detail':
      return <CourseDetail {...props} />
    case 'learning':
      return <Learning {...props} />
    case 'certificates':
      return <Certificates {...props} />
    case 'assignments':
      return <Assignments {...props} />
    case 'quizzes':
      return <Quizzes {...props} />
    case 'calendar':
      return <Calendar {...props} />
    case 'messages':
      return <Messages {...props} />
    case 'achievements':
      return <Achievements {...props} />
    case 'settings':
      return <Settings {...props} />
    case 'help':
      return <HelpCenter {...props} />

    // Admin Routes
    case 'admin-dashboard':
      return <AdminDashboard {...props} />
    case 'admin-courses':
      return <AdminCourses {...props} />
    case 'admin-users':
      return <AdminUsers {...props} />
    case 'admin-submissions':
      return <AdminSubmissions {...props} />

    default:
      return <Landing {...props} />
  }
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router />
      </DataProvider>
    </AuthProvider>
  )
}
