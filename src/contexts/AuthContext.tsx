import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export type AuthContextType = {
  loggedIn: boolean
  loading: boolean
  saveLoginData: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const saveLoginData = () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
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

export default AuthProvider
