import { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export type AuthContextType = {
  userData: Record<string, string>
  loggedIn: boolean
  loading: boolean
  saveLoginData: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState({})
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const saveLoginData = () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken) {
        setIsLoggedIn(true)
        setUserData(decodedToken)
      } else {
        setIsLoggedIn(false)
        setUserData(false)
      }
    }
    setLoading(false)
  }

  const logOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        loggedIn,
        loading,
        saveLoginData,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
