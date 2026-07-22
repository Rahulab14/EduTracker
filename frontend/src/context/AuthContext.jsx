import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const DEMO_USERS = {
  student: {
    id: 'usr_student_1',
    name: 'John Doe',
    email: 'john@edutrack.com',
    role: 'student',
    title: 'UX Design Student',
    avatar: 'JD',
  },
  admin: {
    id: 'usr_admin_1',
    name: 'Sarah Admin',
    email: 'admin@edutrack.com',
    role: 'admin',
    title: 'Lead Administrator',
    avatar: 'SA',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edutrack_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return DEMO_USERS.student
      }
    }
    return DEMO_USERS.student
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('edutrack_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('edutrack_user')
    }
  }, [user])

  const login = (email, password, requestedRole = 'student') => {
    // Check if email contains 'admin' or requestedRole === 'admin'
    const role = email.toLowerCase().includes('admin') || requestedRole === 'admin' ? 'admin' : 'student'
    const name = email.split('@')[0]
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1)
    
    const newUser = {
      id: `usr_${Date.now()}`,
      name: formattedName || (role === 'admin' ? 'Sarah Admin' : 'John Doe'),
      email,
      role,
      title: role === 'admin' ? 'Administrator' : 'Student Learner',
      avatar: (formattedName || 'U').slice(0, 2).toUpperCase(),
    }
    setUser(newUser)
    return newUser
  }

  const signup = (name, email, role = 'student') => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || 'New User',
      email,
      role,
      title: role === 'admin' ? 'Administrator' : 'Student Learner',
      avatar: (name || 'NU').slice(0, 2).toUpperCase(),
    }
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser(DEMO_USERS.admin)
    } else {
      setUser(DEMO_USERS.student)
    }
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role || 'student', login, signup, logout, switchRole, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
